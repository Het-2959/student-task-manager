const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

function updateTaskSummary() {
  const allTasks = taskList.querySelectorAll(".task-item");
  const completedTasks = taskList.querySelectorAll(".task-item.completed");

  totalCount.textContent = allTasks.length;
  completedCount.textContent = completedTasks.length;
  pendingCount.textContent = allTasks.length - completedTasks.length;

  emptyMessage.classList.toggle("hidden", allTasks.length > 0);
}

function createTaskItem(taskName) {
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const taskContent = document.createElement("div");
  taskContent.className = "task-content";

  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.className = "task-checkbox";
  taskCheckbox.setAttribute("aria-label", "Mark task as completed");

  const taskNameText = document.createElement("span");
  taskNameText.className = "task-name";
  taskNameText.textContent = taskName;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";

  taskCheckbox.addEventListener("change", function () {
    taskItem.classList.toggle("completed", taskCheckbox.checked);
    updateTaskSummary();
  });

  deleteButton.addEventListener("click", function () {
    taskItem.remove();
    updateTaskSummary();
  });

  taskContent.appendChild(taskCheckbox);
  taskContent.appendChild(taskNameText);
  taskItem.appendChild(taskContent);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = taskInput.value.trim();

  if (taskName === "") {
    return;
  }

  const newTask = createTaskItem(taskName);
  taskList.appendChild(newTask);

  taskInput.value = "";
  taskInput.focus();
  updateTaskSummary();
});

updateTaskSummary();
