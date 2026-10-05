
const Booking=require("../models/booking.js");
const Service=require("../models/service.js");
const { getIO } = require("../socket.js");

const createBooking=async(req,res)=>{
    try {
        const{serviceId,bookingDate}=req.body;
        const service=await Service.findById(serviceId)
        if(!service){
            return res.status(404).json({
                success:false,
                message:"Service Not Found"
            })
        }
        const booking=await Booking.create({
            customer:req.user.id,
            provider:service.provider,
            service:serviceId,
            bookingDate
    })

    return res.status(201).json({
        success:true,
        message:"Booking created Successfully",
        booking
    })

    } catch (error) {
        console.log("cancel error",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

const getMyBookings=async(req,res)=>{
   try {
    const bookings=await Booking.find({
        customer:req.user.id
    })
    .populate("service","title price category")
    .populate("provider","name phone")
    .sort({ createdAt: -1 })

    return res.status(200).json({
         success:true,
         count:bookings.length,
         bookings
    })
    
   } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message
      })
   }
}


const getProviderBookings=async(req,res)=>{
    try{
    const bookings=await Booking.find(
        {
            provider:req.user.id
        }
    )
    .populate("customer","name phone")
    .populate("service","title price category");

    return res.status(200).json({
        success:true,
        count:bookings.length,
        bookings
    })
}catch(error){
     return res.status(500).json({
        success:false,
        message:error.message
     })
}
}

const updateBookingStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const booking=await Booking.findById(req.params.id);
        if(!booking){
            return res.status(404).json({
                success:false,
                message:"Booking not found",
            })
        }
        //check ownership
        if(booking.provider.toString()!==req.user.id){
            return res.status(403).json({
                success:false,
                message:"not authorized"
            })

        }
            if(booking.status==="completed" || booking.status==="cancelled"){
                return res.status(400).json({
                    success:false,
                    message:"Completed  and cancelled booking can not be changed"
                })
             }

           if(booking.status==="pending" &&
              status!=="confirmed" && status!=="cancelled"
             ){
                return res.status(400).json({
                    success:false,
                    message:"Pending booking can  be confirmed or cancelled"
                })
            }

             if(booking.status==="confirmed" && status!=="on_the_way" && status!=="cancelled"){
                return res.status(400).json({
                    success:false,
                    message:"Confirmed booking can only  be marked as  on-the-way or cancelled"
                })
             }
             if(booking.status==="on_the_way" && status!=="arrived" && status!=="cancelled"){
                return res.status(400).json({
                    success: false,
                message: "On-the-way booking can only be marked as arrived or cancelled"
                })
             }
             if (
            booking.status === "arrived" &&
            status !== "completed" &&
            status !== "cancelled"
        ) {
            return res.status(400).json({
                success: false,
                message: "Arrived booking can only be completed or cancelled"
            });
        }
             

        booking.status=status;
        await booking.save();
        const io = getIO();

io.to(booking.customer.toString()).emit("bookingStatusUpdated", {
    bookingId: booking._id,
    status: booking.status
});
        return res.status(200).json({
            success:true,
            message:"booking status updated successfully",
            booking
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const cancelBooking=async(req,res)=>{
    try {
         const booking=await Booking.findById(req.params.id);
         if(!booking){
            return res.status(404).json({
                success:false,
                message:"booking not found"
            })
         }
         //check ownership of customer
         if(booking.customer.toString()!==req.user.id){
            return res.status(403).json({
                success:false,
                message:"not authorized"
            })
         }
         if(booking.status=="completed" || booking.status=="cancelled"){
            return res.status(400).json({
                success:false,
                message:"booking can not be cancelled"
            })
         }
         booking.status="cancelled";
         await booking.save();
         return res.status(200).json({
            success:true,
            message:"Booking deleted successfully"
         })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
   
}


module.exports={
    createBooking,
    getMyBookings,
    getProviderBookings,
    updateBookingStatus,
    cancelBooking
}