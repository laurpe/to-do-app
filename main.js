const listdata = [
    {
        id: 3719,
        title: "Feed goldfish",
        isImportant: false,
        dateAdded: "01/03/2022, 13:01:00",
        isCompleted: false,
    },
    {
        id: 1150,
        title: "Shop for groceries",
        isImportant: false,
        dateAdded: "27/02/2022, 08:20:11",
        isCompleted: true,
    },
    {
        id: 7858,
        title: "Return library books",
        isImportant: false,
        dateAdded: "02/03/2022, 14:04:45",
        isCompleted: false,
    },
    {
        id: 3950,
        title: "Go for a run",
        isImportant: true,
        dateAdded: "05/03/2022, 18:30:38",
        isCompleted: false,
    },
    {
        id: 9845,
        title: "Have existential crisis",
        isImportant: false,
        dateAdded: "03/03/2022, 03:03:03",
        isCompleted: false,
    },
];

class Task {
    constructor(title, isImportant, dateAdded) {
        this.id = Math.floor(Math.random() * 10000);
        this.title = title;
        this.isImportant = isImportant;
        this.dateAdded = dateAdded;
        this.isCompleted = false;
    }
}

const title = document.querySelector("#title");
const isImportant = document.querySelector("#isImportant");

const addTaskForm = document.querySelector("#add-task-form");
const taskList = document.querySelector("#task-list");

title.setAttribute("required", "");

const createList = (tasks) => {
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        taskList.insertAdjacentHTML(
            "beforeend",
            `
            <li>
                <div id=${tasks[i].id} class="task-element">
                    <div class="task-title">${tasks[i].title}${
                tasks[i].isImportant
                    ? `<span class="material-icons task-importance"
                    >star</span
                >`
                    : `<span class="material-icons task-importance"
                >star_outline</span
            >`
            }</div>
                    <div class="task-completed">${
                        tasks[i].isCompleted
                            ? `<span class="material-icons task-importance"
                            >check_box</span
                        >`
                            : `<span class="material-icons task-importance"
                        >check_box_outline_blank</span
                    >`
                    }</div>
                    <div class="task-date">${tasks[i].dateAdded}</div>
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

    const taskCompleted = document.querySelectorAll(".task-completed");

    taskCompleted.forEach((task) => {
        task.addEventListener("click", () => {
            markCompleted(task.parentNode.id);
        });
    });
};

//adding task

window.localStorage.setItem("tasks", JSON.stringify(listdata));
let tasks = JSON.parse(localStorage.getItem("tasks"));
//create list in the beginning
createList(tasks);

const addTask = (event) => {
    event.preventDefault();

    const task = new Task(
        title.value,
        isImportant.checked,
        new Date().toLocaleString()
    );

    tasks.push(task);
    window.localStorage.setItem("tasks", JSON.stringify(tasks));

    createList(tasks);

    event.target.reset();
};

const deleteTask = (taskId) => {
    tasks = tasks.filter((item) => {
        if (item.id !== Number(taskId)) {
            return item;
        }
    });

    window.localStorage.setItem("tasks", JSON.stringify(tasks));
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
const additionalFields = document.querySelector(".form-additional-fields");

expandBtn.addEventListener("click", () => {
    additionalFields.classList.toggle("hidden");

    if (expandIcon.textContent === "expand_less") {
        expandIcon.textContent = "expand_more";
    } else {
        expandIcon.textContent = "expand_less";
    }
});

// sort tasks by title (alphabetical)

const btnSortTitle = document.querySelector("#btn-sort-title");

const sortByTitle = () => {
    tasks.sort((a, b) => {
        return a.title > b.title ? 1 : -1;
    });
    createList(tasks);
};

btnSortTitle.addEventListener("click", sortByTitle);

// sort tasks by date dateAdded (ascending)

const btnSortDate = document.querySelector("#btn-sort-date");

const sortByDate = () => {
    tasks.sort((a, b) => {
        return a.dateAdded > b.dateAdded ? 1 : -1;
    });
    createList(tasks);
};

btnSortDate.addEventListener("click", sortByDate);

// set task complete

const markCompleted = (id) => {
    let index = tasks.findIndex((item) => item.id == id);

    tasks[index].isCompleted = !tasks[index].isCompleted;

    createList(tasks);
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
};
