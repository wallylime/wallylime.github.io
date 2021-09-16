// get current year
let date = new Date();
document.querySelector("#year").textContent = date.getFullYear();
//get last modified date and time
document.querySelector("#lastmodified").textContent = document.lastModified;

function loadStory(){
  var storyTitle = document.getElementById("storyName").value
  var yourStory = localStorage.getItem(storyTitle)
  document.getElementById("storyEditor").value = yourStory
}

function saveStory(){
  var storyTitle = document.getElementById("storyName").value
  var yourStory = document.getElementById("storyEditor").value
  localStorage.setItem(storyTitle, yourStory)
}

function displayStory(){
  var storyTitle = document.getElementById("storyName").value
  var yourStory = document.getElementById("storyEditor").value
  document.getElementById("storyDisplay").innerHTML = storyTitle + "<br><br>" + yourStory
}