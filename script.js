"use strict";
const widget = document.getElementById("auth-widget");
const helloUser = document.querySelector(".last-text")
let username;
let userId;

function showLoggedIn(username) {
    widget.innerHTML = `
        <button class="log-button" id="logout">Logout</button>
      `;

    helloUser.innerHTML = `Hello, ${username}`
    document
        .getElementById("logout")
        .addEventListener("click", function () {
            localStorage.removeItem("token");
            window.location.href = "login.html";
        });
}

if (localStorage.getItem("token")) {
    fetch("http://localhost:8000/users/me/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            showLoggedIn(data.username);
            username = data.username;
            userId = data.id;
        })
        .catch((error) => {
            console.error("Error", error);
            window.location.href = "login.html";
        });
} else {
    window.location.href = "login.html";
}


const addTaskForm = document.getElementById("add-task-form");
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
const BASE_URL = "http://localhost:8000/tasks/";
const filterButtons = document.querySelectorAll(".filter-btns");
const all = document.querySelector(".all");
const live = document.querySelector(".live");
const completed = document.querySelector(".completed-btn");
const clearComplited = document.querySelector(".clear-complited");
const li = document.querySelectorAll(".li-box");
const taskslist = document.getElementById("taskslist");
const liId = document.querySelector("#li-box");
let editing = false;
const checkbox = document.querySelector(".checkbox");
const remove = document.querySelectorAll(".remove");
const countTasks = document.getElementById("tasks-variable");
const taskButton = document.querySelector(".task");

async function fetchTasks(filter) {
    try {
        const response = await fetch(filter.length > 0 ? BASE_URL + filter : BASE_URL, {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            },
        });
        const data = await response.json();
        const tasks = data.results;
        let tasksListRenderString = "";
        for (let task of tasks) {
            tasksListRenderString += renderTaskTemplete(task);
        }
        taskslist.innerHTML = tasksListRenderString;
        countTasks.innerHTML = tasks.length;
    } catch (error) {
        console.error("Error", error);
        throw new Error(error);
    }
}

fetchTasks("");

moon.addEventListener("click", () => {
    moon.style.display = "none";
    sun.style.display = "block";
    document.querySelectorAll(".li-box").forEach(lis => {
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
    moon.style.display = "block";
    sun.style.display = "none";
    document.querySelectorAll(".li-box").forEach(lis => {
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

async function createTask(task) {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error("Error creating task");
        }

        const json = await response.json();
        fetchTasks("");
        return json;
    } catch (error) {
        console.error("Error", error);
        throw new Error(error);
    }
}

async function deleteTask(task_id) {
    try {
        await fetch(`${BASE_URL}${task_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            },
        });
        countTasks.innerHTML = countTasks.value - 1;
        return true;
    } catch (error) {
        console.error("Error", error);
        throw new Error(error);
    }
}

async function fetchTask(task_id) {
    try {
        const response = await fetch(`${BASE_URL}${task_id}/`, {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error", error);
        throw new Error(error);
    }
}

async function updateTask(task_id, task) {
    try {
        const response = await fetch(`${BASE_URL}${task_id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(task),
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error", error);
        throw new Error(error);
    }
}


function renderTaskTemplete(task) {
    return `
    <li class="li-box" data-task-id=${task.id}>
     <label class = "list-item">
         <input data-action="completed" type = "checkbox" name = "checkbox" class = "checkbox" ${task.completed && "checked"} >
         <span class = "task" checked>${task.title}</span>
         <button class="edit" data-action="update"> ✏️ </button>
     </label>
     <span data-action="delete" class = "remove"><img data-action="delete" class = "cross" src = "../images/icon-cross.svg"></span>
    </li>
    `;
}

newItemInput.addEventListener("keypress", (event) => {
    if (event.charCode === 13 && newItemInput.value.length > 0) {
        console.log(editing);
        if (!editing) {
            const task = {
                title: newItemInput.value,
                user: userId,
            }
            createTask(task);
            newItemInput.value = '';
        } else {
            updating();
        }
    }
})



inputConteiner.addEventListener("submit", (e) => {
    e.preventDefault();
});

async function updating() {
    const formData = new FormData(addTaskForm);
    console.log(newItemInput.value);
    const task = {
        title: newItemInput.value,
        user: userId,
    };
    const task_id = formData.get("task-id");
    await updateTask(task_id, task);
    fetchTasks("");
    addTaskForm.reset();
    addTaskForm.classList.remove("editing-task");
    editing = false;
}

async function deleteAllCompletedTasks() {
    try {
        await fetch(`${BASE_URL}delete-completed/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            },
        });
        fetchTasks("");
    } catch (error) {
        console.error("Error", error);
        throw new Error(error);
    }
}

taskslist.addEventListener("click", async (e) => {
    const action = e.target.getAttribute("data-action");
    if (action == "completed") {
        const checkbox = e.target;
        checkbox.disabled = true;

        try {
            const li = e.target.parentNode.parentNode;
            const task_id = li.getAttribute("data-task-id");
            const task = await fetchTask(task_id);
            await updateTask(task_id, { ...task, completed: !task.completed });
            fetchTasks("");
        } catch (error) {
            console.error("Error", error);
        } finally {
            checkbox.disabled = false;
        }
    }
    if (action == "delete") {
        const li = e.target.parentNode.parentNode;
        const task_id = li.getAttribute("data-task-id");
        await deleteTask(task_id);
        fetchTasks("");
    } else if (action == "update") {
        editing = true;
        const li = e.target.parentNode.parentNode;
        const task_id = li.getAttribute("data-task-id");
        const task = await fetchTask(task_id);

        const titleInputElement = document.querySelector(".new-todo-input");
        const taskIdInputElement = document.getElementById("task-id");
        taskIdInputElement.value = task.id;
        titleInputElement.value = task.title;
        addTaskForm.classList.add("editing-task");
    }
});

completed.addEventListener("click", () => {
    all.classList.remove("active");
    live.classList.remove("active");
    completed.classList.add("active");
    fetchTasks("?completed=true");
});

live.addEventListener("click", () => {
    all.classList.remove("active");
    live.classList.add("active");
    completed.classList.remove("active");
    fetchTasks("?completed=false");
});

all.addEventListener("click", () => {
    all.classList.add("active");
    live.classList.remove("active");
    completed.classList.remove("active");
    fetchTasks("");
})
