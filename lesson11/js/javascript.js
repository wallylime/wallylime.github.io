//General javascript for use on all pages

WebFont.load({
  google: {families: ["New Tegomin", "Spartan"]
  }
});

//Navigation display function for smaller screens
function toggleMenu() {
  document.querySelector("#navigation").classList.toggle("hide");
}

//Building day and month lists
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Getting current date info
let today = new Date();
let dateDisplay = days[today.getDay()] + ", " + today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();
document.querySelector("#year").textContent = today.getFullYear();
document.querySelector("#currentDate").textContent = dateDisplay;

//Pancake banner
if (today.getDay() == 5) {
  let banner = document.querySelector("aside");
  banner.setAttribute("class", "banner");
}

//The following code is for the days since last visit to the site
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

