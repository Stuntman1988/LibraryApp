import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {useAuth} from "../../auth/AuthContext.tsx";



export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isValid, setIsValid] = useState(false)
    const {login} = useAuth();
    const navigate = useNavigate()

    const validateSignIn = () => {
        let isEmailValid = false
        let isPasswordValid = false
        const emailPattern = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}/;

        if (!email) {
            setEmailError('Can not be empty!')
        } else if (!emailPattern.test(email)) {
            setEmailError('Not a valid email')
        } else {
            setEmailError('')
            isEmailValid = true
        }

        if (!password) {
            setPasswordError('Can not be empty!')
        } else {
            setPasswordError('')
            isPasswordValid = true
        }

        if (isEmailValid && isPasswordValid) {
            setIsValid(true)
        }
    }

    useEffect(() => {
        if (!isValid) {
            return
        }
        const fetchUser = async () => {

            const url = `http://localhost:8080/api/users/search/findUserByEmail?email=${email}`
            const response = await fetch(url)

            if (!response.ok) {
                setEmailError('Email not registred!')
                setIsValid(false)
                throw new Error('Something went wrong!')
            }

            const responseJson = await response.json()

            if (responseJson.password === password) {
                login(email)
                navigate('/home')
            } else {
                setPasswordError('Passoword incorrect!')
            }

            setIsValid(false)

        }
        fetchUser().catch((error: any) => {
            console.log('ERROR: ', error)
        })
    }, [isValid])

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="border rounded d-inline-block p-5 shadow">
                <form onSubmit={validateSignIn}>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <input type="email" id="email" className="form-control" onChange={e => setEmail(e.target.value)} />
                        {emailError && <p className="form-text text-danger">{emailError}</p>}
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                        {passwordError && <p className="form-text text-danger">{passwordError}</p>}
                    </div>

                    <button type="button" className="btn btn-primary mb-4" onClick={() => validateSignIn()}>Sign in</button>

                    <div className="text-center">
                        <p>Not a member? <a href="#!">Register</a></p>
                    </div>

                </form>
            </div>
        </div>
    )
}
