// greeting & todolist

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const full = document.querySelector("#full");

const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const HIDDEN_CLASSNAME = "hidden";
const BUTTONLEAVE_CLASSNAME = "ButtonLeave";
const USERNAME_KEY = "username";
const savedUsername = localStorage.getItem(USERNAME_KEY);

const TODOS_KEY = "todos";
let toDos = [];


function buttonEnterLeave(button) {
    // button leave class add & remove

    button.classList.add(BUTTONLEAVE_CLASSNAME);

    button.addEventListener('mouseenter', () => {
        button.classList.remove(BUTTONLEAVE_CLASSNAME);
    });
    button.addEventListener('mouseleave', () => {
        button.classList.add(BUTTONLEAVE_CLASSNAME);
    });
}


// greetings

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME_KEY, loginInput.value);
    paintGreetings();
}

function paintGreetings() {
    const username = localStorage.getItem(USERNAME_KEY);
    const hourNow = new Date().getHours();
    let greetingNow;

    if (5 <= hourNow && hourNow < 12) {
        greetingNow = "님, 좋은 아침이에요.";
    } else if (12 <= hourNow && hourNow < 17) {
        greetingNow = "님, 좋은 하루 되세요!";
    } else if (17 <= hourNow && hourNow < 22) {
        greetingNow = "님, 오늘 하루 어땠나요?";
    } else {
        greetingNow = "님, 편안한 밤 보내세요.";
    }

    greeting.innerText = username + greetingNow;

    greeting.classList.remove(HIDDEN_CLASSNAME);
    toDoForm.classList.remove(HIDDEN_CLASSNAME);
    toDoList.classList.remove(HIDDEN_CLASSNAME);

    // reset button
    const resetButton = document.createElement("button");
    resetButton.id = "reset-button"
    resetButton.innerText = "Reset";

    resetButton.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
    buttonEnterLeave(resetButton);



    full.appendChild(resetButton);
}


// todolist

const CHECKEDTODO_CLASSNAME = "checkedToDo";

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id != parseInt(li.id));
    saveToDos();
}

function checkToDo(event) {
    const checkedToDo = event.target.previousElementSibling;

    if (!checkedToDo.classList.contains(CHECKEDTODO_CLASSNAME)) {
        checkedToDo.classList.add(CHECKEDTODO_CLASSNAME);
        event.target.src = "icons/button_icons/free-icon-check-button-5974759.png";
    } else {
        checkedToDo.classList.remove(CHECKEDTODO_CLASSNAME);
        event.target.src = "icons/button_icons/free-icon-check-button-5974903.png";
    }
}


function paintToDo(newTodoObj) {
    const li = document.createElement("li");
    const span = document.createElement("span");

    span.innerText = newTodoObj.text;
    li.id = newTodoObj.id;

    const checkButton = document.createElement("img");
    checkButton.classList.add("checkButton");
    checkButton.src = "icons/button_icons/free-icon-check-button-5974903.png";
    checkButton.addEventListener("click", checkToDo);
    buttonEnterLeave(checkButton);

    const deleteButton = document.createElement("img");
    deleteButton.classList.add("deleteButton");
    deleteButton.src = "icons/button_icons/free-icon-delete-button-5974916.png"
    deleteButton.addEventListener("click", deleteToDo);
    buttonEnterLeave(deleteButton);

    li.appendChild(span);
    li.appendChild(checkButton)
    li.appendChild(deleteButton);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {  //save inputted ToDo & initialize input area
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = { text: newTodo, id: Date.now(), };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}


// execution from now

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
//todos saved in localStorage; string form

if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}


if (savedUsername == null) {
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    // show the greeting
    paintGreetings();
}
