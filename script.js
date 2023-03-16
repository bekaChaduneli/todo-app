"use strict";
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");
const background = document.querySelector(".background");
const inputConteiner = document.querySelector(".input-conteiner");
const round = document.querySelector(".round");
const newItemInput = document.querySelector(".new-todo-input");
const addTodoButton = document.querySelector(".add-todo");
const todoConteiner = document.querySelector(".todo-conteiner");
const todos = document.querySelector(".todo-conteiner ul");
const lastBox = document.querySelector(".last-box");
const itemsLeft = document.querySelector(".items-left");
const s = document.querySelector(".list-item");
const lastButtonsDesktop = document.querySelector(".last-buttons-desktop");
const lastButtonsMobile = document.querySelector(".last-buttons-mobile");
const filterButtons = document.querySelectorAll(".filter-btns");
const all = document.querySelector(".all");
const live = document.querySelector(".live");
const completed = document.querySelector(".completed-btn");
const clearComplited = document.querySelector(".clear-complited");
const li = document.querySelectorAll(".li-box");
const liId = document.querySelector("#li-box");
const checkbox = document.querySelector(".checkbox");
const remove = document.querySelectorAll(".remove");
const taskButton = document.querySelector(".task");
let count = 5;
moon.addEventListener("click", () => {
    moon.style.display = "none";
    sun.style.display = "block";
    li.forEach(lis => {
        lis.classList.add("li-box-dark");
    })
    lastBox.classList.add("last-box-dark");
    todoConteiner.classList.add("todo-conteiner-dark");
    document.body.style.backgroundColor = "#171823";
    background.classList.add("background-dark");
    newItemInput.classList.add("new-todo-input-dark");
    inputConteiner.style.backgroundColor = "#25273D";
    addTodoButton.classList.add("add-todo-dark");
    round.classList.add("round-dark");
    checkbox.classList.add("checkbox-dark");
    remove.classList.add("remove-dark");
    taskButton.classList.add("task-dark");
    taskButton.classList.remove("task");
    clearComplited.classList.add("clear-complited-dark");
    clearComplited.classList.remove("clear-complited");
    itemsLeft.classList.add("items-left-dark");
    itemsLeft.classList.remove("items-left");
});

sun.addEventListener("click", () => {
    moon.style.display  = "block";
    sun.style.display = "none";
    li.forEach(lis => {
        lis.classList.remove("li-box-dark");
    })
    lastBox.classList.remove("last-box-dark");
    todoConteiner.classList.remove("todo-conteiner-dark");
    document.body.style.backgroundColor = "#e6eaec";
    newItemInput.classList.remove("new-todo-input-dark");
    background.classList.remove("background-dark");
    inputConteiner.style.backgroundColor = "#fff";
    addTodoButton.classList.remove("add-todo-dark");
    round.classList.remove("round-dark");
    checkbox.classList.remove("checkbox-dark");
    remove.classList.remove("remove-dark");
    taskButton.classList.remove("task-dark");
    taskButton.classList.add("task");
    itemsLeft.classList.remove("items-left-dark");
    clearComplited.classList.remove("clear-complited-dark");
    clearComplited.classList.add("clear-complited");
    itemsLeft.classList.add("items-left");
});

newItemInput.addEventListener("keypress", (event) => {
    if(event.charCode === 13 && newItemInput.value.length > 0){
        createNewTodoItem(newItemInput.value);
        newItemInput.value = '';
    }
})

// function for remove todo element
function removeTodoItem(elem) {
    elem.remove();
}

// remove todo element
document.querySelectorAll(".remove").forEach(item => {
    item.addEventListener("click", (event) => {
        removeTodoItem(event.target.parentNode.parentNode);
    })
})

function createNewTodoItem(text) {
    event.preventDefault();
    // create todo element
    const elem = document.createElement("li");
    elem.classList.add("li-box");
    elem.innerHTML = `  
    <label class = "list-item">
        <input type = "checkbox" name = "checkbox" class = "checkbox" >
        <span class = "task" checked>${text}</span>
    </label>
    <span class = "remove"><img class = "cross" src = "images/icon-cross.svg"></span>`;
    
    count = count + 1;
    todos.prepend(elem);
    updateItemsCount(count);
    // remove todo element
document.querySelectorAll(".remove").forEach(item => {
    item.addEventListener("click", (event) => {
        removeTodoItem(event.target.parentNode.parentNode);
    })
})
}


// update items counter text element
function updateItemsCount(number) {
    itemsLeft.innerText = number + " items left";
}


// clear completed items
clearComplited.addEventListener("click", () => {
    document.querySelectorAll('.list-item input').forEach(item => {
        if(item.checked == true) {
            item.closest('li').remove();
        }
    })
})

// completed button Shows only checked todos
completed.addEventListener("click", () => {
    all.classList.remove("active");
    live.classList.remove("active");
    completed.classList.add("active");
    document.querySelectorAll('.list-item input').forEach(item => {
        if(item.checked == false) {
            item.closest('li').classList.add("hide");
        }
        if(item.checked == true) {
            item.closest('li').classList.remove("hide");
        }
    });
});

// live button Shows only unchecked todos
live.addEventListener("click", () => {
    all.classList.remove("active");
    live.classList.add("active");
    completed.classList.remove("active");
    document.querySelectorAll('.list-item input').forEach(item => {
        if(item.checked == false) {
            item.closest('li').classList.remove("hide");
        }
        if(item.checked == true) {
            item.closest('li').classList.add("hide");
        }
    });
});



// all button Shows all todos
all.addEventListener("click", () => {
    all.classList.add("active");
    live.classList.remove("active");
    completed.classList.remove("active");
    document.querySelectorAll('.list-item input').forEach(item => {
        if(item.checked == false) {
            item.closest('li').classList.remove("hide");
        }
        if(item.checked == true) {
            item.closest('li').classList.remove("hide");
        }
    });
})

