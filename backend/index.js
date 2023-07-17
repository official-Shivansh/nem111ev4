const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
// const postRouter = require("./routes/postRoutes")
const cors = require("cors")
require("dotenv").config();
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
// app.use("/posts",postRouter)
app.get("/",(req,res)=>{
    try{
        res.send("welcome")
    }
    catch(error){
        res.send(error.message)
    }
})
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected successfully");
    }
    catch(error){
        console.log(error)
    }
}

app.listen(process.env.PORT,()=>{
    connect();
    console.log("listening to port 8080")
})
