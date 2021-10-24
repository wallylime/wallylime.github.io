//Import from modules
import { createElement, removeHide, addHide } from "./utilities.js";


//Variables for elements in the DOM
const toDoList = document.querySelector("ul#toDoList");
const showAllButton = document.querySelector("button#showAll");
const showIncompleteButton = document.querySelector("button#showIncomplete");
const showCompleteButton = document.querySelector("button#showComplete");
const addTaskButton = document.querySelector("button#addTask");


//Event listeners

/*The next three lines of code and the updateNodeLists function are so that when the ul has a new li added, I can find the list item's remove button and add an event listener to it. I was having a problem with finding all of the remove buttons with querySelectorAll. It could find everything that was already listed in the html, but couldn't find any from newly-added list items since querySelectors return a static node list. I tried using getElementsByClass, but then it wouln't let me use the forEach method to put an event listener on every button. So, I researched and found this solution which looks for changes to the DOM in the area that I choose. I'm pretty sure that there must be a better solution than this, but I'm not sure what it is.*/
const observer = new MutationObserver(updateNodeLists);
const config = { childList: true };
observer.observe(toDoList, config);

toDoList.addEventListener("dblclick", crossOrUncrossItem);
showAllButton.addEventListener("click", showAll);
showIncompleteButton.addEventListener("click", showIncomplete);
showCompleteButton.addEventListener("click", showComplete);
addTaskButton.addEventListener("click", addTask);


//Functions

// For finding the new remove buttons when a new li is added and attaching an event listener
function updateNodeLists(mutationsList, observer) {
  for(const mutation of mutationsList) {
      if (mutation.type === 'childList') {
          let removeButtons = document.querySelectorAll("button.removeButton");
          removeButtons.forEach(removeButton => {
            removeButton.addEventListener("click", removeTask);
          })
      }
  }
};


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