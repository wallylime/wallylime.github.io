const toDoList = document.querySelector("ul");
const listItems = toDoList.querySelectorAll("li");

//Event listener for crossing items off 
listItems.forEach(listItem => addEventListener("click", crossOffItem));

//Why is this also crossing off the paragraph?
//This function crosses off a completed to-do item
function crossOffItem(event) {
  event.target.classList.add("completed");
  event.target.removeEventListener("click", crossOffItem);
  // event.target.addEventListener("dblclick", uncrossOff);
};


// function uncrossOff(event) {
//   console.log("This part is working");
//   console.log(event.target);
//   //why isn't this removing "completed" from the classList?
//   event.target.classList.remove("completed");
//   console.log(event.target.classList);
// };  

// const removeButtons = document.getElementsByClassName("removeButton");

// removeButtons.forEach(removeButton => addEventListener("dblclick", removeTask));

//This function removes a list item
// function removeTask(event) {
//   let li = event.target.parentElement;
//   li.remove();
// }

// listItems.forEach(listItem => {
//     let completed = listItem.classList.includes("completed")
//     if (listItem !== completed) {
//       listItem.classList.add("hide");
//     }
//   }
// };

/*function addTask() {
  let toDoList = document.getElementById("js-toDoList");
  toDoList.appendChild(createLi());
};

This function creates a li with two children: p & button
function createLi() {
  let li = document.createElement("li");
  let p = document.createElement("p");
  //adds the "incomplete" star and the new list item
  p.innerHTML = `<span class="star incomplete">&#9734;</span> ${document.getElementById("newTask").value}`;
  //adds a remove button to each list item
  let button = document.createElement("button");
  button.setAttribute("class", "deleteButton");
  button.setAttribute("onclick", "deleteItem()");
  button.innerHTML = `<span class="x">X</span> Remove`;
  li.append(p, button);
  return li;}
*/

