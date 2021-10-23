//Import from modules
import { createElement, removeHide, addHide } from "./utilities.js";

//Variables for elements in the DOM
const toDoList = document.querySelector("ul#toDoList");
const showAllButton = document.querySelector("button#showAll");
const showIncompleteButton = document.querySelector("button#showIncomplete");
const showCompleteButton = document.querySelector("button#showComplete");
const addTaskButton = document.querySelector("button#addTask");
const removeButtons = document.querySelectorAll("button.removeButton");


//Event listeners
toDoList.addEventListener("dblclick", crossOrUncrossItem);
showAllButton.addEventListener("click", showAll);
showIncompleteButton.addEventListener("click", showIncomplete);
showCompleteButton.addEventListener("click", showComplete);
addTaskButton.addEventListener("click", addTask);
removeButtons.forEach(removeButton => {
  removeButton.addEventListener("click", removeTask);
})


//Functions

//Creates a new li from the user's input that includes a remove button
function addTask() {
  let newTask = document.querySelector("#newTask").value;
  let li = createElement("li", `&#9733; ${newTask} <button class="removeButton"><span class="x">X</span> Remove </button>`);
  li.setAttribute("title", "Double click to cross this task off. Double click again to uncross it.");
  toDoList.append(li);
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
  let listItems = document.querySelectorAll("li");
  listItems.forEach(listItem => removeHide(listItem));
}

//Shows only incomplete list items
function showIncomplete() {
  let listItems = document.querySelectorAll("li");
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
  let listItems = document.querySelectorAll("li");
  listItems.forEach(listItem => {
    if (listItem.classList.contains("completed") === false) {
      addHide(listItem);
  }
    else {
      removeHide(listItem);
    }
  })
}