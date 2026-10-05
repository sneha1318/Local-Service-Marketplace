const mongoose=require("mongoose");
const connectDB=async()  =>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongo connected :${conn.connection.host}`);
    } catch (error) {
        console.log("db connection failed");
        console.log(error.message);
        process.exit(1);
    }
}
module.exports=connectDB;