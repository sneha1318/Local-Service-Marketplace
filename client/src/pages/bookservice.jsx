import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../BookService.css";

function BookService() {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    const [bookingDate, setBookingDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first!");
                navigate("/login");
                return;
            }

            const response = await axios.post(
                "http://localhost:8000/api/booking",
                {
                    serviceId,
                    bookingDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

            navigate("/my-bookings");

        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Booking failed!"
            );
        }
    };

    return (
        <div className="booking-page">

            <div className="booking-container">

                {/* Header */}
                <div className="booking-header">

                    <p>BOOK SERVICE</p>

                    <h1>
                        Schedule Your Service
                    </h1>

                    <span>
                        Choose a convenient date and confirm your booking.
                    </span>

                </div>


                {/* Booking Card */}
                <div className="booking-card">

                    <h2>
                        Select Booking Date
                    </h2>

                    <p className="booking-description">
                        Select the date on which you would like
                        the service to be provided.
                    </p>


                    <form onSubmit={handleSubmit}>

                        {/* Date */}
                        <div className="date-field">

                            <label>
                                Service Date
                            </label>

                            <input
                                type="date"
                                value={bookingDate}
                                onChange={(e) =>
                                    setBookingDate(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* Information */}
                        <div className="booking-note">

                            <span>✓</span>

                            <p>
                                Your booking will be sent to the
                                service provider for confirmation.
                            </p>

                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            className="confirm-booking-btn"
                        >
                            Confirm Booking →
                        </button>

                    </form>


                    {/* Back */}
                    <button
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Service
                    </button>

                </div>

            </div>

        </div>
    );
}

export default BookService;