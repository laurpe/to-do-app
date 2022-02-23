class Task {
    constructor(title, description, isImportant) {
        this.title = title;
        this.description = description;
        this.isImportant = isImportant;
    }
}

const addTask = (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const isImportant = document.querySelector("#isImportant").checked;

    const task = new Task(title, description, isImportant);

    console.log(task);

    let tasks = [];

    tasks.push(task);

    console.log(tasks);

    const taskTable = document.querySelector("#task-table");
    const row = document.createElement("tr");
    const taskData = tasks
        .map((task) => {
            return `<td>${task.title}</td><td>${task.description}</td><td>${task.isImportant}</td>`;
        })
        .join("");

    console.log(taskTable);
    console.log(taskData);

    row.innerHTML = taskData;
    taskTable.appendChild(row);
};

const addTaskForm = document.querySelector("#add-task-form");
addTaskForm.addEventListener("submit", addTask);
