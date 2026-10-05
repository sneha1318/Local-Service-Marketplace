import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../login.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
                "http://localhost:8000/api/users/login",
                formData
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);
            localStorage.setItem("userId",response.data.user._id);

            alert("login successful");

            window.location.href = "/";
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "login failed!"
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                
                <div className="auth-header">

                    <div className="auth-logo">
                        LS
                    </div>

                    <p className="auth-label">
                        WELCOME BACK
                    </p>

                    <h1>
                        Login to your account
                    </h1>

                    <span>
                        Find and manage trusted local services.
                    </span>

                </div>


                
                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>
                            Email Address
                        </label>

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

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Login →
                    </button>

                </form>


                
                <div className="auth-footer">

                    Don't have an account?

                    <Link to="/register">
                        {" "}Create one
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;