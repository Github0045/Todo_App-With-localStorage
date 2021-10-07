// Quering The Dom
const form = document.querySelector('form');
const list = document.getElementById('todos');

// Adding The Todos
form.addEventListener('submit', e => {
    e.preventDefault();
    let val = form.input.value.trim();
    list.innerHTML += `<li>${val}</li>`;
    form.reset();
    todosData();
});

// Toggle The 'done' Class
list.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('done');
    };
    todosData();
});

// Delete The Todos
list.addEventListener('contextmenu', e => {
    e.preventDefault();
    if (e.target.tagName === 'LI') {
        e.target.remove();
    }
    todosData();
});

// Saving Todos To LocalStorage
function todosData() {
    let arr = [];
    [...list.children].forEach(child => {
        let obj = {
            task: child.textContent,
            complete: child.classList.contains('done')
        };
        arr.push(obj);
    });
    localStorage.setItem('todos', JSON.stringify(arr));
}
window.addEventListener('load', () => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(todo => {
        list.innerHTML += `
            <li class='${todo.complete ? 'done' : ''}'>${todo.task}</li>
        `;
    });
});