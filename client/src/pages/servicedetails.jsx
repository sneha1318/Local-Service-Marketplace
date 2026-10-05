import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ServiceReview from "../components/serviceReview";
import "../serviceDetails.css";

function ServiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trustData,setTrustData]=useState(null);

    useEffect(() => {
        const getService = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/services/${id}`
                );
                const serviceData=response.data.service;
console.log("SERVICE:", serviceData);
console.log("PROVIDER:", serviceData.provider);
console.log("PROVIDER ID:", serviceData.provider?._id);

                setService(serviceData);
                if(serviceData.provider?._id){
    const trustResponse=await axios.get(
        `http://localhost:8000/api/users/provider/${serviceData.provider._id}/trust-score`
    )
    setTrustData(trustResponse.data.trustData)
}
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getService();
    }, [id]);

    if (loading) {
        return <h2 className="details-loading">Loading service...</h2>;
    }

    if (!service) {
        return (
            <div className="not-found">
                <h2>Service not found</h2>
                <button onClick={() => navigate("/services")}>
                    Back to Services
                </button>
            </div>
        );
    }

    const handleBooking = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please, Login first!");
            navigate("/login");
            return;
        }

        navigate(`/book/${service._id}`);
    };

    return (
        <div className="details-page">

           
            <button
                className="back-btn"
                onClick={() => navigate("/services")}
            >
                ← Back to Services
            </button>

          
            <div className="details-container">

                <div className="details-main">

                    <div className="details-top">
                        <span className="details-category">
                            {service.category}
                        </span>

                        <span className="details-rating">
                            ⭐ {service.rating || "0"}
                        </span>
                    </div>

                    <h1>{service.title}</h1>

                    <p className="details-description">
                        {service.description}
                    </p>

                    <div className="details-info">

                        <div className="info-item">
                            <span>📍</span>
                            <div>
                                <small>Location</small>
                                <strong>{service.location}</strong>
                            </div>
                        </div>

                        <div className="info-item">
                            <span>💰</span>
                            <div>
                                <small>Service Price</small>
                                <strong>₹{service.price}</strong>
                            </div>
                        </div>

                        <div className="info-item">
                            <span>⭐</span>
                            <div>
                                <small>Customer Rating</small>
                                <strong>{service.rating || "No ratings yet"}</strong>
                            </div>
                        </div>

                    </div>

                    <button
                        className="book-btn"
                        onClick={handleBooking}
                    >
                        Book This Service →
                    </button>

                </div>

                <div className="provider-card">

                    <p className="provider-label">
                        SERVICE PROVIDER
                    </p>

                    <div className="provider-avatar">
                        {service.provider?.name?.charAt(0).toUpperCase()}
                    </div>

                    <h2>{service.provider?.name}</h2>

                    

                     {trustData && (
    <div className="trust-score-box">

        <div className="trust-score-header">
            <span>TRUST SCORE</span>
            <strong>{trustData.trustScore}/100</strong>
        </div>

        <div className="trust-score-rating">
            ⭐ {trustData.averageRating} Rating
        </div>

        <div className="trust-score-details">
            <p>
                ✓ {trustData.completedBookings} Completed
            </p>

            <p>
                ✓ {trustData.completionRate}% Completion Rate
            </p>

            {trustData.isVerified && (
                <p>
                    ✓ Verified Provider
                </p>
            )}
        </div>

    </div>
)}
<div className="provider-info">
                        <p>
                            <strong>Email</strong>
                            <span>{service.provider?.email}</span>
                        </p>

                        <p>
                            <strong>Phone</strong>
                            <span>{service.provider?.phone}</span>
                        </p>
                    </div>

                </div>

            </div>

            
            <div className="reviews-section">
                <ServiceReview serviceId={service._id} />
            </div>

        </div>
    );
}

export default ServiceDetails;