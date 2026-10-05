const express=require("express");
const router=express.Router();
const {createReview, getServiceReview,getMyReviews,getProviderReviews}=require("../controllers/reviewcontroller.js");
const protect=require("../middleware/authMiddleware.js");
const authorize=require("../middleware/roleMiddleware.js");

router.post(
    "/",
    protect,
    authorize("customer"),
    createReview
);

router.get(
    "/my-reviews",
    protect,
    authorize("customer"),
    getMyReviews
)

router.get(
    "/provider",
    protect,
    authorize("provider"),
    getProviderReviews
);

router.get(
    "/:serviceId",
    getServiceReview
);


module.exports=router;