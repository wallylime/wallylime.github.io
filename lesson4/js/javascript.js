//Navigation display function for smaller screens
function toggleMenu() {
  document.getElementById("navigation").classList.toggle("hide");
}

//Get the current date for the footer
let today = new Date();

const days = [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday];
const months = [January, February, March, April, May, June, July, August, September, October, November, December]

let day = today.getDay();
let month = today.getMonth();
let date = today.getDate();
let year = today.getFullYear();
let currentDate = days[day] + ", " + date + " " + months[month] + " " + year;
document.querySelector("#year").textContent = year;
document.querySelector("#currentDate").textContent = currentDate;