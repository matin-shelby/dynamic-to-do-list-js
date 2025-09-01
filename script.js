document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // 1. Load tasks from localStorage or default to empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // 2. Render existing tasks on page load
    tasks.forEach(taskText => renderTask(taskText));

    // 3. Add task on button click
    addButton.addEventListener('click', addTask);

    // 4. Add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Add to DOM
        renderTask(taskText);

        // Add to tasks array
        tasks.push(taskText);

        // Save updated array to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Clear input
        taskInput.value = "";
    }

    function renderTask(taskText) {
        const task = document.createElement('li');
        task.textContent = taskText;

        // Create Remove button
        const removeTask = document.createElement('button');
        removeTask.textContent = "Remove";
        removeTask.classList.add("remove-btn");

        // Remove logic
        removeTask.addEventListener('click', () => {
            taskList.removeChild(task);

            // Remove from tasks array
            tasks = tasks.filter(t => t !== taskText);

            // Update localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        task.appendChild(removeTask);
        taskList.appendChild(task);
    }
});

