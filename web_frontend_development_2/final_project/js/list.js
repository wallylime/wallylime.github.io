import { readFromLS, writeToLS } from "./ls.js";

let shoppingList = [];

export default class List {
  constructor(id) {
    this.element = document.getElementById(id);
    this.key = id;//using the element's id as the local storage key
    shoppingList = getList(this.key);//pulls the list from local storage or sets it to an empty array if LS doesn't have anything stored there
  }

showShoppingList() {
  renderList(this.element, shoppingList);
  this.addEventListeners();
}

//Reads the value from the input and saves it to the shopping list if it isn't empty
addItem() {
  const item = document.getElementById("item");
  if (item.value === "") {
    return;//this ensures that nothing happens if nothing has been added to the text input
  }
  saveItem(item, this.key);
  this.showShoppingList();
  }

//Adding event listeners to cross off and remove list items
addEventListeners() {
  const items = Array.from(this.element.children); //gets all of the list items in the ul
  items.forEach(item => {
    item.children[0].addEventListener("click", () => item.classList.toggle("completed"));//if the user clicks, the item will be crossed off
    item.children[2].addEventListener("click", () => this.removeItem(item.id));//if the user clicks the X, the item will be removed
  })
}

removeItem(itemID) {
  let item = shoppingList.findIndex(item => item.id == itemID);
  shoppingList.splice(item, 1);
  writeToLS(this.key, shoppingList);
  this.showShoppingList();
}

}//-----End of List object-----


//Grabs the list from local storage; if nothing is there, it creates an empty array
function getList(key) {
  let ls = readFromLS(key);
  return ls === null ? [] : ls;
}

//Saves the list to local storage
function saveItem(item, key) {
  let timestamp = Date.now();
  const newItem = {id: timestamp, content: item.value};
  shoppingList.push(newItem);//save the new item to our list
  writeToLS(key, shoppingList);//save our shopping list to ls
  item.value = "";//clears the item input
}

function renderList(ul, lis) {
  ul.innerHTML = "";
  lis.forEach(item => ul.innerHTML += renderOneItem(item));
}

function renderOneItem(item) {
  return `<li id="${item.id}">
          <input name="${item.content}" type="checkbox">
          <p>${item.content}</p>
          <div class="delete">X</div>
          </li>`;
}