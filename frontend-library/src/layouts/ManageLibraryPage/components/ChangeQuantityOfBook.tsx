import {BookModel} from "../../../models/BookModel.ts";
import {useEffect, useState} from "react";
import defaultBook from "../../../assets/BooksImages/book-luv2code-1000.png";


export const ChangeQuantityOfBook: React.FC<{ book: BookModel, deleteBook: any }> = (props, key) => {

    const [quantity, setQuantity] = useState<number>(0)
    const [remaining, setRemaining] = useState<number>(0)

    useEffect(() => {
        const fetchBookInState = () => {
            props.book.copies ? setQuantity(props.book.copies) : setQuantity(0)
            props.book.copiesAvailable ? setRemaining(props.book.copiesAvailable) : setRemaining(0)
        }
        fetchBookInState()
    }, []);

    async function increaseQuantity() {
        const url = `http://localhost:8080/api/admin/secure/increase/book/quantity/?bookId=${props.book.id}`
        const token = localStorage.getItem('authToken') || ''
        const headersOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authToken': token
            }
        }
        const quantityUpdateResponse = await fetch(url, headersOptions)

        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!')
        }

        setQuantity(quantity + 1)
        setRemaining(remaining + 1)
    }

    async function decreaseQuantity() {
        const url = `http://localhost:8080/api/admin/secure/decrease/book/quantity/?bookId=${props.book.id}`
        const token = localStorage.getItem('authToken') || ''
        const headersOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authToken': token
            }
        }
        const quantityUpdateResponse = await fetch(url, headersOptions)

        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!')
        }

        setQuantity(quantity - 1)
        setRemaining(remaining - 1)
    }

    async function deleteBook() {
        const url = `http://localhost:8080/api/admin/secure/delete/book/?bookId=${props.book.id}`
        const token = localStorage.getItem('authToken') || ''
        const headersOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authToken': token
            }
        }
        const deleteResponse = await fetch(url, headersOptions)

        if (!deleteResponse.ok) {
            throw new Error('Something went wrong!')
        }

        props.deleteBook()
    }

    return (
        <div key={key} className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        {props.book.img ?
                            <img src={props.book.img} width="123" height="196" alt="book"/>
                            :
                            <img src={defaultBook} width="123" height="196" alt="book"/>
                        }
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        {props.book.img ?
                            <img src={props.book.img} width="123" height="196" alt="book"/>
                            :
                            <img src={defaultBook} width="123" height="196" alt="book"/>
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{props.book.author}</h5>
                        <h4>{props.book.title}</h4>
                        <p className="card-text">{props.book.description}</p>
                    </div>
                </div>
                <div className="mt-3 col-md-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Total Quantity: <b>{quantity}</b></p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p>Books Remaining: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className="mt-3 col-md-1">
                    <div className="d-flex justify-content-start">
                        <button className="m-1 btn btn-md btn-danger" onClick={deleteBook}>Delete</button>
                    </div>
                </div>
                <button className="m-1 btn btn-md main-color text-white" onClick={increaseQuantity}>Add Quantity</button>
                <button className="m-1 btn btn-md btn-warning" onClick={decreaseQuantity}>Decrease Quantity</button>
            </div>
        </div>
    )
}
