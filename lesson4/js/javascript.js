//Building day name and month name lists
const days = [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday];
const months = [January, February, March, April, May, June, July, August, September, October, November, December]
//Getting the current date
let today = new Date();
let day = today.getDay();
let month = today.getMonth();
let date = today.getDate();
let year = today.getFullYear();
let currentDate = days[day] + ", " + date + " " + months[month] + " " + year;
document.getElementById("currentDate").innerHTML = currentDate;
document.getElementById("year").innerHTML = year;

//Navigation display function for smaller screens
const menu = document.querySelector(".menu");
const nav = document.querySelector(".navigation");
menu.addEventListener("click", () =>
{nav.classList.toggle("responsive")}, false);
window.onresize = () => {if (window.innerWidth > 760)
nav.classList.remove("responsive")};