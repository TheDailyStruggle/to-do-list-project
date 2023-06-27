import _ from 'lodash';
import './styles.css';

const addList = document.getElementById('addList');
const addTodo = document.getElementById('addTodo');
const addTodoPopup = document.getElementById('addTodoPopup');
const addListPopup = document.getElementById('addListPopup');
const todoWrapper = document.getElementById('todoWrapper');
const addPopupForm = document.getElementById('addPopupForm');
const addListForm = document.getElementById('addListForm');
const addToDoFormButton = document.getElementById('addTodoFormButton');
const todoList = document.getElementById('todoList');
const projectsList = document.querySelector('.projects');
const homeList = document.getElementById('homeList');
const currentList = document.getElementById('currentList');

let selectedProject = 'home';

const todoLists = {
    home: [{
        description: "test dd",
        dueDate: "2023-07-08",
        priority: "high",
        project: "home",
        title: "test tt",
    },
    ],
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

    createAndAppendTodos(selectedProject);
});


// Add new list

addList.addEventListener('click', (e) => {
    addListPopup.classList.remove('hidden');
    todoWrapper.classList.add('fade');
});

const createList = function (listName) {
    todoLists[listName] = [];
    console.log(todoLists);
};

const appendLists = function () {
    for (const listName in todoLists) {
        if (listName !== 'home') {
            const listItem = document.createElement('li');
            listItem.textContent = listName;
            listItem.classList.add('project');
            const lowerCase = listName.toLocaleLowerCase();
            listItem.setAttribute('id', `${lowerCase}`)
            projectsList.appendChild(listItem);

            listItem.addEventListener('click', (e) => {
                const clickedListName = listItem.getAttribute('id');
                selectedProject = clickedListName;
                createAndAppendTodos(selectedProject);
                currentList.textContent = selectedProject;
            });
        }
    }
};

appendLists();

addListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = listName.value

    createList(title);

    projectsList.innerHTML = "";
    appendLists();

    addListForm.reset();

    addListPopup.classList.add('hidden');
    todoWrapper.classList.remove('fade');
});


//Append To-Dos from a list to the todoList div

// Delete a To-do

function deleteTodo(e) {
    console.log('deleteTodo is running');
    const todoDiv = e.target.parentElement;
    const index = parseInt(todoDiv.id.split('-')[1]);
    const targetList = todoLists[selectedProject];
    targetList.splice(index, 1);
    todoDiv.remove();
};


const createAndAppendTodos = function (listName) {
    const projects = todoLists[listName];

    todoList.innerHTML = "";

    projects.forEach((todo, index) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.id = `todo-${index}`;

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

        deleteButton.addEventListener('click', deleteTodo);

        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);
    });
};




// Home Select

homeList.addEventListener('click', (e) => {
    selectedProject = 'home';
    createAndAppendTodos(selectedProject);
    currentList.textContent = selectedProject;
});

//Load home todos on load

window.addEventListener('DOMContentLoaded', (e) => {
    createAndAppendTodos(selectedProject);
})