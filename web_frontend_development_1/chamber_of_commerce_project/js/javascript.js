//Navigation display function for smaller screens
function toggleMenu() {
  document.querySelector("#navigation").classList.toggle("hide");
}

//Last updated & copyright year for footer
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let today = new Date();
document.getElementById("year").textContent = today.getFullYear();

let lastUpdate = new Date(document.lastModified);
document.getElementById("update").textContent = `${months[lastUpdate.getMonth()]} ${lastUpdate.getDate()}, ${lastUpdate.getFullYear()}`;