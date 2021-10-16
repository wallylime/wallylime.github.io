const toDoList = document.getElementById("js-toDoList");
function addTask() {
  //create li w/ paragraph & button
  let item = document.createElement("li");
  item.innerHTML = "This is an item.";
  toDoList.appendChild(item);
};