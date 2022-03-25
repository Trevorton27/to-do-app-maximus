const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

document.getElementById('form').addEventListener('submit', addTodo);

const submitButton = document.getElementById('submitButton');
//submitButton.addEventListener('click', addTodo);

function addTodo(e) {
  e.preventDefault();

  let text = document.getElementById('todo-input').value;

  if (text.length > 0) {
    const task = {
      text,
      checked: false,
      id: Date.now()
    };

    todoItems.push(task);
    saveTodoItems();
  }

  document.getElementById('form').reset();
  renderTask();
}

function renderTask() {
  const list = document.getElementById('todo-list');

  list.innerHTML = '';

  for (let i = 0; i < todoItems.length; i++) {
    let text = todoItems[i].text;

    const li = document.createElement('LI');
    li.className = 'todo-item';
    li.addEventListener('click', function (e) {
      toggleTask(todoItems[i].id);
    });
    li.id = todoItems[i].id;
    li.textContent = text;
    if (todoItems[i].checked === true) {
      li.style.textDecoration = 'line-through';
    }
    list.appendChild(li);

    const span = document.createElement('SPAN');
    span.className = 'delete-todo';

    li.appendChild(span);
    const deleteButton = document.createElement('BUTTON');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'X';
    span.appendChild(deleteButton);

    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(todoItems[i].id);
    });
  }
}

function saveTodoItems() {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function deleteTask(id) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == id && todoItems[i].checked === true) {
      todoItems.splice(i, 1);
    }
  }
  saveTodoItems();
  renderTask();
}

function toggleTask(id) {
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == id) {
      todoItems[i].checked = !todoItems[i].checked;
    }
  }
  renderTask();
}

renderTask();
