const express=require("express");
const router=express.Router();

const { registerUser,loginUser,getProfile,updateProfile,getProviderTrustScore }=require("../controllers/usercontrollers.js");
const protect=require("../middleware/authMiddleware.js");
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getProfile);
router.put("/profile",protect,updateProfile);
router.get("/provider/:providerId/trust-score",getProviderTrustScore)


module.exports=router;