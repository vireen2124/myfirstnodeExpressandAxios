//import the model
const todolists=require("../model/model.js")
//make sure to return everytime you use a conditional statement
//it is better to just return eveytime you respond to the front end
//not returning can cause bugs and also cause the server to crash
const getAllTasks=async (req,res)=>{
    const task=await todolists.find({});
    return res.status(200).json({status:200,success:true,message:{task}})
}
const createTasks=async(req,res)=>{
    try {
        const {name}=req.body;
        const task =await todolists.create({taskName:name})
        return res.status(200).json({status:200,success:true,message:{task}})       
    } catch (error) {
        return res.status(500).json({status:500,success:false,message:{error}})
    }
}
const deleteTasks=async (req,res)=>{
    try {
        const {id:taskId}=req.params
        const task=await todolists.findOneAndDelete({_id:taskId})
        if(!task){
            return res.status(404).json({success:false,status:404,message:{task}})
        }
        return res.status(200).json({success:true,status:200,message:{task}})
    } catch (error) {
        return res.status(500).json({success:false,status:500,message:{error}})
    }
   
}
const editTask=async (req,res)=>{
    try {
        const {id:taskId}=req.params
        const {completed,name:taskName,createdAt}=req.body
        const task=await todolists.findByIdAndUpdate({_id:taskId},{completed,taskName,createdAt},{
            new:true,
            runValidators:true
        })
        if(!task){
            return res.status(404).json({status:404,success:false,message:{task}})
        }
        return res.status(200).json({status:200,success:true,message:{task}})
    } catch (error) {
        return res.status(500).json({status:500,success:false,message:{error}})
    }   
}
const getSingleTask=async(req,res)=>{
    try {
        const {id:taskId}=req.params;
        const task=await todolists.findOne({_id:taskId})
        if(!task){
            return res.status(404).json({status:404,success:false,message:{task}})
        }
        return res.status(200).json({status:200,success:true,message:task})  
    } catch (error) {
        return res.status(500).json({success:false,status:500,message:error})
    }

}
module.exports={
    createTasks,editTask,deleteTasks,getAllTasks,getSingleTask
}