document.addEventListener("DOMContentLoaded",()=>{
    const storedTask = JSON.parse(localStorage.getItem('TaskList'))

    if(storedTask){
        storedTask.forEach((Task)=>TaskList.push(Task));
        updateList();
        ProgressBar();
    }
})

let TaskList=[];
let Addbtn=document.querySelector('#Add');
let inputField=document.querySelector('#input');
let displayTask=document.querySelector('.task');
let Message=document.querySelector('#Motivate');


const Motivate =()=>{
    if(TaskList.length!=0){
        Message.innerHTML="Keep It Up!";
    }else{
        Message.innerHTML="";
    }
}

const saveTask = ()=>{
    localStorage.setItem("TaskList",JSON.stringify(TaskList));
}


const toggleTask=(index)=>{
    TaskList[index].completed=!TaskList[index].completed;
    console.log({TaskList})
    updateList();
    ProgressBar();
    saveTask();
}
const DeleteTask =(index)=>{
    TaskList.splice(index,1);
    inputField.value='';
    updateList();
    ProgressBar();
    saveTask();
    Motivate();
}
const editTask =(index) =>{
    inputField=document.querySelector('#input');
    inputField.value=TaskList[index].text;
    TaskList.splice(index,1);
    updateList();
    ProgressBar();
    saveTask();
}
const ProgressBar = ()=>{
    const completeTask=TaskList.filter(TaskList=> TaskList.completed).length;
    const totalTask=TaskList.length;
    const Progressbar=document.querySelector('.progress');
    const ProgressStat=(completeTask/totalTask)*100;
    Progressbar.style.width=`${ProgressStat}%`;
    const  CompleteTaskNumber=document.querySelector('#completed');
    const TotalTaskNumber=document.querySelector('#total');
    TotalTaskNumber.innerHTML=`${totalTask}`;
    CompleteTaskNumber.innerHTML=`${completeTask}`;
    if(TaskList.length == 0){
        Progressbar.style.width=`${0}`;
    }
    if(TaskList.length && completeTask === totalTask){
        Celebrate();
    
        
        
    }
    if(ProgressStat==100){
        Message.innerHTML="Congradulation's You completed Your Todays work";
       
    }else if( ProgressStat>60){
        Message.innerHTML="Go Ahead You are Almost There..";
        
    }else{
        Motivate();
    }
}
let updateList = ()=>{
   
    let Taskclass=document.querySelector('.task');
    Taskclass.innerHTML='';
    TaskList.forEach((task,index) =>{
        let TaskElement=document.createElement("li");
        TaskElement.innerHTML=`
        <div class="TaskItem">
            <div class="Task ${task.completed ? 'completed': ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked":""}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="Images/edit.png" onClick="editTask(${index});"/>
                <img src="Images/delete.png" onClick="DeleteTask(${index});"/>
            
            </div>
        </div>
        `;
        TaskElement.addEventListener('change',() => toggleTask(index))
        Taskclass.append(TaskElement);
    })
    
}

const addTask = () =>{
    if(inputField.value===''){
        inputField.placeholder='Please Enter Task'
        return
    }
    let text=inputField.value.trim();
    TaskList.push({text:text,completed:false});
    inputField.value='';
   updateList();
   ProgressBar();
   Motivate();
}
Addbtn.addEventListener('click',(e)=>{
   
    e.preventDefault();
    addTask();

})

const Celebrate = ()=>{
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
  };
  
  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"],
    });
  
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }
  
  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}