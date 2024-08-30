import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51PsOqWARaMF0lTwnwepkSTOdN8ncNlDGXZQ42sKjQ7PgtAJ1Ka3jvLBWnfieqScJwsgDhToUOMKc3OJ7UlTs31DS001BD0HFGj')

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Elements stripe={stripePromise}>
                <App/>
            </Elements>
        </BrowserRouter>
    </React.StrictMode>,
)
