const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors");
const cookieParser = require('cookie-parser')
const userRoutes=require("./Routes/userRoutes")
const connectDB=require("./db");
const Authenticate = require("./middlewares/auth");
const bodyParser = require("body-parser");
const jwt=require("jsonwebtoken");
const User=require("./models/userModel")

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors({ 
    origin: ['https://photodumpp.netlify.app','http://localhost:5173/' ],// Replace with your frontend domain
    // origin: 'http://localhost:5173',// Replace with your frontend domain
    credentials: true // Enable cookies and other credentials in CORS requests
  }));
app.use(express.json());
app.use("/api/user",userRoutes)

connectDB();

// app.get("/checkauth",Authenticate,(req,res)=>{
//     console.log("This is from chekauth")
//     console.log(req.rootUser);
//     if(req.rootUser){
//         res.status(201);
//         res.send(req.rootUser);
//     }
//     else{
//         res.status(400);
//         throw new Error("Not Authorized!");
//     }
// })
app.post("/checkauth",async(req,res)=>{
    console.log("This is from chekauth")
    const {token}=req.body.data;
    const verifyToken=jwt.verify(token,"johncena");
    // console.log(verifyToken);
    const rootUser=await User.findOne({_id:verifyToken.id})
    // console.log(rootUser)
    if(rootUser){
        
        res.status(201);
        res.send(rootUser);
    
    }
    else{
        res.status(400);
        throw new Error("Not Authorized");
    }
})

app.listen(3000,(req,res)=>{
    console.log("Server is set!")
})