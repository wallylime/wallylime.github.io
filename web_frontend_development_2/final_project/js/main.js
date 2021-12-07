import List from "./list.js";
import PlannerSquare from "./planner.js";

/*--------------------------------------------
The code below is for the menu-planning portion of my app
--------------------------------------------*/

//Setting up each day as a new instance of a PlannerSquare
const Mon = new PlannerSquare("Mon");
const Tues = new PlannerSquare("Tues");
const Wed = new PlannerSquare("Wed");
const Thurs = new PlannerSquare("Thurs");
const Fri = new PlannerSquare("Fri");
const Sat = new PlannerSquare("Sat");
const Sun = new PlannerSquare("Sun");



/*--------------------------------------------
The code below is for the shopping list portion of my app
--------------------------------------------*/
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

//I only want placeholder text in this input when the screen size is small since a label is displayed for larger screen sizes
if (window.innerWidth < 500) {
	input.setAttribute("placeholder", "item to add to list");
}