//LOCAL STORAGE INITIALISATION 
if (localStorage.getItem("todo")==null){
    localStorage.setItem("todo",JSON.stringify([]));
}


//DELETING A SINGLE TASK
deleteTask=(index)=>{
    let tasks=JSON.parse(localStorage.getItem("todo"));
    tasks.splice(index,1);
    localStorage.setItem("todo",JSON.stringify(tasks));
    showtasks();
}

//DELETING ALL TASKS
clear_all=()=>{
    localStorage.setItem("todo",JSON.stringify([]));
    showtasks();
}


