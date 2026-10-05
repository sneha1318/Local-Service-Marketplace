const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const { setIO } =require( "./socket.js");
const cors=require("cors");
require("dotenv").config();
const connectDb=require("./config/db.js");
const userRoutes=require("./routes/userRoutes.js");
const serviceRoutes=require("./routes/serviceRoutes.js");
const bookingRoutes=require("./routes/bookingRoutes.js");
const reviewRoutes=require("./routes/reviewRoutes.js");
const app=express();
connectDb();

app.use(cors());
app.use(express.json());


app.use("/api/users",userRoutes);
app.use("/api/services",serviceRoutes);
app.use("/api/booking",bookingRoutes);
app.use("/api/reviews",reviewRoutes);


app.get("/",(req,res)=>{
    res.send("this is local_marketplace first api");
})
const PORT=process.env.PORT||5000;
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})
setIO(io);
io.on("connection",(socket)=>{
    console.log("user connected :",socket.id)

    socket.on("join",(userId)=>{
        socket.join(userId);
        console.log("user joined  room :",userId)
    })
})
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
