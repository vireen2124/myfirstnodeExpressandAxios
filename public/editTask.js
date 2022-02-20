const params=window.location.search
const message=document.querySelector(".message")
const url=new URLSearchParams(params).get("id")
const editText=document.querySelector(".edit-text")
const checkbox=document.getElementById("checkbox")
const taskDateTime=document.querySelector(".task-created-time")
const submit=document.querySelector(".submit")
// const getAllData=require("./mainPage.js")
const getSingleTask=async()=>{
    try {
        const {data}=await axios.get(`/api/v1/tasks/${url}`);
        const {taskName,completed,createdAt}=data.message
        editText.value=taskName;
        taskDateTime.textContent=createdAt
        if(completed===true){
            checkbox.checked=true
        }else{
            checkbox.checked=false
        }
       
    } catch (error) {
        message.textContent="something went wrong please try again"
    }
    

    
}
getSingleTask()
submit.addEventListener("click",async()=>{
    const editedTaskName=editText.value;
    const isChecked=checkbox.checked;
    if(editedTaskName&&editedTaskName.length<20){
        try {
            const {data}=await axios.patch(`/api/v1/tasks/${url}`,{
                name:editedTaskName,
                completed:isChecked
            }) 
            message.textContent="successfully updated task"
            getSingleTask();
            // getAllData()
        } catch (error) {
            return message.textContent="something went wrong!!! please try again"
        }
    }else{
        if(!editedTaskName){
            return message.textContent="please make sure that the input is filled before submitting"
        }
        return message.textContent="max length allowed is 20 letters"
        
    }
    

})