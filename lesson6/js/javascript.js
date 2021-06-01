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