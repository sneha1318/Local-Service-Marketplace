import { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "../register.css";

function Register() {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "customer"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/register",
                formData
            );

            alert(response.data.message);
            navigate("/login")

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card register-card">

                {/* Header */}
                <div className="auth-header">

                    <div className="auth-logo">
                        LS
                    </div>

                    <p className="auth-label">
                        GET STARTED
                    </p>

                    <h1>Create your account</h1>

                    <span>
                        Join our local service marketplace.
                    </span>

                </div>


                
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="input-group">
                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="input-group">
                        <label>Phone Number</label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="input-group">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="input-group">
                        <label>Account Type</label>

                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="customer">
                                Customer
                            </option>

                            <option value="provider">
                                Service Provider
                            </option>
                        </select>
                    </div>


                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Create Account →
                    </button>

                </form>


                
                <div className="auth-footer">

                    Already have an account?

                    <Link to="/login">
                        {" "}Login
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Register;