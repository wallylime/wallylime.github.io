import List from "./list.js";

const list = new List("shopping-list");

window.addEventListener("load", () => {
  list.showShoppingList();
  list.addEventListeners();
})

const addButton = document.querySelector("#addItem");
addButton.addEventListener("click", () => list.addItem());