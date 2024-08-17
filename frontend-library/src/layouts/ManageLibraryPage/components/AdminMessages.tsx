import {useAuth} from "../../../auth/AuthContext.tsx";
import {useEffect, useState} from "react";
import {MessageModel} from "../../../models/MessageModel.ts";
import {SpinnerLoading} from "../../Utils/SpinnerLoading.tsx";
import {Pagination} from "../../Utils/Pagination.tsx";
import {AdminMessage} from "./AdminMessage.tsx";
import {AdminMessageRequest} from "../../../models/AdminMessageRequest.ts";


export const AdminMessages = () => {

    const {isAuth} = useAuth()

    // Normal loading pieces
    const [isLoadingMessages, setIsLoadingMessages] = useState(true)
    const [httpError, setHttpError] = useState(null)

    // Messages endpoint state
    const [messages, setMessages] = useState<MessageModel[]>([])
    const [messagesPerPage] = useState(5)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    // Recall useEffect
    const [btnSubmit, setBtnSubmit] = useState(false)

    useEffect(() => {
        const fetchUserMessages = async () => {
            if (isAuth) {
                const url = `http://localhost:8080/api/messages/search/findByClosed?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`
                const token = localStorage.getItem('authToken') || ''
                const headersOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authToken': token
                    }
                }
                const messagesResponse = await fetch(url, headersOptions)

                if (!messagesResponse.ok) {
                    throw new Error('Something went wrong!')
                }

                const messagesResponseJson = await messagesResponse.json()
                setMessages(messagesResponseJson._embedded.messages)
                setTotalPages(messagesResponseJson.page.totalPages)
            }
            setIsLoadingMessages(false)
        }
        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false)
            setHttpError(error.message)
        })
        window.scrollTo(0, 0)
    }, [isAuth, currentPage, btnSubmit]);

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

    async function submitResponseToQuestion(id: number, response: string) {
        const url = `http://localhost:8080/api/messages/secure/admin/message/`
        if (isAuth && id !== null && response !== null) {
            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, response)
            const token = localStorage.getItem('authToken') || ''
            const headersOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
                body: JSON.stringify(messageAdminRequestModel)
            }
            const messageAdminRequestModelResponse = await fetch(url, headersOptions)

            if (!messageAdminRequestModelResponse.ok) {
                throw new Error('Something went wrong!')
            }

            setBtnSubmit(!btnSubmit)
        }
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <div className="mt-3">
            {messages.length > 0 ?
                <>
                    <h5>Pending Q/A:</h5>
                    {messages.map(message => (
                        <AdminMessage message={message} key={message.id} submitResponseToQuestion={submitResponseToQuestion} />
                    ))}
                </>
                :
                <h5>No pending Q/A</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    )
}
