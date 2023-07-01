const User=require("../models/userModel");
const Post=require("../models/postModel")
const generateToken=require("../config/generateToken");
// const matchPassword=require("..")
const registerUser=async(req,res)=>{
    const {name,email,password,dp}=req.body.data;
    // checking the response is correct or not
    if(!name|| !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields");
    }
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    console.log("creating user!")
    console.log(dp)
    const user =await User.create({
        name:name,
        email,
        password,
        dp
    })
    // user.generateToken();
    if(user){
        console.log("User created!");
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error("failed to create user!");
    }
}
const authUser=async(req,res)=>{

    const {email,password}=req.body.data;
    const user=await User.findOne({email});
    
    if(user && await user.matchPassword(password)){
        // console.log(user);
        const token=generateToken(user._id);
        console.log(token);
        res.cookie('HareKrishna', token, { maxAge: Date.now()+ 36000000 },{secure:true});
        // if(req.cookies.HareKrishna)
        //     console.log("Cookies generated!");

        // res.status(201).json({
        //     _id:user._id,
        //     name:user.name,
        //     email:user.email,
        //     pic:user.pic,
        //     token: generateToken(user._id),
        // })
        res.status(201);
        res.send("Cookies created successfully!")
    }
    else{
        res.status(400);
        throw new Error("Password didn't match!/Wrong credentials!");
    }
}
const updateUser=async(req,res)=>{
    console.log("this is from update character!")
    const {email,password,cover_photo,dp,name,postPic}=req.body.data;
    
    console.log("ehhehe"+postPic.pic)
    if(postPic.pic){
        console.log(postPic);
        console.log(" Creating a new post");
        // const new_post= await Post.create({
        //     pic:postPic.pic,
        //     caption:"No Caption needed"
        // })
        const new_post={
            pic:postPic.pic,
        }
        // console.log(new_post)


        const updated_char=await User.findOneAndUpdate({email:email},{cover_photo:cover_photo,dp:dp,name:name,password:password,$push: {posts:new_post}});
    }
    // const photo=await User.findOne({email});
    // console.log("THis is: "+photo.posts[0].pic)
    const updated_char=await User.findOneAndUpdate({email:email},{cover_photo:cover_photo,dp:dp,name:name,password:password});
    // console.log(updated_char.posts);
    res.status(201);
    res.send(updated_char);
}
module.exports={registerUser,authUser,updateUser}