//Get the day/time of current visit in order to store as value for "lastVisited" key in local storage 
let today = new Date();
let time = today.getTime();
console.log(time);

//Check for last visited in local storage
// if (!localStorage.getItem("lastVisited")) {
//   localStorage.setItem("lastVisited", time);
// }

