const express=require("express");
const router=express.Router();
const {addService,getAllServices, getServicesById, updateServices, deleteServices}=require("../controllers/serviceController.js");
const protect=require("../middleware/authMiddleware.js");
const authorize=require("../middleware/roleMiddleware.js");


router.get("/",getAllServices);
router.get("/:id",getServicesById);

router.post(
    "/",
    protect,
    authorize("provider"),
    addService
)
router.put(
    "/:id",
    protect,
    authorize("provider"),
    updateServices
)
router.delete(
    "/:id",
    protect,
    authorize("provider"),
    deleteServices
)
module.exports=router;
