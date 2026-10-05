
const Service=require("../models/service.js");

const addService=async(req,res)=>{
   try {
     const {
        title,
        description,
        category,
        price,
        location,
        

     }=req.body;
     
     const service=await Service.create({
        title,
        description,
        category,
        price,
        location,
        
        provider:req.user.id,
     })
     return res.status(201).json({
        success:true,
        message:"Service added successfully",
        service
     })


   } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message,
    
    })
    
   }
}

const getAllServices=async(req,res)=>{
    try {
        const {search,category,location,minPrice,maxPrice,sort}=req.query
        let filter={isActive:true};
        if(search){
            filter.title= {$regex:search ,$options:"i"}
        }
        if(category){
            filter.category=category
        }
        if(location){
            filter.location={$regex:location,$options:"i"}
        }
        if(minPrice || maxPrice){
            filter.price={}
            if(minPrice){
                filter.price.$gte=Number(minPrice)
            }
            if(maxPrice){
                filter.price.$lte=Number(maxPrice)
            }
        }

        let sortOption={};
        if(sort=="price_asc"){
            sortOption.price=1
        }
        if(sort=="price_desc"){
            sortOption.price=-1
        }
        if(sort=="rating"){
            sortOption.rating=1
        }

        const service=await Service.find(filter)
              .populate("provider","name email phone")
              .sort(sortOption)

        return res.status(200).json({
            success:true,
            count:service.length,
            services:service
        })



    } catch (error) {
           return res.status(500).json({
            success:false,
            message:error.message
           })        
    }

}

const getServicesById=async(req,res)=>{
    try{
    const service=await Service.findById(req.params.id)
        .populate("provider","name email phone");

        if(!service){
            return res.status(404).json({
              success:false,
              message:"Service Not Found!"
            })
        }
        return res.status(200).json({
            success:true,
            service
        })
    }catch(error){
        return res.status(500).json({
            status:false,
            message:error.message,
        })
    }

}


const updateServices=async(req,res)=>{
    try {
        const service=await Service.findById(req.params.id);
        //check if service exist
        if(!service){
            return res.status(404).json({
                success:false,
                message:"Service Not Found"
            })
        }
        //check service ownership
        if(service.provider.toString()!==req.user.id){
            return res.status(403).json({
                success:false,
                message:"Not authorized to update this service!"
            })
        }
        const updatedService=await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true,

            }
        )
        return res.status(200).json({
            success:true,
            message:"Service updated successfully",
            service:updatedService
        })
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}


const deleteServices=async(req,res)=>{
    try {
        const service=await Service.findById(req.params.id);
        if(!service){
            return res.status(404).json({
                success:false,
                message:"Service Not Found"
            })
        }
        if(service.provider.toString()!==req.user.id){
            return res.status(403).json({
                success:false,
                message:"Service is not authorized to delete",
            })
        }

        await Service.findByIdAndDelete(req.params.id);

        
        return res.status(200).json({
               success:true,
               message:"service deleted successfully",
               
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

}


module.exports={
    addService,
    getAllServices,
    getServicesById,
    updateServices,
    deleteServices
}