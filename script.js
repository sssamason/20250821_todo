document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.textContent = taskText;
  li.onclick = () => {
    li.classList.toggle("done");
    saveTasks();
  };

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✖";
  removeBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(removeBtn);
  taskList.appendChild(li);
  taskInput.value = "";

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  saved.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");
    li.onclick = () => {
      li.classList.toggle("done");
      saveTasks();
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    };

    li.appendChild(removeBtn);
    document.getElementById("taskList").appendChild(li);
  });
}
