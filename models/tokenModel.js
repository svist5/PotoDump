const mongoose=require("mongoose");
const tokenSchema=mongoose.Schema({
    name:{default:"HareKrishna"},
    token:{type:String,default:"undefined"}

},{
timestamps:true,
}
)
const Token=mongoose.model("Token",postSchema);
module.exports=Token;