// For use in converting milliseconds to seconds
const ONESECOND = 1000;

// Obtain current time
let today = new Date();
let currentTime = today.getTime();

// If there is no "lastvisited" data in local storage, set it to current time
if(!localStorage.getItem('lastvisited')) {
  localStorage.setItem('lastvisited', currentTime);
}

// Store the last-visited time in a variable
var lastTime = parseInt(localStorage.getItem('lastvisited'));

// Subtract current time with last-visited time and convert to seconds
let seconds = (currentTime - lastTime) / ONESECOND;

// Display to the console how many seconds since last page visit
console.log("You last visited " + seconds.toFixed(2) + "  seconds ago.");

// Store current time in storage to be used the next time we refresh page
localStorage.setItem('lastvisited', currentTime);
