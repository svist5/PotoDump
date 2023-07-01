const jwt=require("jsonwebtoken");
const User =require("../models/userModel")

const Authenticate=async(req,res,next)=>{
    try{
    // console.log(req.cookie.jwtoken)
    const token=req.cookies.HareKrishna;
    // const token=req.cookies.RadheKrishnaa;
    // console.log(token)
    const verifyToken=jwt.verify(token,"johncena");
    // console.log(verifyToken);
    const rootUser=await User.findOne({_id:verifyToken.id})
    console.log(rootUser)
    if(!rootUser){throw new Error("User not found!")}
    req.token=token;
    req.rootUser=rootUser;
    req.userID=rootUser._id;
    next();
}
    catch(err){
        res.status(401).send("Unauthorized: No token provided.");
        console.log(err);
        next();
    }
}
module.exports=Authenticate;