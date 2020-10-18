const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput= toDoForm.querySelector("input");
let toDo = [];
const wrapperToDo = document.querySelector(".js-toDoList");
const wrapperDone = document.querySelector(".js-doneList");
let done = [];

const TODO_LS = "TODO";
const DONE_LS = "DONE";

function moveToBridge(event){
    const btn = event.target;
    const li = btn.parentNode;
    const span = li.children[0];
    const text = span.innerText;
    const id = li.id;

    const FROM_TODO = id.includes(TODO_LS);

    if(FROM_TODO === true){
        paintDone(text);
    } else{
        paintToDo(text);
    }
}

function saveToDo(){
    localStorage.setItem(TODO_LS, JSON.stringify(toDo));
}

function saveDone(){
    localStorage.setItem(DONE_LS, JSON.stringify(done));
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    wrapperToDo.removeChild(li);
    const cleanedToDolist = toDo.filter(function(toDo){
        return toDo.id !== li.id;
    });

    toDo = cleanedToDolist;
    saveToDo();
}

function deleteDone(event){
    const btn = event.target;
    const li = btn.parentNode;
    wrapperDone.removeChild(li);
    const cleanedDoneList = done.filter(function(done){
        return done.id !== li.id;
    });
    done = cleanedDoneList;
    saveDone();
}

function paintDone(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "Effacer ❌";
    delBtn.addEventListener("click", deleteDone);
    const backBtn = document.createElement("button");
    backBtn.innerText = "Pas encore 🔙";
    backBtn.addEventListener("click", moveToBridge);
    backBtn.addEventListener("click", deleteDone);
    const span = document.createElement("span");
    span.innerText = text;

    const idNumber = done.length + 1;
    const newID = DONE_LS + idNumber;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    li.id = newID;

    wrapperDone.appendChild(li);

    const idObject = {
        text: text,
        id : newID
    };
    done.push(idObject);
    saveDone();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "Effacer ❌";
    delBtn.addEventListener("click", deleteToDo);
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "Fini ✔";
    doneBtn.addEventListener("click", moveToBridge);
    doneBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;

    const idNumber = toDo.length + 1;
    const newID = TODO_LS + idNumber;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.id = newID;

    wrapperToDo.appendChild(li);

    const idObject = {
        text: text,
        id : newID
    };
    toDo.push(idObject);
    saveToDo();
}

function handleSubmit(event){
    event.preventDefault();
    const actualValue = toDoInput.value;
    paintToDo(actualValue);
    toDoInput.value = "";
};

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODO_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (todos){
            paintToDo(todos.text);
        });
    }
}

function loadDones(){
    const laodedDones = localStorage.getItem(DONE_LS);
    if(laodedDones !== null){
        const parsedDones = JSON.parse(laodedDones);
        parsedDones.forEach(function (dones){
            paintDone(dones.text);
        })
    }
}

function init(){
    loadToDos();
    loadDones();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();