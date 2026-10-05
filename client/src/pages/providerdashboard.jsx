import { useEffect, useState } from "react";
import axios from "axios";
import "../providerdashboard.css";

function ProviderDashboard() {
    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const getBookings = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8000/api/booking/provider",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setBookings(response.data.bookings);

        } catch (error) {
            console.log(
                error.response?.data || error.message
            );
        }
    };

    const getReviews = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8000/api/reviews/provider",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReviews(response.data.reviews);

        } catch (error) {
            console.log(
                error.response?.data || error.message
            );
        }
    };

    const loadDashboard = async () => {
        await Promise.all([
            getBookings(),
            getReviews()
        ]);

        setLoading(false);
    };

    loadDashboard();

}, []);

    const getReviews = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
            "http://localhost:8000/api/reviews/provider",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setReviews(response.data.reviews);

    } catch (error) {
        console.log(
            error.response?.data || error.message
        );
    }
};

    if (loading) {
        return <h2>Loading dashboard...</h2>;
    }

    const totalBookings = bookings.length;

    const pendingBookings = bookings.filter(
        booking => booking.status === "pending"
    ).length;

    const activeBookings = bookings.filter(
        booking =>
            booking.status === "confirmed" ||
            booking.status === "on_the_way" ||
            booking.status === "arrived"
    ).length;

    const completedBookings = bookings.filter(
        booking => booking.status === "completed"
    ).length;

    const cancelledBookings = bookings.filter(
        booking => booking.status === "cancelled"
    ).length;

    const totalEarnings = bookings
        .filter(booking => booking.status === "completed")
        .reduce(
            (total, booking) =>
                total + Number(booking.service?.price || 0),
            0
        );


        const totalReviews = reviews.length;

const averageRating =
    totalReviews === 0
        ? 0
        : (
            reviews.reduce(
                (sum, review) => sum + review.rating,
                0
            ) / totalReviews
        ).toFixed(1);

    return (
        <div className="provider-dashboard">

            <h1>Provider Dashboard</h1>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Total Bookings</h3>
                    <h2>{totalBookings}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Pending</h3>
                    <h2>{pendingBookings}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Active</h3>
                    <h2>{activeBookings}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Completed</h3>
                    <h2>{completedBookings}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Cancelled</h3>
                    <h2>{cancelledBookings}</h2>
                </div>

                <div className="dashboard-card">
                    <h3>Total Earnings</h3>
                    <h2>₹{totalEarnings}</h2>
                </div>

                <div className="dashboard-card rating-card">
    <h3>Provider Rating</h3>

    <h2>⭐ {averageRating}</h2>

    <p>
        {totalReviews} review
        {totalReviews !== 1 ? "s" : ""}
    </p>
</div>

            </div>

            <div className="recent-bookings">

    <h2>Recent Bookings</h2>

    {bookings.slice(0, 5).map((booking) => (
        <div
            className="recent-booking"
            key={booking._id}
        >
            <div>
                <strong>
                    {booking.service?.title}
                </strong>

                <p>
                    Customer: {booking.customer?.name}
                </p>
            </div>

            <div>
               <span className={booking.status}>
    {booking.status.replace("_", " ")}
</span>

                <p>
                    ₹{booking.service?.price}
                </p>
            </div>
        </div>
    ))}

</div>

<div className="recent-bookings">

    <h2>Recent Reviews</h2>

    {reviews.length === 0 ? (
        <p>No reviews yet.</p>
    ) : (
        reviews.slice(0, 5).map((review) => (
            <div
                className="recent-booking"
                key={review._id}
            >

                <div>
                    <strong>
                        {review.customer?.name}
                    </strong>

                    <p>
                        {review.comment}
                    </p>
                </div>

                <div>
                    <span className="review-stars">
                        {"⭐".repeat(review.rating)}
                    </span>

                    <p>
                        {review.service?.title}
                    </p>
                </div>

            </div>
        ))
    )}

</div>


        </div>
    );
}

export default ProviderDashboard;