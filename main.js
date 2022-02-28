class Task {
    constructor(title, isImportant, dateAdded) {
        this.title = title;
        this.isImportant = isImportant;
        this.dateAdded = dateAdded;
    }
}

const title = document.querySelector("#title");
const isImportant = document.querySelector("#isImportant");

const addTaskForm = document.querySelector("#add-task-form");
const taskList = document.querySelector("#task-list");

title.setAttribute("required", "");

let tasks = [];

const addTask = (event) => {
    event.preventDefault();

    const task = new Task(
        title.value,
        isImportant.checked,
        new Date().toDateString()
    );

    tasks.push(task);

    createList(tasks);

    event.target.reset();
};

const createList = (tasks) => {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        taskList.insertAdjacentHTML(
            "beforeend",
            `
            <li>
                <div class="task-element">
                    <div class="task-name">${tasks[i].title}</div>
                    <div class="task-importance">${tasks[i].isImportant}</div>
                    <div class="task-importance">${tasks[i].dateAdded}</div>
                    <div class="remove-task">
                        <button class="btn-remove-task">remove</button>
                    </div>
                </div>
            </li>
        `
        );
    }
};

const deleteTask = (taskTitle) => {
    tasks = tasks.filter((item) => {
        if (item.title !== taskTitle) {
            return item;
        }
    });
    console.log(tasks);

    createList(tasks);
};

addTaskForm.addEventListener("submit", addTask);

document.addEventListener("click", (event) => {
    if (event.target.matches(".btn-remove-task")) {
        console.log("clicked remove button");
        deleteTask(
            event.target.parentNode.parentNode.firstElementChild.textContent
        );
        event.target.parentNode.parentNode.parentNode.remove();
    }
});
