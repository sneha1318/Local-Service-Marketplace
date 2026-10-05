import { useState, useEffect } from "react";
import axios from "axios";
import "../providerbookings.css";

function ProviderBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProviderBookings = async () => {
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
            } finally {
                setLoading(false);
            }
        };

        getProviderBookings();
    }, []);

    const updateStatus = async (bookingId, newStatus) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://localhost:8000/api/booking/${bookingId}/status`,
                {
                    status: newStatus
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(response.data.message);

            setBookings((previousBookings) =>
                previousBookings.map((booking) =>
                    booking._id === bookingId
                        ? {
                            ...booking,
                            status: newStatus
                        }
                        : booking
                )
            );

        } catch (error) {
            console.log(
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to update booking!"
            );
        }
    };

    if (loading) {
        return (
            <div className="provider-bookings-page">
                <h2
                    style={{
                        color: "#142b45",
                        textAlign: "center"
                    }}
                >
                    Loading bookings...
                </h2>
            </div>
        );
    }

    return (
        <div className="provider-bookings-page">

            <h1>Provider Bookings</h1>

            {bookings.length === 0 ? (
                <div className="no-provider-bookings">
                    <h3>No bookings found!</h3>

                    <p>
                        You don't have any service bookings yet.
                    </p>
                </div>
            ) : (

                <div className="provider-bookings-grid">

                    {bookings.map((booking) => (

                        <div
                            className="provider-booking-card"
                            key={booking._id}
                        >

                            

                            <div className="provider-card-header">

                                <div>

                                    <small>SERVICE</small>

                                    <h2>
                                        {booking.service?.title}
                                    </h2>

                                    <span className="provider-category">
                                        {booking.service?.category}
                                    </span>

                                </div>

                                <span
                                    className={`provider-status ${booking.status}`}
                                >
                                    {booking.status.replace("_", " ")}
                                </span>

                            </div>


                            

                            <div className="provider-booking-details">

                                <div className="provider-detail">

                                    <span>📅</span>

                                    <div>

                                        <small>
                                            BOOKING DATE
                                        </small>

                                        <strong>
                                            {new Date(
                                                booking.bookingDate
                                            ).toLocaleString()}
                                        </strong>

                                    </div>

                                </div>


                                <div className="provider-detail">

                                    <span>📍</span>

                                    <div>

                                        <small>
                                            LOCATION
                                        </small>

                                        <strong>
                                            {booking.service?.location}
                                        </strong>

                                    </div>

                                </div>


                                <div className="provider-detail">

                                    <span>₹</span>

                                    <div>

                                        <small>
                                            PRICE
                                        </small>

                                        <strong>
                                            ₹{booking.service?.price}
                                        </strong>

                                    </div>

                                </div>

                            </div>


                           
                            <div className="customer-info">

                                <div className="customer-avatar">
                                    👤
                                </div>

                                <div>

                                    <small>
                                        CUSTOMER
                                    </small>

                                    <strong>
                                        {booking.customer?.name}
                                    </strong>

                                    <span>
                                        📞 {booking.customer?.phone}
                                    </span>

                                </div>

                            </div>


                         

                            <div className="provider-actions">

                             

                                {booking.status === "pending" && (
                                    <>
                                        <button
                                            className="confirm-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    booking._id,
                                                    "confirmed"
                                                )
                                            }
                                        >
                                            ✓ Confirm Booking
                                        </button>

                                        <button
                                            className="cancel-provider-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    booking._id,
                                                    "cancelled"
                                                )
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}


                               

                                {booking.status === "confirmed" && (
                                    <>
                                        <button
                                            className="complete-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    booking._id,
                                                    "on_the_way"
                                                )
                                            }
                                        >
                                            🚗 On the Way
                                        </button>

                                        <button
                                            className="cancel-provider-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    booking._id,
                                                    "cancelled"
                                                )
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}


                               

                                {booking.status === "on_the_way" && (
                                    <>
                                        <button
                                            className="complete-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    booking._id,
                                                    "arrived"
                                                )
                                            }
                                        >
                                            📍 Arrived
                                        </button>

                                        <button
                                            className="cancel-provider-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    booking._id,
                                                    "cancelled"
                                                )
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}


                                

                                {booking.status === "arrived" && (
                                    <>
                                        <button
                                            className="complete-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    booking._id,
                                                    "completed"
                                                )
                                            }
                                        >
                                            ✓ Complete Service
                                        </button>

                                        <button
                                            className="cancel-provider-btn"
                                            onClick={() =>
                                                updateStatus(
                                                    booking._id,
                                                    "cancelled"
                                                )
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default ProviderBookings;