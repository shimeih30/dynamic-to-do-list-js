document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when page loads
    loadTasks();

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task, false);
        });
    }

    // Function to add task to DOM
    function addTaskToDOM(taskText, saveToStorage = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        
        removeBtn.addEventListener('click', function() {
            li.remove();
            saveTasksToStorage();
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (saveToStorage) {
            saveTasksToStorage();
        }
    }

    // Function to save all tasks to localStorage
    function saveTasksToStorage() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            // Get only the task text (excluding the remove button text)
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to handle adding new task
    function handleAddTask() {
        const taskText = taskInput.value.trim();
        
        if (!taskText) {
            alert("Please enter a task!");
            return;
        }

        addTaskToDOM(taskText);
        taskInput.value = "";
    }

    // Event listeners
    addButton.addEventListener('click', handleAddTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    });
});
