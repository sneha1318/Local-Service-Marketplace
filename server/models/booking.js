const mongoose=require("mongoose");


const bookingSchema=new mongoose.Schema(
    {
        customer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true

        },
        provider:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true

        },
        service:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Service",
            required:true

        },
        bookingDate:{
            type:Date,
            required:true
            

        },
        status:{
            type:String,
            enum:["pending","confirmed","on_the_way","arrived","completed","cancelled"],
            
            default:"pending"

        }
    },
    {
        timestamps:true

    }
);
module.exports=mongoose.model("Booking",bookingSchema);