import {useAuth} from "../../../auth/AuthContext.tsx";
import {useEffect, useState} from "react";
import {MessageModel} from "../../../models/MessageModel.ts";
import {SpinnerLoading} from "../../Utils/SpinnerLoading.tsx";
import {Pagination} from "../../Utils/Pagination.tsx";


export const Messages = () => {

    const {isAuth} = useAuth()
    const [isLoadingMessages, setIsLoadingMessages] = useState(true)
    const [httpError, setHttpError] = useState(null)

    //Messages
    const [messages, setMessages] = useState<MessageModel[]>([])

    //Pagination
    const [messagesPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchUserMessages = async () => {
            if (isAuth) {
                const token = localStorage.getItem('authToken') || ''
                const url = `http://localhost:8080/api/messages/search/findByUserEmail?userEmail=${token}&page=${currentPage - 1}&size=${messagesPerPage}`
                const headersOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': token
                    }
                }

                const messegesResponse = await fetch(url, headersOptions)

                if (!messegesResponse.ok) {
                    throw new Error('Something went wrong!')
                }

                const messagesResponseJson = await messegesResponse.json()
                setMessages(messagesResponseJson._embedded.messages)
                setTotalPages(messagesResponseJson.page.totalPages)
            }
            setIsLoadingMessages(false)
        }
        fetchUserMessages().catch((error) => {
            setIsLoadingMessages(false)
            setHttpError(error.message)
        })
        window.scrollTo(0, 0)
    }, [isAuth, currentPage]);

    if (isLoadingMessages) {
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

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="mt-2">
            {messages.length > 0 ?
                <>
                    <h5>Current Q/A:</h5>
                    {messages.map(message => (
                        <div key={message.id}>
                            <div className="card mt-2 shadow p-3 bg-body rounded">
                                <h5>Case #{message.id}: {message.title}</h5>
                                <h6>{message.userEmail}</h6>
                                <p>{message.question}</p>
                                <hr/>
                                <div>
                                    <h5>Response: </h5>
                                    {message.response && message.adminEmail ?
                                        <>
                                            <h6>{message.adminEmail} (admin)</h6>
                                            <p>{message.response}</p>
                                        </>
                                        :
                                        <p><i>Pending response from admin, please be patient.</i></p>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </>
                :
                <h5>All questions you submit will be shown here</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    )
}
