const mongoose=require("mongoose");

const serviceSchema=new mongoose.Schema({
    
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,

    },
    category:{
        type:String,
        required:true,
    },
    
    price:{
        type:Number,
        required:true,

    },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    location:{
        type:String,
        required:[true,"location is required"]
    },
    rating:{
        type:Number,
        default:0
    },
    totalReviews:{
        type:Number,
        default:0,
    },

    isActive:{
        type:Boolean,
        default:true
    },

},
{
    timestamps:true,
}
  
)
module.exports=mongoose.model("Service",serviceSchema);
