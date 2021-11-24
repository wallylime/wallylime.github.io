//Grabbing the List class
import List from "./list.js";

/*----------The code below is for the shopping list portion of my app----------*/

//Creating a new instance of the List
const list = new List("shopping-list");

//Once the rest of the page is done loading, grab shopping list from local storage and add event listeners to the list items
window.addEventListener("load", () => {
  list.showShoppingList();
  list.addEventListeners();
})

//Grabbing the add button and attaching an event listener to add the item 
const addButton = document.querySelector("#addItem");
addButton.addEventListener("click", () => list.addItem());

//Allows the user to also hit "enter" and accomplish the same thing as clicking the add button
const input = document.querySelector("#item");
input.addEventListener("keypress", event => {
  if (event.key === "Enter") {
    list.addItem();
  }
});