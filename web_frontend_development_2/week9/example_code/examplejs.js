//wanted to try some of these obnoxious alerts
window.alert("This page will be obnoxious!");
window.confirm("Are you sure you want to be on this page?");
const userName = window.prompt("Okay, what is your name?");
const h2 = document.querySelector("h2");
if (userName != "") {
  h2.innerHTML = `Hello, ${userName}! Welcome to this obnoxious page!`
}
else {
  h2.innerHTML = `Hello User! Welcome to this obnoxious page!`
}

function popUp() {
  window.open("https://wallylime.github.io/web_frontend_development_2/week9/example_code/popup.html", "Popup", "top=50,width=300,height=300,resizable=yes");
}

window.setTimeout(animate, 3000);
function animate() {
  const square = document.querySelector("#square");
  square.classList.add("animate");
}

function goBack() {
  window.history.go(-1);
}
