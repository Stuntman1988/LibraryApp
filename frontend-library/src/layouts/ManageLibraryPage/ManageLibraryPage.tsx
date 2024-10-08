import {useAuth} from "../../auth/AuthContext.tsx";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {SpinnerLoading} from "../Utils/SpinnerLoading.tsx";
import {AdminMessages} from "./components/AdminMessages.tsx";
import {AddNewBook} from "./components/AddNewBook.tsx";
import {ChangeQuantityOfBooks} from "./components/ChangeQuantityOfBooks.tsx";


export const ManageLibraryPage = () => {

    const {checkIfAdmin} = useAuth()
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false)
    const [messegesClick, setMessegesClick] = useState(false)

    function addBookClickFunction() {
        setChangeQuantityOfBooksClick(false)
        setMessegesClick(false)
    }

    function changeQuantityOfBooksClickFunction() {
        setChangeQuantityOfBooksClick(true)
        setMessegesClick(false)
    }

    function messagesClickFunction() {
        setChangeQuantityOfBooksClick(false)
        setMessegesClick(true)
    }

    useEffect(() => {
        const verifyAdmin = async () => {
            const adminStatus = await checkIfAdmin();
            setIsAdmin(adminStatus);
        };
        verifyAdmin();
    }, [checkIfAdmin]);

    if (isAdmin === null) {
        return <SpinnerLoading/>
    }

    if (!isAdmin) {
        return <Navigate to="/home"/>
    }

    return (
        <div className="container">
            <div className="mt-5">
                <h3>Manage Library</h3>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button onClick={addBookClickFunction} className="nav-link active" id="nav-add-book-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-add-book" type="button" role="tab" aria-controls="nav-add-book"
                                aria-selected="false">
                            Add new book
                        </button>
                        <button onClick={changeQuantityOfBooksClickFunction} className="nav-link"
                                id="nav-quantity-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-quantity" type="button" role="tab" aria-controls="nav-quantity"
                                aria-selected="true">
                            Change quantity
                        </button>
                        <button onClick={messagesClickFunction} className="nav-link" id="nav-messages-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-messages" type="button" role="tab" aria-controls="nav-messages"
                                aria-selected="false">
                            Messages
                        </button>

                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-add-book" role="tabpanel"
                         aria-labelledby="nav-add-book-tab">
                        <AddNewBook/>
                    </div>
                    <div className="tab-pane fade" id="nav-quantity" role="tabpanel"
                         aria-labelledby="nav-quantity-tab">
                        {changeQuantityOfBooksClick ?
                            <ChangeQuantityOfBooks/>
                            :
                            <></>
                        }
                    </div>
                    <div className="tab-pane fade" id="nav-messages" role="tabpanel"
                         aria-labelledby="nav-messages-tab">
                        {messegesClick ?
                            <AdminMessages/>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
