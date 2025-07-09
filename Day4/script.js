let todos = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, Bread, Eggs, Vegetables",
    dueDate: "2024-07-05",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Complete homework",
    description: "Math and Science assignments",
    dueDate: "2024-06-29",
    priority: "Medium",
    completed: true,
  },
];

const todoList = document.querySelector("#todoList");
const saveTaskBtn = document.querySelector("#saveTask");

let editId = null;

// Render function
function renderTodos(todosToRender) {
  todoList.innerHTML = "";

  if (todosToRender.length === 0) {
    todoList.innerHTML = "<i>No todos found.</i>";
    return;
  }

  todosToRender.map((todo) => {
    const div = document.createElement("div");
    div.className = "todo-item";

    const priorityClass = todo.priority.toLowerCase();

    div.innerHTML = `
      <h4>
        ${todo.title} 
        ${todo.completed ? "<span class='completed'>(Completed)</span>" : ""}
        <span class="badge ${priorityClass}">${todo.priority}</span>
      </h4>
      <p>${todo.description}</p>
      <div class="todo-footer">
        <span><strong>Due:</strong> ${todo.dueDate}</span>
        <div>
          <button onclick="editTask(${todo.id})">Edit</button>
          <button onclick="deleteTask(${todo.id})">Delete</button>
        </div>
      </div>
    `;
    todoList.appendChild(div);
  });
}

// Save button click (Add or Edit)
saveTaskBtn.addEventListener("click", () => {
  const title = document.querySelector("#taskTitle").value;
  const description = document.querySelector("#taskDescription").value;
  const dueDate = document.querySelector("#taskDueDate").value;
  const priority = document.querySelector("#taskPriority").value;
  const completed = document.querySelector("#taskCompleted").checked;

  if (!title || !description || !dueDate) {
    alert("Please fill all fields.");
    return;
  }

  if (editId) {
    // Edit existing task
    todos = todos.map((todo) =>
      todo.id === editId
        ? { ...todo, title, description, dueDate, priority, completed }
        : todo
    );
    editId = null;
  } else {
    // Add new task
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      completed,
    };
    todos.push(newTask);
  }

  clearForm();
  renderTodos(todos);
});

// Edit function
function editTask(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    document.querySelector("#taskTitle").value = todo.title;
    document.querySelector("#taskDescription").value = todo.description;
    document.querySelector("#taskDueDate").value = todo.dueDate;
    document.querySelector("#taskPriority").value = todo.priority;
    document.querySelector("#taskCompleted").checked = todo.completed;
    editId = id;
  }
}

// Delete function
function deleteTask(id) {
  todos = todos.filter((t) => t.id !== id);
  renderTodos(todos);
}

document.querySelector("#showAll").addEventListener("click", () => {
  renderTodos(todos);
});

document.querySelector("#showPending").addEventListener("click", () => {
  const pending = todos.filter((t) => !t.completed);
  renderTodos(pending);
});

document.querySelector("#showCompleted").addEventListener("click", () => {
  const completed = todos.filter((t) => t.completed);
  renderTodos(completed);
});

// Clear form inputs
function clearForm() {
  document.querySelector("#taskTitle").value = "";
  document.querySelector("#taskDescription").value = "";
  document.querySelector("#taskDueDate").value = "";
  document.querySelector("#taskPriority").value = "High";
  document.querySelector("#taskCompleted").checked = false;
}

renderTodos(todos);
