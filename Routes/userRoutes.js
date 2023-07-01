const express=require("express");
const router=express.Router()
const {registerUser,authUser, updateUser}=require("../controllers/userControllers")

router.post("/register",registerUser)
router.post("/login",authUser)
router.post("/update",updateUser)


module.exports=router; 