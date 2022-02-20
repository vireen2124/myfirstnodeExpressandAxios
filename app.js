const express=require("express");
const app=express();
// when you are using router create the router then import it and use it in the main/app.js
// as the middleware
const taskRoute=require("./routes/manageTasks.js");
//see the db folder mongoose.connect returns a promise so i used async to connect to the db
//and also that my server will only run if the db is up and running line13
const connectToDb=require("./db/connectDb");
require("dotenv").config();
//middlewares
app.use(express.json());
app.use(express.static("./public"));
app.use("/api/v1/tasks",taskRoute);
//starting the db and server cb
const connectToServerDb=async ()=>{
    try{
         await connectToDb(process.env.MONGO_URL)
        app.listen(process.env.PORT,()=>{
            console.log("server started port 3000")
        })
    }catch(e){
        console.log(e)
    }
}
//start db and server
connectToServerDb()
//make sure to include dotenv and nodemodules in .gitignore :)
