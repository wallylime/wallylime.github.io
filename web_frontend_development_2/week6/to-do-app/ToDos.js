//Import from modules
import { createElement, removeHide, addHide } from "./utilities.js";
import { localSave, localRetrieve } from "./localStorage.js";

//Global variables for elements in the DOM
const h1 = document.querySelector("h1");
const toDoList = document.querySelector("ul#toDoList");
const listItems = document.querySelectorAll("li");
const removeButtons = document.querySelectorAll("button.removeButton");
const showAllButton = document.querySelector("button#showAll");
const showIncompleteButton = document.querySelector("button#showIncomplete");
const showCompleteButton = document.querySelector("button#showComplete");
const addTaskButton = document.querySelector("button#addTask");
const saveListButton = document.querySelector("button#saveList");
const retrieveListButton = document.querySelector("button#retrieveList");

//Event listeners
saveListButton.addEventListener("click", saveList);
retrieveListButton.addEventListener("click", retrieveList);
toDoList.addEventListener("dblclick", crossOrUncrossItem);
showAllButton.addEventListener("click", showAll);
showIncompleteButton.addEventListener("click", showIncomplete);
showCompleteButton.addEventListener("click", showComplete);
addTaskButton.addEventListener("click", addTask);
removeButtons.forEach(removeButton => removeButton.addEventListener("click", removeTask));


//Functions

//Creates a new li from the user's input that includes a remove button
function addTask() {
  let newTask = document.querySelector("#newTask").value;
  let li = createElement("li", `&#9733; ${newTask} <button class="removeButton" title="click here to remove this task completely"><span class="x">X</span> Remove </button>`);
  li.setAttribute("title", "Double click to cross this task off. Double click again to uncross it.");
  toDoList.append(li);
}

//Saves a to-do list
function saveList() {
  let listName = document.querySelector("#toDoListName").value;
  h1.innerHTML = `${listName}`;
  localSave(listName, toDoList);
}

//Retrieves a to-do list
function retrieveList() {
  let listName = document.querySelector("#toDoListName").value;
  let retrievedList = localRetrieve(listName);
  toDoList.value = retrievedList;
  h1.innerHTML = `${listName}`;
}

//Removes a list item
function removeTask(event) {
  let li = event.target.parentNode;
  toDoList.removeChild(li);
}

//Crosses off or uncrosses a to-do list item
function crossOrUncrossItem(event) {
  event.target.classList.toggle("completed");
  }


//Functions for hiding or displaying content based on user's button choice:

//Shows every item on the list whether it is complete or incomplete
function showAll() {
  listItems.forEach(listItem => removeHide(listItem));
}

//Shows only incomplete list items
function showIncomplete() {
  listItems.forEach(listItem => {
    if (listItem.classList.contains("completed")) {
      addHide(listItem);
    }
    else {
      removeHide(listItem);
    }
  })
}

//Shows only complete list items
function showComplete() {
  listItems.forEach(listItem => {
    if (listItem.classList.contains("completed") === false) {
      addHide(listItem);
  }
    else {
      removeHide(listItem);
    }
  })
}
/*List of things that I still need to figure out:
-How can I do line-through on the li without also having it on the remove text?
    IDEAS: If desperate, maybe don't use line through, just background color and animation that moves the item to the bottom of the list
-How to get items on my list & how to get the list title to display
-Test local storage
*/