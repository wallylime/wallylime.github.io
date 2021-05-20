const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector(".list");
button.addEventListener("click", () => {
  let chapter = input.value;
  input.value = "";
  let li = document.createElement("li");
  let liText = document.createElement("span");
  let deleteButton = document.createElement("button");
  li.appendChild(liText);
  liText.textContent = chapter;
  li.appendChild(deleteButton);
  deleteButton.textContent = "Delete";
  list.appendChild(li);

  deleteButton.addEventListener("click", () =>{
    list.removeChild(li);
  })

  input.focus();

});