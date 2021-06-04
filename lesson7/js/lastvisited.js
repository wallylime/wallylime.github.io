//Get the day/time of current visit in order to store as value for "lastVisited" key in local storage 
let today = new Date();
let currentVisit = today.getFullYear() + " " + today.getMonth() + " " + today.getDate();

console.log(currentVisit);

//Check for last visited in local storage
// if (!localStorage.getItem("lastVisited")) {
//   localStorage.setItem("lastVisited", time);
// }

