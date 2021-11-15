//Get each of the form inputs
const userName = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const num = document.querySelector("#number");
//Get the place to display an error message
const errors = Array.from(document.querySelectorAll("p"));

//Event listeners (I could probably have made this code a lot more reusable, but I wanted to practice custom, detailed messages to the user)
userName.addEventListener("input", checkName);
email.addEventListener("input", checkEmail);
phone.addEventListener("input", checkPhone);
num.addEventListener("input", checkNum);

//Here are all of my functions
function checkNum() {
  if (num.validity.rangeUnderflow || num.validity.rangeOverflow) {
    const message = "Sorry, you must enter a number between 1 and 10."
    errorHandling(errors[3], message);
  }
  else {
    const message = "";
    noError(errors[3], message);
  }
}

function checkPhone() {
  if (phone.validity.patternMismatch) {
    const message = "You may only enter numbers. Special characters and letters are not allowed.";
    errorHandling(errors[2], message);
  }
  else if (phone.validity.tooShort) {
    const message = "Your phone number should be 10 digits long."
    errorHandling(errors[2], message);
  }
  else if (phone.validity.valueMissing) {
    const message = "Sorry, you can't skip this. Please enter your 10-digit phone number.";
    errorHandling(errors[2], message);
  }
  else {
    const message = "";
    noError(errors[2], message);
  }
}

function checkEmail() {
  if (email.validity.typeMismatch) {
    const message = "You must enter a valid email. For example, myemail@gmail.com";
    errorHandling(errors[1], message);
  }
  else if (email.validity.valueMissing) {
    const message = "Sorry, you can't skip this. Please enter your email.";
    errorHandling(errors[1], message);
  }
  else {
    const message = "";
    noError(errors[1], message);
  }
}

function checkName() {
  if (userName.validity.tooShort) {
    const message = "You must enter a name that is at least 3 characters long.";
    errorHandling(errors[0], message);
  }
  else if (userName.validity.tooLong) {
    const message = "You cannot enter a name that is longer than 30 characters.";
    errorHandling(errors[0], message);
  }
  else if (userName.validity.patternMismatch) {
    const message = "You can only enter letters and spaces. Please try again.";
    errorHandling(errors[0], message);
  }
  else if (userName.validity.valueMissing) {
    const message = "Sorry, you can't skip this. Please enter your name.";
    errorHandling(errors[0], message);
  }
  else {
    const message = "";
    noError(errors[0], message);
  }
}

function errorHandling(element, message) {
  addClass(element);
  errorText(element, message);
}

function addClass(element) {
  element.classList.add("error");
}

function errorText(element, message) {
  return element.textContent = message;
}

function noError(element, message) {
  removeClass(element);
  errorText(element, message);
}

function removeClass(element) {
  element.classList.remove("error");
}
