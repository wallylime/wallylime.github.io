function saveToDo(){
  var task = document.getElementsByTagName("li");
  var newToDo = document.getElementById("newTask").value;
  localStorage.setItem(task, newToDo);
}

function displayStory(){
  var storyTitle = document.getElementById("storyName").value
  var yourStory = document.getElementById("storyEditor").value
  document.getElementById("storyDisplay").innerHTML = storyTitle + "<br><br>" + yourStory
}