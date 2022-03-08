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
                        <input type="checkbox" id="importance-${
                            tasks[i].id
                        }" name="is-important" ${
                tasks[i].isImportant ? "checked" : ""
            }/>
                        <label for="importance-${
                            tasks[i].id
                        }" class="material-icons">
                        </label>
                    </div>
                    <div class="task-completed">
                        <input type="checkbox" id="completed-${
                            tasks[i].id
                        }" name="is-completed" ${
                tasks[i].isCompleted ? "checked" : ""
            }/>
                        <label for="completed-${
                            tasks[i].id
                        }" class="material-icons">                     
                        </label>
                    </div>
                    <div class="task-date">${tasks[i].dateAdded}</div>
                    <div class="remove-task">
                        <button class="btn-remove-task" id="remove-${
                            tasks[i].id
                        }">
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

    const completedInput = document.querySelectorAll(
        "input[name='is-completed']"
    );

    completedInput.forEach((input, index) => {
        input.addEventListener("change", () => {
            toggleComplete(input.id.substring(10));
        });
    });

    // add event listener for delete button
    const removeButtons = document.querySelectorAll(".btn-remove-task");

    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            deleteTask(button.id.substring(7));
        });
    });

    // add event listener for setting importance
    const importanceInput = document.querySelectorAll(
        "input[name='is-important"
    );

    importanceInput.forEach((input) => {
        input.addEventListener("change", () => {
            toggleImportance(input.id.substring(11));
        });
    });
};

// get tasks / add tasks to localStorage

const getTasks = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks;
};

const setTasks = (tasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
};

//initialize tasklist

const initializeTasklist = () => {
    let tasks = getTasks();

    if (tasks.length === 0) {
        setTasks(listdata);
    }
    tasks = getTasks();
    createList(tasks);
};

initializeTasklist();

const addTask = (event) => {
    event.preventDefault();

    const task = new Task(
        title.value,
        isImportant.checked,
        new Date().toLocaleString()
    );

    let tasks = getTasks();
    tasks.push(task);
    setTasks(tasks);

    createList(tasks);

    event.target.reset();
};

addTaskForm.addEventListener("submit", addTask);

// deleting a task

const deleteTask = (taskId) => {
    let tasks = getTasks();
    tasks = tasks.filter((item) => {
        if (item.id != taskId) {
            return item;
        }
    });

    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    createList(tasks);
};

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
    let tasks = getTasks();
    let index = tasks.findIndex((item) => item.id == id);

    tasks[index].isCompleted = !tasks[index].isCompleted;

    setTasks(tasks);
    createList(tasks);
};

// filter completed tasks

const btnShowCompleted = document.querySelector("#btn-show-completed");

const showCompleted = () => {
    let tasks = getTasks();
    let completed = tasks.filter((task) => {
        return task.isCompleted;
    });
    createList(completed);
};

btnShowCompleted.addEventListener("click", showCompleted);

// toggle importance

const toggleImportance = (id) => {
    let tasks = getTasks();
    let index = tasks.findIndex((item) => item.id == id);
    console.log(tasks[index].isImportant);

    tasks[index].isImportant = !tasks[index].isImportant;

    console.log(tasks[index].isImportant);

    setTasks(tasks);
    createList(tasks);
};

// filter important tasks

const btnShowImportant = document.querySelector("#btn-show-important");

const showImportant = () => {
    let tasks = getTasks();
    let important = tasks.filter((task) => {
        return task.isImportant;
    });
    createList(important);
};

btnShowImportant.addEventListener("click", showImportant);

// clear filters

const btnShowAll = document.querySelector("#btn-show-all");

const clearFilters = () => {
    let tasks = getTasks();
    createList(tasks);
};

btnShowAll.addEventListener("click", clearFilters);

//TODO
// how to show description in tasklist?
// how to show date in tasklist?
// clear completed?
//
// css
// how to show filter and sort buttons
