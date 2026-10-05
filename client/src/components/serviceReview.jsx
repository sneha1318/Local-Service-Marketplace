import {useState,useEffect} from "react"
import axios from "axios"

function ServiceReview({serviceId}){
    const [reviews,setReview] =useState([])
    const [loading,setLoading]=useState(true);
    useEffect (()=>{
        const getReview=async()=>{
            try {
                const response=await axios.get(
                    `http://localhost:8000/api/reviews/${serviceId}`
                )
                setReview(response.data.reviews)
            } catch (error) {
                console.log(error.response?.data||error.message)
            }finally{
                setLoading(false)
            }
        }
        getReview();
    },[serviceId]);
    if(loading){
        return <p>Loading reviews ....</p>
    }
    return(
        <div>
            <h3>Customer Reviews</h3>
            {reviews.length===0 ?(
                <p>No reviews yet.</p>
            ):(
                reviews.map((review)=>(
                    <div key={review._id} >
                        <h4>{review.customer?.name}</h4>
                         <p>
                            Rating: {"⭐".repeat(review.rating)}
                        </p>
                        <p>
                           { review.comment}
                        </p>
                        <hr/>
                    </div>
                ))
            )
        }
        </div>
    )

}
export default ServiceReview;