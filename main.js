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
        isImportant: true,
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
            <li title="${tasks[i].dateAdded}">
                <div id=${tasks[i].id} class="task-element">
                    <div class="task-title">
                        <div class="checkbox-completed">
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
                        <div class="checkbox-importance">
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
                            ${tasks[i].title}
                    </div>
                    <div class="remove-task">
                        <button class="btn-remove-task material-icons" id="remove-${
                            tasks[i].id
                        }">
                                clear
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
        "input[name='is-important']"
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

    if (!tasks || tasks.length === 0) {
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

// sort tasks by title

const btnSortTitleAsc = document.querySelector("#btn-sort-title-asc");
const btnSortTitleDesc = document.querySelector("#btn-sort-title-desc");

const sortByTitle = (direction) => {
    let tasks = getTasks();
    if (direction === "asc") {
        tasks.sort((a, b) => {
            return a.title > b.title ? 1 : -1;
        });
        createList(tasks);
    }
    if (direction === "desc") {
        tasks.sort((a, b) => {
            return a.title < b.title ? 1 : -1;
        });
        createList(tasks);
    }
};

btnSortTitleAsc.addEventListener("click", () => {
    sortByTitle("asc");
});

btnSortTitleDesc.addEventListener("click", () => {
    sortByTitle("desc");
});

// sort tasks by date

const btnSortDateAsc = document.querySelector("#btn-sort-date-asc");
const btnSortDateDesc = document.querySelector("#btn-sort-date-desc");

const sortByDate = (direction) => {
    let tasks = getTasks();
    if (direction === "asc") {
        tasks.sort((a, b) => {
            return a.dateAdded > b.dateAdded ? 1 : -1;
        });
        createList(tasks);
    }
    if (direction === "desc") {
        tasks.sort((a, b) => {
            return a.dateAdded < b.dateAdded ? 1 : -1;
        });
        createList(tasks);
    }
};

btnSortDateAsc.addEventListener("click", () => {
    sortByDate("asc");
});

btnSortDateDesc.addEventListener("click", () => {
    sortByDate("desc");
});

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

// show/hide sort and filter menus

const sortMenu = document.querySelector(".sort-menu");
const sortBtn = document.querySelector("#btn-sort-menu");

sortBtn.addEventListener("click", () => {
    sortMenu.classList.toggle("hidden");
});

const filterMenu = document.querySelector(".filter-menu");
const filterBtn = document.querySelector("#btn-filter-menu");

filterBtn.addEventListener("click", () => {
    filterMenu.classList.toggle("hidden");
});

// star checkbox

const starbox = document.querySelector("#starbox");

isImportant.addEventListener("change", function () {
    if (this.checked) {
        console.log("Checkbox is checked..");
        starbox.textContent = "star";
    } else {
        console.log("Checkbox is not checked..");
        starbox.textContent = "star_outline";
    }
});
