const express=require("express");
const router=express.Router()
const {registerUser,authUser, updateUser, allUsers}=require("../controllers/userControllers")

router.post("/register",registerUser)
router.post("/login",authUser)
router.post("/update",updateUser)
router.post("/searchusers",allUsers)


module.exports=router; 