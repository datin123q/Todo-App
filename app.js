const input = document.getElementById("todo-input");
const timeInput = document.getElementById("todo-time");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let todos = [];
const API_URL = "https://todo-app-j20w.onrender.com/todoLists";


// async function fetchTodos() {
//   const res = await fetch(API_URL);
//   todos = await res.json();
//   renderTodos();
// }

// function renderTodos() {
//   todoList.innerHTML = "";
//   const now = new Date();

//   todos.forEach((todo) => {
//     const li = document.createElement("li");
//     const deadline = new Date(todo.deadline);
//     const deadlineText = deadline.toLocaleString();
//     const overdue = deadline < now && !todo.done;

//     li.className = overdue ? "overdue" : "";

//     li.innerHTML = `
//       <div>
//         <span style="text-decoration:${todo.done ? 'line-through' : 'none'}">
//           ${todo.text}
//         </span>
//         <small>🕒 ${deadlineText}</small>
//       </div>
//       <div>
//         <button onclick="toggleDone(${todo.id})">✔</button>
//         <button onclick="deleteTodo(${todo.id})">✖</button>
//       </div>
//     `;
//     todoList.appendChild(li);
//   });
// }

// // Thêm (POST)
// async function addTodo() {
//   const text = input.value.trim();
//   const deadline = timeInput.value;

//   if (text && deadline) {
//     const newTodo = { text, done: false, deadline };

//     const res = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newTodo)
//     });

//     const data = await res.json();
//     todos.push(data);

//     input.value = "";
//     timeInput.value = "";
//   }
// }

// // Xóa (DELETE)
// async function deleteTodo(id) {
//   await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//   todos = todos.filter(todo => todo.id !== id);
// }

// //làm xong(patch)
// async function toggleDone(id) {
//   const todo = todos.find(t => t.id === id);
//   const updated = { ...todo, done: !todo.done };

//   await fetch(`${API_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ done: updated.done })
//   });

//   todo.done = updated.done;

// }
axiosTodos();
async function axiosTodos(){
  var res = await axios.get(API_URL);
  todos = await res.data;
  renderTodos();
}
function renderTodos() {
  todoList.innerHTML = "";
  const now = new Date();

  todos.forEach((todo) => {
    const li = document.createElement("li");
    const deadline = new Date(todo.deadline);
    const deadlineText = deadline.toLocaleString();
    const overdue = deadline < now && !todo.done;

    li.className = overdue ? "overdue" : "";

    li.innerHTML = `
      <div>
        <span style="text-decoration:${todo.done ? 'line-through' : 'none'}">
          ${todo.text}
        </span>
        <small>🕒 ${deadlineText}</small>
      </div>
      <div>
        <button onclick="toggleDone(${todo.id})">✔</button>
        <button onclick="deleteTodo(${todo.id})">✖</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

async function addTodo() {
  const text = input.value.trim();
  const deadline = timeInput.value;

  if (text && deadline) {
    const newTodo = { text, done: false, deadline };

    try {
      const res = await axios.post(API_URL, {
        text: text,
        done: false,
        deadline: deadline
      });
    } catch (err) {
      console.error("POST error:", err.message);
    }
  }
}
async function deleteTodo(id){
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    console.log("DELETE status:", res.status); 
  } catch (err) {
    console.error("DELETE error:", err.message);
  }
}
async function toggleDone(id) {
  var todo = todos.find(t => t.id === id);
  var update = { ...todo, done: !todo.done};
  try {
    const res = await axios.patch(`${API_URL}/${id}`,{ done : update.done});

  }
  catch (err) {
    console.error("DELETE error:", err.message);
  }
}


addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});
timeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});
// fetchTodos();
