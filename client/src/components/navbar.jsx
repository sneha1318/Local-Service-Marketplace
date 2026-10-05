import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";



function getAuthData() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return {
            token: null,
            role: null
        };
    }

    try {
        
        const payload = JSON.parse(atob(token.split(".")[1]));

        
        if (payload.exp && payload.exp * 1000 > Date.now()) {
            return {
                token: token,
                role: role
            };
        }

        
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        return {
            token: null,
            role: null
        };

    } catch (error) {

    
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        return {
            token: null,
            role: null
        };
    }
}


function Navbar() {

    const navigate = useNavigate();

    
    const authData = getAuthData();

    const [token, setToken] = useState(authData.token);
    const [role, setRole] = useState(authData.role);


    useEffect(() => {

        const checkLogin = () => {

            const authData = getAuthData();

            setToken(authData.token);
            setRole(authData.role);
        };


        window.addEventListener("storage", checkLogin);


        return () => {
            window.removeEventListener("storage", checkLogin);
        };

    }, []);


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        setToken(null);
        setRole(null);

        alert("Logout successfully");

        navigate("/");
    };


    return (

        <nav className="navbar">

            

            <Link to="/" className="logo">

                <span>●</span>

                LocalService Marketplace

            </Link>


            <div className="nav-links">


                <Link to="/">
                    Home
                </Link>


                

                <Link to="/services">
                    Services
                </Link>

                {token && role === "customer" && (

                    <>

                        <Link to="/customer-dashboard">
                            Dashboard
                        </Link>


                        <Link to="/my-bookings">
                            My Bookings
                        </Link>

                    </>

                )}


                {token && role === "provider" && (

                    <>

                        <Link to="/provider-dashboard">
                            Dashboard
                        </Link>


                        <Link to="/add-service">
                            Add Service
                        </Link>


                        <Link to="/provider-bookings">
                            Provider Bookings
                        </Link>


                        <Link to="/profile">
                            Profile
                        </Link>

                    </>

                )}


                

                {!token ? (

                    <>

                        <Link to="/login">
                            Login
                        </Link>


                        <Link
                            to="/register"
                            className="register-btn"
                        >
                            Register
                        </Link>

                    </>

                ) : (

                    
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                )}

            </div>

        </nav>

    );
}


export default Navbar;