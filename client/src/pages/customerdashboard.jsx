import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../customerdashbord.css";

function CustomerDashboard() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getBookings = async () => {

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

        getBookings();

    }, []);


    if (loading) {

        return (
            <div className="customer-dashboard-loading">
                <h2>Loading dashboard...</h2>
            </div>
        );

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


    return (

        <div className="customer-dashboard">

            

            <div className="customer-dashboard-header">

                <div>

                    <h1>Customer Dashboard</h1>

                    <p>
                        Manage your bookings and track your services
                    </p>

                </div>

                <button
                    className="browse-services-btn"
                    onClick={() => navigate("/services")}
                >
                    Browse Services
                </button>

            </div>


           

            <div className="customer-dashboard-cards">

                <div className="customer-dashboard-card">

                    <h3>Total Bookings</h3>

                    <h2>{totalBookings}</h2>

                </div>


                <div className="customer-dashboard-card">

                    <h3>Pending</h3>

                    <h2>{pendingBookings}</h2>

                </div>


                <div className="customer-dashboard-card">

                    <h3>Active</h3>

                    <h2>{activeBookings}</h2>

                </div>


                <div className="customer-dashboard-card">

                    <h3>Completed</h3>

                    <h2>{completedBookings}</h2>

                </div>


                <div className="customer-dashboard-card">

                    <h3>Cancelled</h3>

                    <h2>{cancelledBookings}</h2>

                </div>

            </div>


            

            <div className="customer-recent-bookings">

                <div className="recent-bookings-header">

                    <div>

                        <h2>Recent Bookings</h2>

                        <p>
                            Your latest service bookings
                        </p>

                    </div>

                    {bookings.length > 0 && (

                        <button
                            className="view-all-btn"
                            onClick={() => navigate("/my-bookings")}
                        >
                            View All
                        </button>

                    )}

                </div>


                {bookings.length === 0 ? (

                    <div className="customer-no-bookings">

                        <div className="no-bookings-icon">
                            📋
                        </div>

                        <h3>No bookings yet</h3>

                        <p>
                            You haven't booked any services yet.
                        </p>

                        <button
                            className="browse-services-btn"
                            onClick={() => navigate("/services")}
                        >
                            Find a Service
                        </button>

                    </div>

                ) : (

                    <div className="customer-bookings-list">

                        {bookings.slice(0, 5).map((booking) => (

                            <div
                                className="customer-recent-booking"
                                key={booking._id}
                            >

                                <div className="customer-booking-main">

                                    <div className="customer-booking-icon">
                                        
                                    </div>

                                    <div>

                                        <strong>
                                            {booking.service?.title}
                                        </strong>

                                        <p>
                                            Provider:{" "}
                                            {booking.provider?.name || "Provider"}
                                        </p>

                                    </div>

                                </div>


                                <div className="customer-booking-right">

                                    <span
                                        className={`customer-status ${booking.status}`}
                                    >
                                        {booking.status.replace("_", " ")}
                                    </span>

                                    <p>
                                        ₹{booking.service?.price}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default CustomerDashboard;