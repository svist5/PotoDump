const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    followers:[{type:String}],
    following:[{type:String}],
    dp:{type:String,default:"https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"},
    cover_photo:{type:String,default:""},
    token:{type:String,default:""},
    // posts:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Post"
    // }],
    posts:[{
        pic:{type:String,required:true},
        caption:{type:String,default:"No caption needed!"},
        comments:[{comment:String, likes:Number}]
        
    }],
},
{
    timestamps: true,
}
)
userSchema.pre("save",async function(next){
    if(!this.isModified){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
const User=mongoose.model("User",userSchema);
module.exports=User;