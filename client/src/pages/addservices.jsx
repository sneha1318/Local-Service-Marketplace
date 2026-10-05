import { useState } from "react";
import {  useNavigate} from "react-router-dom";
import  axios from "axios"
import "../addservice.css";

function AddService(){
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        title:"",
        description:"",
        category:"",
        location:"",
        price:"",

    })
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const token=localStorage.getItem("token");
            const response=await axios.post(
                "http://localhost:8000/api/services",
                formData,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            alert(response.data.message);
            navigate("/services")
            setFormData({
                title:"",
                description:"",
                category:"",
                price:"",
                location:""

            })

        } catch (error) {
            alert(
                error.response?.data?.message|| "failed to add service"
            )
        }
    }
   return (
    <div className="add-service-page">

        <div className="add-service-container">

            <div className="add-service-header">
                <p>PROVIDER PANEL</p>
                <h1>Add Your Service</h1>
                <span>
                    Tell customers about the service you provide.
                </span>
            </div>

            <div className="add-service-card">

                <div className="form-section">
                    <label>Service Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Home Plumbing Service"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-section">
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe your service..."
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">

                    <div className="form-section">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            placeholder="e.g. Plumbing"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-section">
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="₹ Price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                </div>

                <div className="form-section">
                    <label>Service Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="e.g. Pune, Maharashtra"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="button"
                    className="add-service-btn"
                    onClick={handleSubmit}
                >
                    Add Service →
                </button>

            </div>

        </div>
    </div>
);
}
export default AddService;