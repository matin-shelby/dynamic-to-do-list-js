document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // In-memory array mirroring Local Storage
  let tasks = [];

  // --- Helpers ---
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function clearList() {
    taskList.innerHTML = '';
  }

  // Create one <li> in the DOM (optionally save to storage)
  function addTask(taskText, save = true, index = tasks.length) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // Remove from DOM + array + Local Storage
    removeBtn.addEventListener('click', () => {
      // remove the specific item by index
      tasks.splice(index, 1);
      saveTasks();
      loadTasks(); // re-render so indices realign
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      tasks.push(taskText);
      saveTasks();
    }
  }

  // Load everything from Local Storage and render
  function loadTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    clearList();
    // render with correct indices so removal targets the right item
    tasks.forEach((text, i) => addTask(text, false, i));
  }

  // --- UI events ---
  addButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (!text) {
      alert('Please enter a task.');
      return;
    }
    addTask(text, true);
    taskInput.value = '';
  });

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addButton.click();
  });

  // Initialize
  loadTasks();
});
