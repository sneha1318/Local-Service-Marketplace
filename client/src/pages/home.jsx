


import { Link ,useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios"
import "../Home.css";

function Home() {
    const navigate=useNavigate();
   
   const [location,setLocation]=useState("");
   const [search,setSearch]=useState("")
   useEffect(() => {
    const getServices = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/api/services"
            );

            
        } catch (error) {
            console.log(error);
        }
    };

    getServices();
}, []);

    return (
        <div className="home">

            
            <section className="hero">

                <div className="hero-content">
                    <p className="hero-small-text">
                        Trusted Local Services
                    </p>

                    <h1>
                        Find the Right Service
                        <br />
                        for Your <span>Everyday Needs</span>
                    </h1>

                    <p className="hero-description">
                        Connect with trusted local professionals for
                        home services, repairs, cleaning, beauty,
                        wellness and more.
                    </p>

                    
                    <div className="search-box">

    <div className="search-field">
        <span>📍</span>
        <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
        />
    </div>

    <div className="search-field">
        <span>🔍</span>
        <input
            type="text"
            placeholder="Search for services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>

    <button
        className="search-button"
        onClick={() => {
            navigate(
            `/services?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`
        );
        }}
    >
        →
    </button>

</div>

                    
                    <div className="trust-points">
                        <span>✓ Verified Providers</span>
                        <span>✓ Secure Booking</span>
                        <span>✓ Real Reviews</span>
                    </div>
                </div>

                
                <div className="hero-image-container">

                    <img
                        src="/home-service.png"
                        alt="Local service marketplace"
                        className="hero-image"
                    />

                    

                </div>

            </section>


           
<section className="categories-section">

    <div className="section-heading">
        <p>EXPLORE SERVICES</p>
        <h2>Popular Categories</h2>
        <span>
            Find trusted professionals for your everyday needs
        </span>
    </div>

    <div className="category-grid">

        <Link to="/services" className="category-card">
            <div className="category-icon">🏠</div>
            <h3>Home Services</h3>
            <p>Cleaning & maintenance</p>
        </Link>

        <Link to="/services" className="category-card">
            <div className="category-icon">💇</div>
            <h3>Beauty & Wellness</h3>
            <p>Salon & personal care</p>
        </Link>

        <Link to="/services" className="category-card">
            <div className="category-icon">🔧</div>
            <h3>Plumbing</h3>
            <p>Repairs & installation</p>
        </Link>

        <Link to="/services" className="category-card">
            <div className="category-icon">⚡</div>
            <h3>Electrical</h3>
            <p>Electrical repairs</p>
        </Link>

        <Link to="/services" className="category-card">
            <div className="category-icon">💪</div>
            <h3>Health & Fitness</h3>
            <p>Fitness & wellness</p>
        </Link>

        <Link to="/services" className="category-card">
            <div className="category-icon">📚</div>
            <h3>Tutoring</h3>
            <p>Learn from experts</p>
        </Link>

    </div>

    <Link to="/services" className="view-services">
        View All Services →
    </Link>

</section>





<section className="why-section">

    <div className="why-content">
        <p className="section-label">WHY CHOOSE US</p>

        <h2>
            Everything You Need,
            <br />
            <span>In One Place.</span>
        </h2>

        <p className="why-description">
            We make it simple to find reliable local professionals,
            compare services and book with confidence.
        </p>

        <div className="feature-list">

            <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div>
                    <h3>Verified Providers</h3>
                    <p>
                        Connect with trusted and verified local professionals.
                    </p>
                </div>
            </div>

            <div className="feature-item">
                <div className="feature-icon">★</div>
                <div>
                    <h3>Real Customer Reviews</h3>
                    <p>
                        Make better decisions using genuine customer ratings.
                    </p>
                </div>
            </div>

            <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <div>
                    <h3>Secure Booking</h3>
                    <p>
                        Book services easily with a simple and secure process.
                    </p>
                </div>
            </div>

            <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div>
                    <h3>Easy & Convenient</h3>
                    <p>
                        Find the right service without wasting your time.
                    </p>
                </div>
            </div>

        </div>
    </div>


    <div className="why-visual">

        <div className="trust-card">

            <div className="trust-top">
                <span className="trust-icon">✓</span>
                <span>Trusted Marketplace</span>
            </div>

            <h3>Find professionals<br />you can trust.</h3>

            <div className="stats">

                <div>
                    <strong>1000+</strong>
                    <span>Professionals</span>
                </div>

                <div>
                    <strong>4.8★</strong>
                    <span>Average Rating</span>
                </div>

            </div>

            <div className="mini-card">
                <span>✓</span>
                <div>
                    <strong>Verified Service</strong>
                    <p>Trusted by local customers</p>
                </div>
            </div>

        </div>

    </div>

</section>



<section className="how-section">

    <div className="section-heading">
        <p>HOW IT WORKS</p>
        <h2>Get Your Service in 4 Simple Steps</h2>
        <span>
            Finding and booking a local professional is quick and easy.
        </span>
    </div>

    <div className="steps-container">

        <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">🔍</div>
            <h3>Find a Service</h3>
            <p>
                Browse categories or search for the service you need.
            </p>
        </div>

        <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">📋</div>
            <h3>Choose a Provider</h3>
            <p>
                Compare service details, prices and customer reviews.
            </p>
        </div>

        <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">📅</div>
            <h3>Book the Service</h3>
            <p>
                Select the service and create your booking securely.
            </p>
        </div>

        <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-icon">⭐</div>
            <h3>Get Service & Review</h3>
            <p>
                Get your service and share your experience with a review.
            </p>
        </div>

    </div>

</section>



<section className="provider-cta">

    <div className="provider-content">
        <p className="section-label">FOR SERVICE PROVIDERS</p>

        <h2>
            Grow Your Business
            <br />
            <span>With LocalService.</span>
        </h2>

        <p>
            Join our marketplace, showcase your services,
            connect with local customers and grow your business.
        </p>

        <Link to="/register" className="provider-btn">
            Become a Provider →
        </Link>
    </div>

    <div className="provider-visual">
        <div className="provider-circle">
            <span>👨‍🔧</span>
        </div>

        <div className="provider-badge badge-one">
            ✓ Verified
        </div>

        <div className="provider-badge badge-two">
            ⭐ 4.8 Rating
        </div>
    </div>

</section>


<footer className="footer">

    <div className="footer-main">

        <div className="footer-brand">
            <Link to="/" className="footer-logo">
                <span>✦</span> LocalService Marketplace
            </Link>

            <p>
                Connect with trusted local professionals
                for your everyday service needs.
            </p>
        </div>


        <div className="footer-column">
            <h3>Explore</h3>

            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/register">Register</Link>
        </div>


        <div className="footer-column">
            <h3>For Providers</h3>

            <Link to="/register">Become a Provider</Link>
            <Link to="/login">Provider Login</Link>
        </div>


        <div className="footer-column">
            <h3>Quick Links</h3>

            <Link to="/login">Login</Link>
            <Link to="/services">Find Services</Link>
        </div>

    </div>


    <div className="footer-bottom">

        <p>
            © 2026 LocalService. All rights reserved.
        </p>

        <p>
            Trusted • Local • Convenient
        </p>

    </div>

</footer>
</div>
    );
}

export default Home;