class Task {
    constructor(title, isImportant, dateAdded) {
        this.id = Math.floor(Math.random() * 10000);
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

//adding task

let tasks = [];

const addTask = (event) => {
    event.preventDefault();

    const task = new Task(
        title.value,
        isImportant.checked,
        new Date().toLocaleString()
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
                <div id=${tasks[i].id} class="task-element">
                    <div class="task-title">${tasks[i].title}</div>
                    <div class="task-importance">${tasks[i].isImportant}</div>
                    <div class="task-importance">${tasks[i].dateAdded}</div>
                    <div class="remove-task">
                        <button class="btn-remove-task"><span class="material-icons remove-icon">
                        clear
                        </span></button>
                    </div>
                </div>
            </li>
        `
        );
    }
};

const deleteTask = (taskId) => {
    tasks = tasks.filter((item) => {
        if (item.id !== Number(taskId)) {
            return item;
        }
    });
    createList(tasks);
};

addTaskForm.addEventListener("submit", addTask);

//deleting task

document.addEventListener("click", (event) => {
    if (event.target.matches(".btn-remove-task")) {
        deleteTask(event.target.parentNode.parentNode.id);
        event.target.parentNode.parentNode.parentNode.remove();
    } else if (event.target.matches(".remove-icon")) {
        deleteTask(event.target.parentNode.parentNode.parentNode.id);
        event.target.parentNode.parentNode.parentNode.parentNode.remove();
    }
});

// star checkbox
const starbox = document.querySelector("#starbox");

isImportant.addEventListener("change", function () {
    if (this.checked) {
        starbox.textContent = "star";
    } else {
        starbox.textContent = "star_outline";
    }
});

// show/hide extra add task fields

const expandBtn = document.querySelector("#btn-expand-fields");
const expandIcon = document.querySelector("#expand-icon");
const additionalFields = document.querySelector(".task-additional-fields");

expandBtn.addEventListener("click", () => {
    additionalFields.classList.toggle("hidden");

    if (expandIcon.textContent === "expand_less") {
        expandIcon.textContent = "expand_more";
    } else {
        expandIcon.textContent = "expand_less";
    }
});
