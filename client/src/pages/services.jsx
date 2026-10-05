import {useState,useEffect} from "react"
import axios from "axios"
import { Link ,useSearchParams} from "react-router-dom"
import "../services.css"


function Services(){
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
const location = searchParams.get("location") || "";
    const [services,setServices]=useState([]);
    const [loading,setLoading]=useState(true);
    const [category, setCategory] = useState("");
    useEffect(()=>{
        const getServices=async()=>{
            try {
                const response=await axios.get(
                    "http://localhost:8000/api/services"
                )
                setServices(response.data.services)
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        getServices();
    },[]);


const handleSearchChange = (e) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
        params.set("search", e.target.value);
    } else {
        params.delete("search");
    }

    setSearchParams(params);
};

const handleLocationChange = (e) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
        params.set("location", e.target.value);
    } else {
        params.delete("location");
    }

    setSearchParams(params);
};

const clearFilters = () => {
    setSearchParams({});
    setCategory("");
};

 
     const filteredServices = services.filter((service) => {
    const matchesSearch = (service.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesLocation = (service.location || "")
        .toLowerCase()
        .includes(location.toLowerCase());

    const matchesCategory =
        category === "" || service.category === category;

    return matchesSearch && matchesLocation && matchesCategory;
});
    if(loading){
        return <h2>Loading services ...</h2>
    }
    return (
       <div className="services-page">

            {/* Header */}
            <div className="services-header">
                <p>LOCAL SERVICES</p>
                <h1>Find the Right Service for You</h1>
                <span>
                    Discover trusted professionals and services near you.
                </span>
            </div>


            


              <div className="service-filters">

    <div className="filter-input">
        <span>🔍</span>

        <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={handleSearchChange}
        />
    </div>

    <div className="filter-input">
        <span>📍</span>

        <input
            type="text"
            placeholder="Enter location..."
            value={location}
            onChange={handleLocationChange}
        />
    </div>

    <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
    >
        <option value="">All Categories</option>

        {[...new Set(services.map(service => service.category))]
            .map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}
    </select>

    {(search || location || category) && (
        <button
            className="clear-filter-btn"
            onClick={clearFilters}
        >
            Clear
        </button>
    )}

</div>



            {filteredServices.length === 0 ? (
                <div className="no-services">
                    <div>🔍</div>
                    <h2>No services found</h2>
                    <p>
                        Try searching for another service or location.
                    </p>
                    <Link to="/services">
                        View All Services
                    </Link>
                </div>
            ) : (
                <div className="services-grid">

                    {filteredServices.map((service) => (

                        <div className="service-card" key={service._id}>

                            <div className="service-card-top">
                                <span className="service-category">
                                    {service.category}
                                </span>

                                <span className="service-rating">
                                    ⭐ {service.rating || "0"}
                                </span>
                            </div>

                            <h2>{service.title}</h2>

                            <p className="service-description">
                                {service.description}
                            </p>

                            <div className="service-location">
                                📍 {service.location}
                            </div>

                            <div className="service-card-bottom">

                                <div>
                                    <span className="price-label">
                                        Starting from
                                    </span>

                                    <strong>
                                        ₹{service.price}
                                    </strong>
                                </div>

                                <Link
                                    to={`/services/${service._id}`}
                                    className="details-btn"
                                >
                                    View Details →
                                </Link>

                            </div>

                        </div>
                    ))}

                </div>
            )}
        </div>

    )
}
export default Services;