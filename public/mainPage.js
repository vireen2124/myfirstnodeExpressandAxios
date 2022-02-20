const newTask=document.getElementById("new-task");
const submit=document.querySelector("button");
const wrapper=document.querySelector("section");
const error =document.getElementById("error");
async function getAllData(){
    try {
        const {data}= await axios.get("/api/v1/tasks")
        const {task,status}=data.message;
        if(!task){
            return error.textContent="you dont have any tasks yet"
        }
        return renderDom(task)     
    } catch (error) {
        return sendError()
    }
}
getAllData()
const deleteItems=async(id)=>{
    try {
        const {data}=await axios.delete(`/api/v1/tasks/${id}`);
        const {status}=data;
        if(status===404){
            return alert("invalid task id")
        }
        return getAllData()
    } catch (error) {
        return sendError()
    }
}
const renderDom=(taskItems)=>{
    wrapper.innerHTML="";
    wrapper.innerHTML=taskItems.map(list=>{
        if(list.completed){
            return `
            <article>
                <span class="line-through">${list.taskName}</span>
                <div>
                    <ion-icon name="trash-outline" class="trash" onclick="deleteItems('${list._id}')"></ion-icon>
                    <a href="edit-task.html?id=${list._id}"><ion-icon name="create-outline" class="edit"></ion-icon></a>
                </div>
            </article>
            `
        }
        return `
        <article>
            <span>${list.taskName}</span>
            <div>
                <ion-icon name="trash-outline" class="trash" onclick="deleteItems('${list._id}')"></ion-icon>
                <a href="edit-task.html?id=${list._id}"><ion-icon name="create-outline" class="edit"></ion-icon></a>
            </div>
        </article>
        `
    })
}
const editTask=()=>{

}
const addTaskItems=async()=>{
    const letters=newTask.value
    if(letters===""){
        return sendError("please complete the task before submitting")
    }
    if(letters.length>20){
        return sendError("max length 20 words")
    }else{
        try {
        
            const {data}=await axios.post("/api/v1/tasks",{
                name:letters,
            })
            return getAllData()
        } catch (error) {
            return sendError()
        }

    }
    

}
const sendError=(message)=>{
    error.style.display="block";
    error.textContent=message
    setTimeout(()=>{
        error.style.display="none"
    },2000)
}

submit.addEventListener("click",()=>{
    return addTaskItems()
})
