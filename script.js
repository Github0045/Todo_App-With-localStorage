// Quering The Don
const form = document.querySelector('.add-todos');
const list = document.querySelector('.todos-box');
const message = document.querySelector('.message');
const todosCount = document.querySelector('.todos-count span');
const completedTodos = document.querySelector('.completed-todos span');
const deleteAll = document.querySelector('.del-all');
const markAll = document.querySelector('.mark-all');

// Adding Todos
form.addEventListener('submit', e => {
    // Preventing The Defualt Action
    e.preventDefault();
    
    // Creating The Elements
    let val = form.input.value;
    if (val) {
        // Check Before Calling The "addTodos()" Function
        checkExist(val);

        // Hide The Message
        message.classList.add('hide');

        // Clear The Input Feild
        form.reset();
    } else {
        swal('There Is No Value')
    }

    // Calling Functions
    counters();
    todosLocalStorage();
});

// Adding Todos (Main Function)
function addTodos(text, completed) {
    // Creating The ELements
    let task = document.createElement('span');
    let delBtn = document.createElement('span');

    // Adding The Classes
    let doneVal = completed ? 'task done' : 'task';
    task.classList = doneVal;
    delBtn.classList.add('del');

    // Appending Children
    delBtn.append('Delete');
    task.append(text, delBtn);
    list.appendChild(task);

}

// Check Existance Before Adding Todos
function checkExist(text) {
    if (list.innerHTML.includes(` ${text} `)) {
        swal('Write Another Task');
    } else {
        // Calling The "addTodos()" Function
        addTodos(` ${text} `, false);
    }
}

// Deleteing The Todos
list.addEventListener('click', e => {
    // Check If Element Contains "del" Class
    if (e.target.classList.contains('del')) {
        e.target.parentElement.remove();
    }
    if (list.childElementCount === 1) {
        message.classList.remove('hide');
    }
    // Calling Functions
    counters();
    todosLocalStorage();
});

// Mark Todos
list.addEventListener('click', e => {
    // Check If Element Contains "task" Class
    if (e.target.classList.contains('task')) {
        e.target.classList.toggle('done');
    }
    // Calling Functions
    counters();
    todosLocalStorage();
});

// Counters
function counters() {
    // Getting The Nums
    const todosNum = list.querySelectorAll('.task').length;
    const completedTodosNum = list.querySelectorAll('.task.done').length;

    // Appending The Nums To The Dom
    todosCount.textContent = todosNum;
    completedTodos.textContent = completedTodosNum;
}
counters();

// Delete All Todos
deleteAll.addEventListener('click', () => {
    list.querySelectorAll('.task').forEach(task => {
        task.remove()
    });
    message.classList.remove('hide');
    counters();
    todosLocalStorage();
});

// Mark All Todos
markAll.addEventListener('click', () => {
    list.querySelectorAll('.task').forEach(task => {
        task.classList.toggle('done');
    });
    counters();
    todosLocalStorage();
});

// localStorage
function todosLocalStorage() {
    // Data Array Of Objects
    let arr = [];
    list.querySelectorAll('.task').forEach(child => {
        // Data Object
        let obj = {
            todo: child.textContent.substr(0, child.textContent.length - 6),
            completed: child.classList.contains('done')
        };
        // Adding The Objects To The Array
        arr.push(obj);
    });
    // Adding The Data Array To The localStorage
    localStorage.setItem('todos', JSON.stringify(arr));
}

// Getting The Data From The LocalStorage
window.addEventListener('load', () => {
    // localStorage Varible
    let storage = localStorage.getItem('todos');
    // Check localStorage Before Getting The Data
    if (storage) {
        JSON.parse(storage).forEach(todo => {
            // Calling The Add Todos Function
            addTodos(todo.todo, todo.completed);
            // Calling The Counter Function
            counters();
            // Hide The Message
            message.classList.add('hide');
        });
    }
});