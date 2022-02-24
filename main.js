class Task {
    constructor(title, description, isImportant) {
        this.title = title;
        this.description = description;
        this.isImportant = isImportant;
    }
}

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const isImportant = document.querySelector("#isImportant");

title.setAttribute("required", "");

const addTask = (event) => {
    event.preventDefault();

    const task = new Task(title.value, description.value, isImportant.checked);

    let tasks = [];

    tasks.push(task);

    createTable(tasks);

    event.target.reset();
};

const createTable = (tasks) => {
    const taskTable = document.querySelector("#task-table");
    const row = document.createElement("tr");
    const taskData = tasks
        .map((task) => {
            return `<td>${task.title}</td><td>${task.description}</td><td>${task.isImportant}</td>`;
        })
        .join("");

    row.innerHTML = taskData;
    taskTable.appendChild(row);
};

const addTaskForm = document.querySelector("#add-task-form");
addTaskForm.addEventListener("submit", addTask);
