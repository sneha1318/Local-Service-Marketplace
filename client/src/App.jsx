
import "./App.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/home.jsx";
import Navbar from "./components/navbar.jsx";
import Register from "./pages/register.jsx";
 import Login from "./pages/login.jsx";
 import Profile from "./pages/profile.jsx";
 import Services from "./pages/services.jsx";
 import AddService from "./pages/addservices.jsx";
 import ServiceDetails from "./pages/servicedetails.jsx";
 import BookService from "./pages/bookservice.jsx";
import MyBookings from "./pages/mybookings.jsx";
import ProviderBookings from "./pages/providerbookings.jsx";
import ProviderDashboard from "./pages/providerdashboard.jsx";
import CustomerDashboard from "./pages/customerdashboard.jsx";

function App(){
    return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
       <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route  path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route  path="/services" element={<Services/>}/>
        <Route  path="/add-service" element={<AddService/>}/>
        <Route path="/services/:id" element={<ServiceDetails/>}/>
         <Route path="/book/:serviceId" element={<BookService/>}/> 
         <Route path="/my-bookings" element={<MyBookings/>}/>
         <Route
    path="/provider-dashboard"
    element={<ProviderDashboard/>}
/>
         <Route path="/provider-bookings" element={<ProviderBookings/>} />
         <Route
    path="/customer-dashboard"
    element={<CustomerDashboard />}
/>
        
    </Routes>
    
    </BrowserRouter>
    )
}
export default App;


