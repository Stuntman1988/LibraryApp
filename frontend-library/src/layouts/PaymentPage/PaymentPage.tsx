import {useAuth} from "../../auth/AuthContext.tsx";
import {useEffect, useState} from "react";
import {SpinnerLoading} from "../Utils/SpinnerLoading.tsx";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Link} from "react-router-dom";
import {PaymentInfoRequest} from "../../models/PaymentInfoRequest.ts";


export const PaymentPage = () => {

    const {isAuth} = useAuth()
    const [httpError, setHttpError] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [fees, setFees] = useState(0)
    const [loadingFees, setLoadingFees] = useState(false)

    useEffect(() => {
        const fetchFees = async () => {
            if (isAuth) {
                const token = localStorage.getItem('authToken') || ''
                const url = `http://localhost:8080/api/payments/search/findByUserEmail?userEmail=${token}`
                const headersOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': token
                    }
                }
                const paymentResponse = await fetch(url, headersOptions)

                if (!paymentResponse.ok) {
                    throw new Error('Something went wrong!')
                }

                const paymentResponseJson = await paymentResponse.json()
                setFees(paymentResponseJson.amount)
                setLoadingFees(false)
            }
        }
        fetchFees().catch((error: any) => {
            setLoadingFees(false)
            setHttpError(error.message)
        })
    }, [isAuth])

    const elements = useElements()
    const stripe = useStripe()

    async function checkout() {
        if (!stripe || !elements || !elements.getElement(CardElement)) {
            return
        }
        setSubmitDisabled(true)
        const token = localStorage.getItem('authToken') || ''
        const paymentInfo = new PaymentInfoRequest(Math.round(fees * 100), 'USD', token)
        const url = `http://localhost:8080/api/payment/secure/payment-intent/`
        const headersOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': token
            },
            body: JSON.stringify(paymentInfo)
        }
        const stripeResponse = await fetch(url, headersOptions)

        if (!stripeResponse.ok) {
            setHttpError(true)
            setSubmitDisabled(false)
            throw new Error('Something went wrong!')
        }

        const stripeResponseJson = await stripeResponse.json()
        stripe.confirmCardPayment(
            stripeResponseJson.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        email: token
                    }
                }
            }, {handleActions: false}
        ).then(async function (result: any) {
            if (result.error) {
                setSubmitDisabled(false)
                alert('There was an error')
            } else {
                const url = `http://localhost:8080/api/payment/secure/payment-complete/`
                const headersOptions = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': token
                    }
                }
                const stripeResponse = await fetch(url, headersOptions)

                if (!stripeResponse.ok) {
                    setHttpError(true)
                    setSubmitDisabled(false)
                    throw new Error('Something went wrong!')
                }
                setFees(0)
                setSubmitDisabled(false)
            }
        })
        setHttpError(false)

    }

    if (loadingFees) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className="container">
            {fees > 0 &&
                <div className="card mt-3">
                    <h5 className="card-header">Fees pending: <span className="text-danger">${fees}</span></h5>
                    <div className="card-body">
                        <h5 className="card-title mb-3">Credit Card</h5>
                        <CardElement id="card-element"/>
                        <button className="btn btn-md main-color text-white mt-3" disabled={submitDisabled}
                                type="button" onClick={checkout}>Pay fees
                        </button>
                    </div>
                </div>
            }

            {fees === 0 &&
                <div className="mt-3">
                    <h5>You have no fees!</h5>
                    <Link to={'/search'} className="btn main-color text-white" type="button">
                        Explore top books!
                    </Link>
                </div>
            }

            {submitDisabled && <SpinnerLoading/>}
        </div>
    )
}
