const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

//window.addEventListener("load", pullFromLocal);
document.getElementById("js-form").addEventListener('submit', addTodo);

function addTodo(e) {
    e.preventDefault();

    let text = document.getElementById('js-todo-input').value;

    if(text.length > 0) {
        const task = {
            text,
            checked: false,
            id: todoItems.length > 0 ? todoItems[todoItems.length - 1].id + 1 : 1
        };

        todoItems.push(task);
        localStorage.setItem('todoItems', JSON.stringify(todoItems));

        console.log('The task is: ', task);
        console.log('todoItems: ', todoItems);
    }

    document.getElementById("js-form").reset();
    renderTask();

};


function renderTask() {
    //pullFromLocal();
    const list = document.getElementById("js-todo-list");

    list.innerHTML = '';

    for(let i =0; i < todoItems.length; i++){
        let text = todoItems[i].text;
        list.innerHTML += `
        <li class="todo-item" 
            onclick="toggleTask(${todoItems[i].id})"
            id="${todoItems[i].id}" >
            ${todoItems[i].checked ? text.strike() : text}
                <button class="delete-todo js-delete-todo"
                    onclick="deleteTask(${todoItems[i].id})">
                    <svg><use href="#delete-icon"></use></svg>
                <button>
        </li>`
    }
};

function deleteTask(id) {
    for(let i = 0; i < todoItems.length; i++) {
        if(todoItems[i].id == id) {
            todoItems.splice(i, 1);
        }
    }
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    renderTask();
};

function toggleTask(id) {
    for(let i = 0; i < todoItems.length; i++){
        if(todoItems[i].id == id) {
            todoItems[i].checked = !todoItems[i].checked;
        } 
    }
    renderTask();
};

renderTask();