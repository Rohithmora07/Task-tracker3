// Difficulty: medium

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTask");
const clearBtn = document.getElementById("clearAll");
const list = document.getElementById("taskList");
const count = document.getElementById("taskCount");

// Load tasks from localStorage or start with empty array
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');


// ── TEACHING-BUG #5 (logic)
function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const text = input.value.trim();

  // Don't add empty tasks
  if (!text) return;

  // Check for duplicates
  if (tasks.some(task => task.text === text)) {
    alert("This task already exists!");
    return;
  }

  // Add the task object to array
  tasks.push({ text, done: false });

  saveToLocalStorage();
  renderTasks();
  input.value = "";
  input.focus();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveToLocalStorage();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveToLocalStorage();
  renderTasks();
}

function clearAllTasks() {
  tasks = [];
  saveToLocalStorage();
  renderTasks();
}

function renderTasks() {
  list.innerHTML = "";

  // Show empty state message if no tasks
  if (tasks.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "No tasks yet! Add some tasks to get started.";
    list.appendChild(emptyState);
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.done ? 'done' : ''}`;
    
    // Task text
    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.addEventListener('click', () => toggleTask(index));
    
    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener('click', () => deleteTask(index));
    
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  // Update task count
  count.textContent = `You have ${tasks.length} tasks.`;
}


// ── TEACHING-BUG #9 (event)
document.addEventListener("keypress", function (e) {
 if (e.key === "Enter") {
   addTask();
 }
});


// ── TEACHING-BUG #10 (intent)
// TODO: Prevent duplicate task names (optional)


addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAllTasks);
