const contactButton = document.querySelector("#contact-button");
const contactInfo = document.querySelector("#contact-info");
contactButton.addEventListener("click", showContact);

function showContact() {
  contactInfo.classList.toggle("showInfo");
}