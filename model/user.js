const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,default:null},
    email:{type:String,required:true,default:null},
    password:{type:String,required:true,default:null},
    phone:{type:String,required:true,default:null},
    height:{type:Number,required:true,default:null},
    weight:{type:Number,required:true,default:null},
    age:{type:Number,required:true,default:null},
    coins:{type:Number,required:true,default:null},
    gender:{type:String,required:true,default:null}

});
 
module.exports= mongoose.model("users",userSchema);