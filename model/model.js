const mongoose =require("mongoose")
//creating a model for mongoDb
const todolists=new mongoose.Schema({
    taskName:{
        type:String,
        required:[true,"please fill up the form before submitting"],
        trim:true,
        maxlength:[20,"too long"]
    },
    completed:{
        type:Boolean,
        required:false,
        default:false,
    },
    createdAt:{
        required:false,
        type:Date,
        default:Date.now,
    }
})
module.exports=mongoose.model("todolists",todolists)