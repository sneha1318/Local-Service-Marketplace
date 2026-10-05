import { useEffect, useState } from "react";
import {io} from "socket.io-client";

import axios from "axios";
import "../mybookings.css";

function MyBookings() {
   
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    const socket = io("http://localhost:8000");

    const token = localStorage.getItem("token");

const payload = JSON.parse(atob(token.split(".")[1]));
const userId = payload.id;

socket.emit("join", userId);

    socket.on("bookingStatusUpdated", (data) => {
        console.log("BOOKING UPDATE RECEIVED:", data);
        setBookings((previousBookings) =>
            previousBookings.map((booking) =>
                String(booking._id )=== String(data.bookingId)
                    ? {
                          ...booking,
                          status: data.status
                      }
                    : booking
            )
        );
    });

    return () => {
        socket.disconnect();
    };
}, []);

    useEffect(() => {
        const getMyBookings = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:8000/api/booking/my-bookings",
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

        getMyBookings();
    }, []);

    const cancelBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.delete(
                `http://localhost:8000/api/booking/${bookingId}`,
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
                            status: "cancelled"
                        }
                        : booking
                )
            );

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to cancel booking"
            );
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const steps = [
        "pending",
        "confirmed",
        "on_the_way",
        "arrived",
        "completed"
    ];

    const getStepLabel = (step) => {
        const labels = {
            pending: "Booking Placed",
            confirmed: "Confirmed",
            on_the_way: "On the Way",
            arrived: "Arrived",
            completed: "Completed"
        };

        return labels[step];
    };

    if (loading) {
        return (
            <div className="my-bookings-page">
                <h2 className="bookings-loading">
                    Loading bookings...
                </h2>
            </div>
        );
    }

    return (
        <div className="my-bookings-page">

            <div className="bookings-header">
                <h1>My Bookings</h1>
                <p>Track your service bookings and orders</p>
            </div>

            {bookings.length === 0 ? (
                <div className="no-bookings">
                    <h3>No bookings found</h3>
                    <p>
                        You haven't booked any services yet.
                    </p>
                </div>
            ) : (

                <div className="bookings-grid">

                    {bookings.map((booking) => (

                        <div
                            className="booking-card"
                            key={booking._id}
                        >

                            {/* Header */}

                            <div className="booking-card-header">

                                <div>
                                    <span className="booking-category">
                                        {booking.service?.category}
                                    </span>

                                    <h2>
                                        {booking.service?.title}
                                    </h2>
                                </div>

                                <span
                                    className={`booking-status ${booking.status}`}
                                >
                                    {booking.status.replace("_", " ")}
                                </span>

                            </div>


                            {/* Provider */}

                            <div className="provider-info">

                                <div className="provider-avatar">
                                    👤
                                </div>

                                <div>
                                    <small>PROVIDER</small>

                                    <strong>
                                        {booking.provider?.name}
                                    </strong>

                                    <span>
                                        📞 {booking.provider?.phone}
                                    </span>
                                </div>

                            </div>


                            

                            <div className="booking-details">

                                <div className="booking-detail">

                                    <span>📅</span>

                                    <div>
                                        <small>
                                            SERVICE DATE
                                        </small>

                                        <strong>
                                            {formatDate(
                                                booking.bookingDate
                                            )}
                                        </strong>
                                    </div>

                                </div>


                                <div className="booking-detail">

                                    <span>🛒</span>

                                    <div>
                                        <small>
                                            ORDER PLACED
                                        </small>

                                        <strong>
                                            {formatDate(
                                                booking.createdAt
                                            )}
                                        </strong>
                                    </div>

                                </div>


                                <div className="booking-detail">

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


                                <div className="booking-detail">

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


                            {/* Tracking */}

                            {booking.status !== "cancelled" && (

                                <div className="tracking-section">

                                    <h3>
                                        Service Tracking
                                    </h3>

                                    <div className="tracking-timeline">

                                        {steps.map((step, index) => {

                                            const currentIndex =
                                                steps.indexOf(
                                                    booking.status
                                                );

                                            const completed =
                                                index <= currentIndex;

                                            return (
                                                <div
                                                    className={`tracking-step ${
                                                        completed
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    key={step}
                                                >

                                                    <div className="tracking-dot">
                                                        {completed
                                                            ? "✓"
                                                            : ""}
                                                    </div>

                                                    <span>
                                                        {getStepLabel(step)}
                                                    </span>

                                                </div>
                                            );

                                        })}

                                    </div>

                                </div>

                            )}


                            

                            {booking.status === "cancelled" && (

                                <div className="cancelled-message">
                                    ❌ This booking has been cancelled.
                                </div>

                            )}


                          

                            {booking.status !== "completed" &&
                                booking.status !== "cancelled" && (

                                    <button
                                        className="cancel-booking-btn"
                                        onClick={() =>
                                            cancelBooking(
                                                booking._id
                                            )
                                        }
                                    >
                                        Cancel Booking
                                    </button>

                                )}

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default MyBookings;