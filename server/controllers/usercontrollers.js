const User=require("../models/user.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const CalculateTrustScore=require("../utils/trustscore.js")
const registerUser=async(req,res)=>{
    try {
        const {name,email,password,phone,role}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
           return res.status(400).json({
                success:false,
                message:"Email already exists"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            phone,
            role
        })
        return res.status(201).json({
            success:true,
            message:"user registered successfully",
            user
        })
    } catch (error) {
       return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

 const loginUser=async(req,res)=>{
    try{
      const {email,password}=req.body;
      const user=await User.findOne({email});
      if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
      }

       const isMatch=await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(401).json({
            success:false,
            message:"Invalid Credentials!"
        })
      }

      const token=jwt.sign({
        id:user._id,
        role:user.role
      },
    
      process.env.JWT_SECRET,
      {
        expiresIn:"7d"
      }
    );
           user.password = undefined;
      return res.status(200).json({
        success:true,
        message:"Login Successfully",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            
        }
      })
    }catch(error){
         return res.status(500).json({
            success:false,
            message:error.message
         })
    }
 }


 const getProfile=async(req,res)=>{
     try {
      const user=await User.findById(req.user.id).select("-password");
          if(!user){
            return res.status(404).json({
              success:false,
              message:"User not found",
            })
          }
          return res.status(200).json({
            success:true,
              user
          })
      
     } catch (error) {
        return res.status(500).json({
          success:false,
          message:error.message,
        })
      
     }
 }

const updateProfile = async (req, res) => {
    try {

        const { name, phone } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profileImage: user.profileImage
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

 const getProviderTrustScore=async(req,res)=>{
 try {
    const providerId=req.params.providerId
    const trustscore=await CalculateTrustScore(providerId);
    if(!trustscore){
      return res.status(404).json ({
        success:false,
        message:"provider not found"
      })
    }
    return  res.status(200).json({
      success:true,
      trustData:trustscore
    })
 } catch (error) {
  return res.status(500).json({
            success: false,
            message: error.message
        });
 }
 }
 

module.exports={
      registerUser,
      loginUser,
      getProfile,
      updateProfile,
      getProviderTrustScore
}


