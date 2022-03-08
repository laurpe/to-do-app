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
                    <div class="task-title">${tasks[i].title}
                    <label for="is-important">
                        <span class="material-icons">
                            star_outline
                        </span>
                    </label>
                    <input type="checkbox" id="is-important" name="is-important" />
                    </div>
                    <div class="task-completed">
                        <label for="${tasks[i].id}-completed">
                            <span class="material-icons">
                                check_box_outline_blank
                            </span>                       
                        </label>
                        <input type="checkbox" id="${tasks[i].id}-completed" name="is-completed" />
                    </div>
                    <div class="task-date">${tasks[i].dateAdded}</div>
                    <div class="remove-task">
                        <button class="btn-remove-task" id="${tasks[i].id}-remove">
                            <span class="material-icons remove-icon">
                                clear
                            </span>
                        </button>
                    </div>
                </div>
            </li>
            `
        );
    }

    // add event listener for completed checkbox

    const taskCompleted = document.querySelectorAll(
        "input[name='is-completed']"
    );

    taskCompleted.forEach((task, index) => {
        task.addEventListener("change", () => {
            toggleComplete(task.id.substring(0, 4));
        });
    });

    // add event listener for delete button
    const removeButtons = document.querySelectorAll(".btn-remove-task");

    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            deleteTask(button.id.substring(0, 4));
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

// deleting a task

const deleteTask = (taskId) => {
    tasks = tasks.filter((item) => {
        if (item.id != taskId) {
            return item;
        }
    });

    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    createList(tasks);
};

addTaskForm.addEventListener("submit", addTask);

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

// toggle complete

const toggleComplete = (id) => {
    let index = tasks.findIndex((item) => item.id == id);

    tasks[index].isCompleted = !tasks[index].isCompleted;

    window.localStorage.setItem("tasks", JSON.stringify(tasks));

    createList(tasks);
};
