let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let count = document.getElementById("count")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
 
});
let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
    
};


let data = [{}];

let acceptData = () => {
  data.push({
    
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();

};

let createTasks = () => {
  tasks.innerHTML = "";
  data.forEach((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
         <p><span class="small text-secondary">${x.date}</span></p> 
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
       
    `);
  
  });
cekTask();
  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};
function editTask(e) {
 let selectedTask = e.parentElement.parentElement;
 data.filter(function (data) {
   console.log(data.date)
    if (data.date == selectedTask.children[1].innerHTML ) {
      return true;
    }
  });
  
  textInput.value = selectedTask.children[0].innerHTML;
   
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
 

  deleteTask(e);
  };

//     let selectedTask = e.parentElement.parentElement;
  
//   // console.log('filter');
//   console.log(data);
//   console.log(selectedTask.children[0].innerHTML);
//   textInput.value = selectedTask.children[0].innerHTML;
//   dateInput.value = data[0].date;
//   // dateInput.value = moment(selectedTask.children[1].innerHTML).format('DD/MM/YYYY'); 
//   textarea.value = selectedTask.children[2].innerHTML;
//   console.log(data);
// // data = JSON.parse(localStorage.getItem("data"))
// //   deleteTask(e);


let cekTask = () => {
 count.innerHTML = tasks.innerHTML == "" ? "data belum ada": ""
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
 
})();

 



