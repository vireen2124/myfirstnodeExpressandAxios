const express=require ("express");
//rather than stuffing everything in one single file in app.js, we use router to fix this 
//issue where we use the built in middleware in express
// and redirect anything to /api/v1/tasks to this object
//remember that when you use a router and in the router we must specify our router("/")
//and not  /api/v1/tasks
const taskRouter=express.Router();
const {createTasks,editTask,getAllTasks,getSingleTask,deleteTasks}=require("../functionality/callBacks")
//create the routes for tasks
// using controllers in functionality folder... it is better than stuffing all of the cB in this file
//just imporrt it and use it here
//notice here where i am importing my callbacks rather than jamming everything here
//it is easier to read and all of them have separate functionalities if there is a bug i 
//hope it wont spread like corona
//use postman to check if the routes and all is working before proceeding
//because browser only does default get request
//the model i created in models ... essentially without a model mongoDb wont
// have a data structure it will allow anything
taskRouter.route("/").get(getAllTasks).post(createTasks)
//using patch instead of put as it only modifies the particular changed data 
//put just overwrites the prious data with the new one
taskRouter.route("/:id").get(getSingleTask).patch(editTask).delete(deleteTasks)
module.exports=taskRouter