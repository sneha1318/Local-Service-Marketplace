const Review=require("../models/review.js");
const Service=require("../models/service.js");
const Booking=require("../models/booking.js");

const createReview=async(req,res)=>{
    try {
        const {serviceId,rating,comment}=req.body;
        const service=await Service.findById(serviceId);

        if(!service){
            return res.status(404).json({
                success:false,
                message:"service not found"
            })
        }

        const completeBooking=await Booking.findOne({
            customer:req.user.id,
            service:serviceId,
            status:"completed"

        })
        if(!completeBooking){
            return res.status(400).json({
                success:false,
                message:"You can review only after completing the service!"
            })
        }

        const  existingReview=await Review.findOne({
            customer:req.user.id,
            service:serviceId
        });
        if(existingReview){
        return res.status(400).json({
            success:false,
            message:"You have already reviewd this service!"
        })
    }

        const review=await Review.create({
            customer:req.user.id,
            service:serviceId,
            rating,
            comment
        })


        const reviews=await Review.find({service : serviceId });
const totalrating=reviews.reduce(
    (sum,review)=>sum+review.rating,
    0
)
const averageRating=totalrating/reviews.length;
service.rating=Number(averageRating.toFixed(1));
await service.save();


        return res.status(201).json({
            success:true,
            message:"Review added successfully",
            review
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        }
        )
    }
}

const getServiceReview=async(req,res)=>{
    try {

       
        const reviews=await Review.find({
            service:req.params.serviceId
        })
        .populate("customer","name");

        return res.status(200).json({
            success:true,
            count:reviews.length,
            reviews
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const getMyReviews=async(req,res)=>{
    try{
    const reviews=await Review.find({
        customer:req.user.id

    })
    return res.status(200).json({
        success:true,
        count:reviews.length,
        reviews
    })
}catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}

const getProviderReviews = async (req, res) => {
    try {
        // Find all services belonging to this provider
        const services = await Service.find({
            provider: req.user.id
        }).select("_id");

        const serviceIds = services.map(
            service => service._id
        );

        // Find reviews for those services
        const reviews = await Review.find({
            service: { $in: serviceIds }
        })
        .populate("customer", "name")
        .populate("service", "title");

        return res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports={
    createReview,
    getServiceReview,
    getMyReviews,
    getProviderReviews
}


