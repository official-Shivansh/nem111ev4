const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklist = require("../blacklist");

router.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    const newPassword = await bcrypt.hash(password,10);
    try{
        const newUser = await User.create({
            name,
            email,
            password:newPassword
        })
        res.status(200).send(newUser);

    }
    catch(error){
        return res.status(500).send(error.message)
    }
})
 

router.post("/login",async(req,res)=>{
    try{
        const {name,password}= req.body;
        const user = await User.findOne({name});
        if(!user){
            res.send("sign up ")
        }
        const verify = await bcrypt.compare(password,user.password);
        if(!verify){
            res.status(401).send("wrong password")
        }

        const token = jwt.sign(
            {userId:user._id,name:user.name},
            "secret7",
            {expiresIn:"3h"}
        );
        const refreshToken = jwt.sign(
            {userId:user._id,name:user.name},
            "shivansh",
            {expiresIn:"6h"}
        );

        res.status(200).send({token,refreshToken});

    }
    catch(error){
        return res.status(500).send(error.message)
    }
})
module.exports= router;