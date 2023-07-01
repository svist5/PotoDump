const mongoose=require("mongoose");
const tokenSchema=mongoose.Schema({
    name:{type:String,default:"HareKrishna"},
    token:{type:String,default:"undefined"}

},{
timestamps:true,
}
)
const Token=mongoose.model("Token",tokenSchema);
module.exports=Token;