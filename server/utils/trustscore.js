const Booking=require("../models/booking.js");
const Review=require("../models/review.js");
const User=require("../models/user.js")

const CalculateTrustScore=async(providerId)=>{
    const provider=await User.findById(providerId);
    if(!provider){
        return null;
    }
    const bookings=await Booking.find({
        provider:providerId
    })
    const TotalBookings=bookings.length;
    const CompleteBookings=bookings.filter(
        booking=>booking.status==="completed"
    ).length;

    const CancelledBooking=bookings.filter(
        booking=>booking.status==="cancelled"
    ).length;
    const decidedbookings=CompleteBookings+CancelledBooking;

    const completionRate=
    decidedbookings===0
    ?0
    :(CompleteBookings/decidedbookings)*100
    const services=await require("../models/service.js").find({
        provider:providerId
    })
    const serviceIds=services.map(service=>service._id)
    const reviews=await Review.find({
            service:{$in:serviceIds}
    }) 
     const averageRating =
        reviews.length === 0
            ? 0
            : reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length;
const ratingScore=(averageRating/5)*40
const completionScore=(completionRate/100)*30
const experienceScore =
        Math.min(CompleteBookings / 50, 1) * 20;

    const verificationScore = provider.isVerified ? 10 : 0;

    const trustScore = Math.round(
        ratingScore +
        completionScore +
        experienceScore +
        verificationScore
    );

     return {
        trustScore,
        averageRating: Number(averageRating.toFixed(1)),
        CompleteBookings,
        CancelledBooking,
        TotalBookings,
        completionRate: Number(completionRate.toFixed(1)),
        isVerified: provider.isVerified
    };
};


module.exports = CalculateTrustScore;

