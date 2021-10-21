//Event listener for crossing items off 
var listItems = document.querySelectorAll("li p");
listItems.forEach(listItem => addEventListener("dblclick", crossOffItem));

//This function crosses off a completed to-do item
function crossOffItem(event) {
  event.target.classList.add("completed");
}

//Event listener for the "remove" buttons
var removeButtons = document.querySelectorAll(".removeButton");
removeButtons.forEach(button => addEventListener ("click", removeTask));

//This function removes a list item
function removeTask(event) {
  event.target
}

/*input: new task in input box
  processing: create a new li with p and button, add the content from the input box to the p and append li to ul
  output: have new task item appear in to-do list
*/

// function addTask() {
//   let toDoList = document.getElementById("js-toDoList");
//   toDoList.appendChild(createLi());
// };

// //This function creates a li with two children: p & button
// function createLi() {
//   let li = document.createElement("li");
//   let p = document.createElement("p");
//   //adds the "incomplete" star and the new list item
//   p.innerHTML = `<span class="star incomplete">&#9734;</span> ${document.getElementById("newTask").value}`;
//   //adds a remove button to each list item
//   let button = document.createElement("button");
//   button.setAttribute("class", "deleteButton");
//   button.setAttribute("onclick", "deleteItem()");
//   button.innerHTML = `<span class="x">X</span> Remove`;
//   li.append(p, button);
//   return li;
// }

