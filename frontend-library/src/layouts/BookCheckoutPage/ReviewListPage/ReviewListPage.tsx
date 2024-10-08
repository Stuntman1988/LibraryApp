import {useEffect, useState} from "react";
import {ReviewModel} from "../../../models/ReviewModel.ts";
import {SpinnerLoading} from "../../Utils/SpinnerLoading.tsx";
import {Review} from "../../Utils/Review.tsx";
import {Pagination} from "../../Utils/Pagination.tsx";


export const ReviewListPage = () => {

    const [reviews, setReviews] = useState<ReviewModel[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    //Pagination
    const [currentPage, setCurerntPage] = useState(1)
    const [reviewsPerPage] = useState(5)
    const [totalAmountOfReviews, setTotalAmountOfReviews] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    
    const bookId = (window.location.pathname).split('/')[2]

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}&page=${currentPage -1}&size=${reviewsPerPage}`

            const responseReviews = await fetch(reviewUrl)

            if (!responseReviews.ok) {
                throw new Error("Something went wrong")
            }

            const responseJsonReviews = await responseReviews.json()

            const responseData = responseJsonReviews._embedded.reviews

            setTotalAmountOfReviews(responseJsonReviews.page.totalElements)
            setTotalPages(responseJsonReviews.page.totalPages)

            const loadReviews: ReviewModel[] = []

            for (const key in responseData) {
                loadReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    book_id: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription
                })
            }

            setReviews(loadReviews)
            setIsLoading(false)
        }

        fetchBookReviews().catch((error) => {
            setIsLoading(false)
            setHttpError(error.message)
        })

    }, [currentPage])

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastReview: number = currentPage * reviewsPerPage
    const indexOfFirstReview: number = indexOfLastReview - reviewsPerPage

    let lastItem = reviewsPerPage * currentPage <= totalAmountOfReviews ? reviewsPerPage * currentPage : totalAmountOfReviews

    const paginate = (pageNumber: number) => setCurerntPage(pageNumber)

    return (
        <div className="container m-5">
            <div>
                <h3>Comments: ({reviews.length})</h3>
            </div>
            <p>
                {indexOfFirstReview + 1} to {lastItem} of {totalAmountOfReviews} items:
            </p>
            <div className="row">
                {reviews.map(review => (
                    <Review review={review} key={review.id}/>
                ))}
            </div>
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    )
}
