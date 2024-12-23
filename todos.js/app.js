let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  const todoList = document.getElementById('todoList');
  const progressBar = document.getElementById('progressBar').firstElementChild;
  const stats = document.getElementById('stats');

  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleCompletion(index);

    const text = document.createElement('span');
    text.textContent = todo.text;
    if (todo.completed) {
      text.style.textDecoration = 'line-through';
    }

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTodo(index);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTodo(index);

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
  });

  updateProgress();
}

function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const newTodo = todoInput.value.trim();

  if (newTodo) {
    todos.push({ text: newTodo, completed: false });
    todoInput.value = '';
    saveTodos();
    renderTodos();
  }
}

function editTodo(index) {
  const newTodo = prompt('Edit your todo:', todos[index].text);

  if (newTodo !== null && newTodo.trim()) {
    todos[index].text = newTodo.trim();
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function toggleCompletion(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function updateProgress() {
  const completed = todos.filter(todo => todo.completed).length;
  const total = todos.length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  const progressBar = document.getElementById('progressBar').firstElementChild;
  progressBar.style.width = `${progress}%`;

  const stats = document.getElementById('stats');
  stats.textContent = `Completed: ${completed} / Total: ${total}`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('addButton').onclick = addTodo;
  renderTodos();
});
