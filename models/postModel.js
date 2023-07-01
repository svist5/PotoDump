const mongoose=require("mongoose");
const postSchema=mongoose.Schema({
    pic:[{type:String,required:"true"}],
    caption:{type:String},
    date:{type:String}

},{
timestamps:true,
}
)
const Post=mongoose.model("Post",postSchema);
module.exports=Post;