//Get the day/time of current visit in order to store as value for "lastVisited" key in local storage 
var today = new Date();
var currentTime = today.getTime();

//Checks for a value stored in "lastVisited". If no value has been stored, it assigns the current time to "lastVisited." If a value has been stored, it can be subtracted from the current time in order to get how long it's been since the last site visit. The current time then replaces the previous value stored in "lastVisited."
if (!localStorage.getItem("lastVisited")) {
  localStorage.setItem("lastVisited", currentTime);
  document.querySelector("#days-since-last-visit").innerHTML = "Days Since Last Visit: 0"
}
else {
  var lastVisit = localStorage.getItem("lastVisited");
  localStorage.setItem("lastVisited", currentTime);
  //Dividing by 86,400,000 because time stamp is given in miliseconds and there are 1000 miliseconds in a second, 60 seconds in a minute, 60 minutes in an hour, and 24 hours in a day (1000 * 60 * 60 * 24)
  var daysSinceVisit = Math.floor((currentTime - lastVisit) / 86400000);
  document.querySelector("#days-since-last-visit").innerHTML = "Days Since Last Visit: " + daysSinceVisit;
}