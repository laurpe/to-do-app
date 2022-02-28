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

    createList(tasks);

    event.target.reset();
};

const taskTable = document.querySelector("#task-table");

const createList = (tasks) => {
    const taskList = document.querySelector("#task-list");

    for (let i = 0; i < tasks.length; i++) {
        taskList.insertAdjacentHTML(
            "beforeend",
            `
            <li>
                <div class="task-element">
                    <div class="task-name">${tasks[i].title}</div>
                    <div class="task-description">${tasks[i].description}</div>
                    <div class="task-importance">${tasks[i].isImportant}</div>
                </div>
            </li>
        `
        );

        // const taskElement = document.createElement("div");
        // taskElement.classList.add("task-element");
        // const taskName = document.createElement("div");
        // taskName.classList.add("task-name");
        // const taskDescription = document.createElement("div");
        // taskDescription.classList.add("task-description");
        // const taskImportance = document.createElement("div");
        // taskImportance.classList.add("task-importance");

        // taskElement.appendChild(taskName);
        // taskElement.appendChild(taskDescription);
        // taskElement.appendChild(taskImportance);

        // taskName.innerText = tasks[i].title;
        // taskDescription.innerText = tasks[i].description;
        // taskImportance.innerText = tasks[i].isImportant;

        // const li = document.createElement("li");
        // li.appendChild(taskElement);

        // taskList.appendChild(li);
    }

    console.log(taskList);
};

const addTaskForm = document.querySelector("#add-task-form");
addTaskForm.addEventListener("submit", addTask);
