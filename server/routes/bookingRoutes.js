const express=require("express");
const router=express.Router();

const {createBooking,getMyBookings, getProviderBookings, updateBookingStatus, cancelBooking}=require("../controllers/bookingController.js");

const protect=require("../middleware/authMiddleware.js");
const authorize=require("../middleware/roleMiddleware.js");

router.post(
    "/",
    protect,
    authorize("customer"),
    createBooking

)
router.get(
    "/my-bookings",
    protect,
    authorize("customer"),
    getMyBookings
)
 router.get(
    "/provider",
    protect,
    authorize("provider"),
    getProviderBookings
 )
 router.put(
    "/:id/status",
    protect,
    authorize("provider"),
    updateBookingStatus
 )
 router.delete(
    "/:id",
    protect,
    authorize("customer"),
    cancelBooking
 )

module.exports=router;