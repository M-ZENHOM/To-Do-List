let input = document.querySelector("[type='text']");
let addBtn = document.querySelector(".add");
let listResult = document.querySelector(".list-result");

let listsArr = [];

getLocalData();

if (localStorage.getItem("tasks")) {
  listsArr = JSON.parse(localStorage.getItem("tasks"));
}

addBtn.addEventListener("click", function () {
  if (input.value != "") {
    addTask(input.value);
    input.value = "";
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && input.value != "") {
    addTask(input.value);
    input.value = "";
  }
});
listResult.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    removeLocal(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleTask(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function toggleTask(taskId) {
  for (let i = 0; i < listsArr.length; i++) {
    if (listsArr[i].id == taskId) {
      listsArr[i].completed == false
        ? (listsArr[i].completed = true)
        : (listsArr[i].completed = false);
    }
  }
  addToLocal(listsArr);
}

function removeLocal(taskId) {
  listsArr = listsArr.filter((task) => task.id != taskId);
  addToLocal(listsArr);
}

function addTask(taskText) {
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  listsArr.push(task);
  createTask(listsArr);
  addToLocal(listsArr);
}

function createTask(listsArr) {
  listResult.innerHTML = "";
  listsArr.forEach((task) => {
    let list = document.createElement("div");
    list.className = "task";
    if (task.completed === true) {
      list.className = "task done";
    }
    list.setAttribute("data-id", task.id);
    let delBtn = document.createElement("i");
    delBtn.className = "fa-solid fa-trash del";
    list.appendChild(document.createTextNode(task.title));
    list.appendChild(delBtn);
    listResult.appendChild(list);
  });
}

function addToLocal(listsArr) {
  localStorage.setItem("tasks", JSON.stringify(listsArr));
}

function getLocalData() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    createTask(tasks);
  }
}
