const mongoose=require("mongoose");
const userSchema=new  mongoose.Schema(
    {
       
        name:{
            type:String,
            required:[true,"name is reuired"],
            trim:true,
        },
        email:{
            type:String,
            required:[true,"Email is required"],
            trim:true,
            unique:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:[true,"Password is required"],
        },
        phone:{
            type:String,
            required:[true,"Phone Number is required"],
        },
        role:{
            type:String,
            enum:["customer","provider","admin"],
            default:"customer",
        },
        profileImage:{
            type:String,
            default:"",
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
        isActive:{
          type:Boolean,
          default:true,
        },

    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("User",userSchema);