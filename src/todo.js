import _ from 'lodash';
import './styles.css'

const addList = document.getElementById('addList');
const addTodo = document.getElementById('addTodo');
const addTodoPopup = document.getElementById('addTodoPopup');
const todoWrapper = document.getElementById('todoWrapper');
const addPopupForm = document.getElementById('addPopupForm');
const addToDoFormButton = document.getElementById('addTodoFormButton')
const todoList = document.getElementById('todoList');

let selectedProject = 'home';

const todoLists = {
    home: [],
    work: []
};

class Todo {
    constructor(title, description, priority, dueDate, project) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.project = project;
    }
};


// Add new to-do

addTodo.addEventListener('click', (e) => {
    addTodoPopup.classList.remove('hidden');
    todoWrapper.classList.add('fade');
});

addToDoFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const dueDate = document.getElementById('date').value;
    const project = selectedProject;

    const newTodo = new Todo(title, description, priority, dueDate, project);

    const targetList = todoLists[selectedProject];
    targetList.push(newTodo);

    addPopupForm.reset();
    console.log(todoLists.home);

    addTodoPopup.classList.add('hidden');
    todoWrapper.classList.remove('fade');

    createTodos();
});


//Create To Do Elements

const createTodos = function () {
    const targetList = todoLists[selectedProject];

    todoList.innerHTML = '';

    targetList.forEach((todo) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        if (todo.priority === 'low') {
            todoDiv.classList.add('low-priority');
        } else if (todo.priority === 'medium') {
            todoDiv.classList.add('medium-priority');
        } else if (todo.priority === 'high') {
            todoDiv.classList.add('high-priority');
        }

        const titleElement = document.createElement('h3');
        titleElement.textContent = todo.title;
        todoDiv.appendChild(titleElement);

        const dateElement = document.createElement('p');
        dateElement.textContent = todo.dueDate;
        todoDiv.appendChild(dateElement);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        todoDiv.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    });
};





// Add new list