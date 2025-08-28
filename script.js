document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', () => {
        if (event.key === 'Enter')
            addTask();
    })

    // add task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "")
        alert("Pls Enter a Task.");
    else {
        const task = document.createElement('li');
        task.textContent = taskText;

        // remove task logic
        const removeTask = document.createElement('button');
        removeTask.textContent = "Remove";
        removeTask.classList.add("remove-btn");
        removeTask.addEventListener('click', () => {
            taskList.removeChild(task);
        })
        task.appendChild(removeTask);
        taskList.appendChild(task);
        taskInput.value = "";
    }
}
})

document.addEventListener('DOMContentLoaded', addTask);

