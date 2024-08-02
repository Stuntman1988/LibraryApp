

export const StarsReview: React.FC<{ rating: number, size: number }> = (props) => {


    let rating = props.rating
    let fullStars = 0
    let halfStars = 0
    let emptyStars = 0

    if (rating !== undefined && rating > 0 && rating <= 5) {
        for (let i=0; i <=4; i++) {
            if (rating - 1 >= 0) {
                fullStars = fullStars +1
                rating = rating -1
            } else if (rating === .5) {
                halfStars = halfStars + 1
                rating = rating - .5
            } else if (rating == 0){
                emptyStars = emptyStars + 1
            } else {
                break
            }
        }
    } else {
        emptyStars = 5
    }



  return (
    <div>
        {Array.from({ length: fullStars}, (_, i) => 
        <i key={i} className="bi bi-star-fill" style={{ fontSize: `${props.size}px` , color: "gold" }}></i>
        )}
        {Array.from({ length: halfStars}, (_, i) => 
        <i key={i} className="bi bi-star-half" style={{ fontSize: `${props.size}px` , color: "gold" }}></i>
        )}
        {Array.from({ length: emptyStars}, (_, i) => 
        <i key={i} className="bi bi-star" style={{ fontSize: `${props.size}px` , color: "gold" }}></i>
        )}
    </div>
  )
}
