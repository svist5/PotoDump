const jwt=require("jsonwebtoken");
const User =require("../models/userModel")
const Token=require("../models/tokenModel")

const Authenticate=async(req,res,next)=>{
    try{
    // console.log(req.cookie.jwtoken)
    // const token=req.cookies.HareKrishna;
    // // const token=req.cookies.RadheKrishnaa;
    // // console.log(token)
    // const verifyToken=jwt.verify(token,"johncena");
    // // console.log(verifyToken);
    // const rootUser=await User.findOne({_id:verifyToken.id})
    // console.log(rootUser)
    // if(!rootUser){throw new Error("User not found!")}
    const logged_user=await Token.findOne({
        name:"HareKrishna"
    })
    const token=logged_user.token;
    const verifyToken=jwt.verify(token,"johncena");
    const rootUser=await User.findOne({_id:verifyToken.id})
    
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