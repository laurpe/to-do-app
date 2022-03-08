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
    //creates tasklist from tasks given to it
    //update input element to show its value depending on the task's completed value
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
        // let task = tasks.find((task) => task.id == input.id.substring(0, 4));
        // console.log(task);

        // console.log(input.value);
        // input.value = task.isCompleted;
        // console.log(index);
        // console.log(tasks);

        console.log(input.value);
        // input.value = tasks[index].isCompleted ? "checked" : null;

        input.addEventListener("change", () => {
            toggleComplete(input.id.substring(10));
            console.log(tasks[index]);
        });
    });

    // add event listener for delete button
    const removeButtons = document.querySelectorAll(".btn-remove-task");

    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            deleteTask(button.id.substring(7));
        });
    });
};

const getTasks = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks;
};

const setTasks = (tasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
};

//initialize tasks

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
    let tasks = JSON.parse(window.localStorage.getItem("tasks"));
    let index = tasks.findIndex((item) => item.id == id);

    console.log(id);
    console.log(tasks);
    console.log(index);

    tasks[index].isCompleted = !tasks[index].isCompleted;

    createList(tasks);
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
};
