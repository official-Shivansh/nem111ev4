const jwt = require("jsonwebtoken");
const blacklist = require("../blacklist")

const middleware = (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(blacklist.includes(token)){
            res.send("Please login again");
        }
        if(!token){
            res.status(401).send("token not provided");
       }
       const decoded= jwt.verify(token,"secret7");
       console.log(decoded);

       req.userId = decoded.userId;
       req.username = decoded.username;

       if(!decoded){
        res.send('You are not Authenticated');
       }
       next()
    }
    catch(error){
        console.log(error);
        res.send(error)
    }
} 
module.exports= middleware;