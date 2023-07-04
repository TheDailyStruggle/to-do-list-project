import _ from 'lodash';
import './styles.css';


let selectedProject = 'home';

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
const detailsPopup = document.getElementById('detailsPopup');
const closeDetails = document.getElementById('closeDetails');
const todoDetails = document.getElementById('todoDetails');
const closeAddList = document.getElementById('closeAddList');
const closeAddTodo = document.getElementById('closeAddTodo');
const editPopup = document.getElementById('editPopup');
const closeEdit = document.getElementById('closeEdit');
const todoEdit = document.getElementById('todoEdit');
const overlay = document.getElementById('overlay');

const todoLists = {
    home: [{
        description: "test dd",
        dueDate: "2023-07-08",
        priority: "high",
        project: "home",
        title: "test tt",
        complete: true,
    },
    ],
};

class Todo {
    constructor(title, description, priority, dueDate, project, complete = false) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.project = project;
        this.complete = complete
    }
};


// Add new to-do

addTodo.addEventListener('click', (e) => {
    if (!detailsPopup.classList.contains('hidden') ||
        !addListPopup.classList.contains('hidden') ||
        !addTodoPopup.classList.contains('hidden') ||
        !editPopup.classList.contains('hidden')) {

    } else {
        addTodoPopup.classList.remove('hidden');
        overlay.classList.add('fade');
    }
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

    addTodoPopup.classList.add('hidden');
    overlay.classList.remove('fade');

    createAndAppendTodos(selectedProject);
});


// Add new list

addList.addEventListener('click', (e) => {
    if (!detailsPopup.classList.contains('hidden') ||
        !addListPopup.classList.contains('hidden') ||
        !addTodoPopup.classList.contains('hidden') ||
        !editPopup.classList.contains('hidden')) {

    } else {
        addListPopup.classList.remove('hidden');
        overlay.classList.add('fade');
    }
});

const createList = function (listName) {
    todoLists[listName] = [];
};

const appendLists = function () {
    for (const listName in todoLists) {
        if (listName !== 'home') {
            const listItem = document.createElement('li');
            listItem.textContent = listName;
            listItem.classList.add('project');
            listItem.setAttribute('id', listName)
            projectsList.appendChild(listItem);

            listItem.addEventListener('click', (e) => {
                if (!detailsPopup.classList.contains('hidden') ||
                    !addListPopup.classList.contains('hidden') ||
                    !addTodoPopup.classList.contains('hidden') ||
                    !editPopup.classList.contains('hidden')) {
                    return
                }
                const clickedListName = listItem.getAttribute('id');
                selectedProject = clickedListName;
                setTimeout(() => {
                    createAndAppendTodos(selectedProject);
                    currentList.textContent = selectedProject;
                }, 0);
            });
        }
    }
};

appendLists();

addListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('listName').value;

    createList(title);

    projectsList.innerHTML = "";
    appendLists();

    addListForm.reset();

    addListPopup.classList.add('hidden');
    overlay.classList.remove('fade');
});



//Append To-Dos from a list to the todoList div

// Delete a To-do

function deleteTodo(e) {
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
            todoDiv.classList.add('lowPriority');
        } else if (todo.priority === 'high') {
            todoDiv.classList.add('highPriority');
        } else {
            todoDiv.classList.add('mediumPriority');
        }

        const todoLeft = document.createElement('div');
        todoLeft.classList.add('todoLeft');


        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('todoCheckbox');
        todoLeft.appendChild(checkbox);

        checkbox.addEventListener('change', function () {
            const todoDiv = this.closest('.todo');
            const title = this.nextElementSibling;
            const index = parseInt(todoDiv.id.split('-')[1]);
            const targetList = todoLists[selectedProject];
            const todo = targetList[index];

            todo.complete = true;

            title.classList.toggle('completed');
            todoDiv.classList.toggle('completed');
        });

        const titleElement = document.createElement('h3');
        titleElement.textContent = todo.title;
        todoLeft.appendChild(titleElement);

        todoDiv.appendChild(todoLeft);

        const dateElement = document.createElement('p');
        dateElement.textContent = todo.dueDate;
        todoDiv.appendChild(dateElement);

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Details';
        detailsButton.classList.add('details-button');
        todoDiv.appendChild(detailsButton);

        detailsButton.addEventListener('click', viewDetails);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        todoDiv.appendChild(editButton);

        editButton.addEventListener('click', editTodo);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', (e) => {
            if (!detailsPopup.classList.contains('hidden') ||
                !addListPopup.classList.contains('hidden') ||
                !addTodoPopup.classList.contains('hidden') ||
                !editPopup.classList.contains('hidden')) {
            } else {
                deleteTodo(e);
            }
        });

        if (todo.complete === true) {
            titleElement.classList.add('completed');
            todoDiv.classList.add('completed');
            checkbox.checked = true;
        }

        todoDiv.appendChild(deleteButton);
        todoList.appendChild(todoDiv);



    });
};


// Home Select

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

homeList.addEventListener('click', (e) => {
    if (!detailsPopup.classList.contains('hidden') ||
        !addListPopup.classList.contains('hidden') ||
        !addTodoPopup.classList.contains('hidden') ||
        !editPopup.classList.contains('hidden')) {
        return
    } else {
        selectedProject = 'home';
        createAndAppendTodos(selectedProject);
        const lowercaseHome = selectedProject;
        const uppercaseHome = capitalizeFirstLetter(lowercaseHome);
        currentList.textContent = uppercaseHome;
    }
});

//Load home todos on load

window.addEventListener('DOMContentLoaded', (e) => {
    createAndAppendTodos(selectedProject);
})

//View todo details

const viewDetails = function (e) {
    if (!detailsPopup.classList.contains('hidden') ||
        !addListPopup.classList.contains('hidden') ||
        !addTodoPopup.classList.contains('hidden') ||
        !editPopup.classList.contains('hidden')) {
        return;
    }

    detailsPopup.classList.remove('hidden');
    overlay.classList.add('fade');

    const todoDiv = e.target.parentElement;
    const index = parseInt(todoDiv.id.split('-')[1]);

    const { title, description, priority, dueDate } = todoLists[selectedProject][index];

    const titleHeader = document.createElement('h2');
    titleHeader.classList.add('detailsTitle');
    titleHeader.textContent = `Title: ${title}`;

    const dateP = document.createElement('p');
    dateP.classList.add('detailsDate');
    dateP.textContent = `Date: ${dueDate}`;

    const descriptionP = document.createElement('p');
    descriptionP.classList.add('detailsDescription');
    descriptionP.textContent = `Description: ${description}`;

    const priorityP = document.createElement('p');
    priorityP.classList.add('detailsPriority');
    priorityP.textContent = `Priority: ${priority}`;

    todoDetails.appendChild(titleHeader);
    todoDetails.appendChild(dateP);
    todoDetails.appendChild(descriptionP);
    todoDetails.appendChild(priorityP);
};

//Edit a To-do

function editTodo(e) {
    if (!detailsPopup.classList.contains('hidden') ||
        !addListPopup.classList.contains('hidden') ||
        !addTodoPopup.classList.contains('hidden') ||
        !editPopup.classList.contains('hidden')) {
        return;
    }
    editPopup.classList.remove('hidden');
    todoEdit.classList.add('displayFlex');
    overlay.classList.add('fade');

    const todoDiv = e.target.parentElement;
    const index = parseInt(todoDiv.id.split('-')[1]);

    const { title, description, priority, dueDate } = todoLists[selectedProject][index];

    const editTitleLabel = document.createElement('label');
    editTitleLabel.setAttribute('for', 'editTitleInput');
    editTitleLabel.textContent = 'Title: ';

    const editTitleInput = document.createElement('input');
    editTitleInput.setAttribute('id', 'editTitleInput');
    editTitleInput.classList.add('inputBox');
    editTitleInput.value = title;

    const editDescriptionLabel = document.createElement('label');
    editDescriptionLabel.setAttribute('for', 'editDescriptionInput');
    editDescriptionLabel.textContent = 'Description: ';

    const editDescriptionInput = document.createElement('input');
    editDescriptionInput.setAttribute('type', 'textarea');
    editDescriptionInput.setAttribute('id', 'editDescriptionInput');
    editDescriptionInput.classList.add('inputBox');
    editDescriptionInput.value = description;

    const editPriorityFieldset = document.createElement('fieldset');
    editPriorityFieldset.setAttribute('id', 'editPriorityFieldset');
    editPriorityFieldset.classList.add('todoRadioButtons');

    const editLegend = document.createElement('legend');
    editLegend.textContent = 'Priority: ';

    const radioInputLow = document.createElement('input');
    radioInputLow.setAttribute('type', 'radio');
    radioInputLow.setAttribute('id', 'editLow');
    radioInputLow.setAttribute('value', 'low');
    radioInputLow.setAttribute('name', 'priority');
    if (priority.trim().toLowerCase() === 'low') {
        radioInputLow.checked = true;
    }

    const labelLow = document.createElement('label');
    labelLow.setAttribute('for', 'editLow');
    labelLow.textContent = 'Low';

    const radioInputStandard = document.createElement('input');
    radioInputStandard.setAttribute('type', 'radio');
    radioInputStandard.setAttribute('id', 'editStandard');
    radioInputStandard.setAttribute('value', 'standard');
    radioInputStandard.setAttribute('name', 'priority');
    if (priority === 'standard') {
        radioInputStandard.checked = true;
    }

    const labelStandard = document.createElement('label');
    labelStandard.setAttribute('for', 'editStandard');
    labelStandard.textContent = 'Standard';

    const radioInputHigh = document.createElement('input');
    radioInputHigh.setAttribute('type', 'radio');
    radioInputHigh.setAttribute('id', 'editHigh');
    radioInputHigh.setAttribute('value', 'high');
    radioInputHigh.setAttribute('name', 'priority');
    if (priority === 'high') {
        radioInputHigh.checked = true;
    }

    const labelHigh = document.createElement('label');
    labelHigh.setAttribute('for', 'editHigh');
    labelHigh.textContent = 'High';

    editPriorityFieldset.appendChild(editLegend);
    editPriorityFieldset.appendChild(radioInputLow);
    editPriorityFieldset.appendChild(labelLow);
    editPriorityFieldset.appendChild(radioInputStandard);
    editPriorityFieldset.appendChild(labelStandard);
    editPriorityFieldset.appendChild(radioInputHigh);
    editPriorityFieldset.appendChild(labelHigh);

    const editDateLabel = document.createElement('label');
    editDateLabel.setAttribute('for', 'editDateInput');
    editDateLabel.textContent = "Date: ";

    const editDateInput = document.createElement('input');
    editDateInput.setAttribute('id', 'editDateInput');
    editDateInput.setAttribute('type', 'date');
    editDateInput.classList.add('inputBox');
    editDateInput.value = dueDate;

    const submitEdit = document.createElement('button')
    submitEdit.setAttribute('id', 'submitEdit');
    submitEdit.textContent = "Save";
    todoEdit.addEventListener('submit', (e) => {
        e.preventDefault();

        let editedPriority = "";

        const editedTitle = editTitleInput.value;
        const editedDescription = editDescriptionInput.value;
        if (radioInputLow.checked) {
            editedPriority = 'low';
        } else if (radioInputStandard.checked) {
            editedPriority = 'standard';
        } else if (radioInputHigh.checked) {
            editedPriority = 'high';
        };
        const editedDueDate = editDateInput.value;

        const targetList = todoLists[selectedProject];
        const editedTodo = targetList[index];
        editedTodo.title = editedTitle;
        editedTodo.description = editedDescription;
        editedTodo.priority = editedPriority;
        editedTodo.dueDate = editedDueDate;
        editedTodo.complete = checkbox.checked;


        createAndAppendTodos(selectedProject);

        editPopup.classList.add('hidden');
        todoEdit.classList.remove('displayFlex');
        overlay.classList.remove('fade');
        todoEdit.innerHTML = "";

        todoEdit.reset();

    });


    todoEdit.appendChild(editTitleLabel);
    todoEdit.appendChild(editTitleInput);
    todoEdit.appendChild(editDescriptionLabel);
    todoEdit.appendChild(editDescriptionInput);
    todoEdit.appendChild(editLegend);
    todoEdit.appendChild(editPriorityFieldset);
    todoEdit.appendChild(editDateLabel);
    todoEdit.appendChild(editDateInput);
    todoEdit.appendChild(submitEdit)
};


// Close details with a click

closeDetails.addEventListener('click', (e) => {
    if (!detailsPopup.classList.contains('hidden')) {
        detailsPopup.classList.add('hidden');
        overlay.classList.remove('fade');
        todoDetails.innerHTML = "";
    }
});

// Close add list

closeAddList.addEventListener('click', (e) => {
    if (!addListPopup.classList.contains('hidden')) {
        addListPopup.classList.add('hidden');
        overlay.classList.remove('fade');

        addListForm.reset();
    }
});

// Close add todo

closeAddTodo.addEventListener('click', (e) => {
    if (!addTodoPopup.classList.contains('hidden')) {
        addTodoPopup.classList.add('hidden');
        overlay.classList.remove('fade');

        addPopupForm.reset();
    }
});

// Close add edit

closeEdit.addEventListener('click', (e) => {
    if (!editPopup.classList.contains('hidden')) {
        editPopup.classList.add('hidden');
        todoEdit.classList.remove('displayFlex');
        overlay.classList.remove('fade');


        todoEdit.innerHTML = "";
    }
});