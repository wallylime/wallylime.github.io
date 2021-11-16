//Get each of the form inputs
const userName = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const num = document.querySelector("#number");
//Get the place to display an error message
const errors = Array.from(document.querySelectorAll("p"));

//Event listeners
userName.addEventListener("input", checkName);
email.addEventListener("input", checkEmail);
phone.addEventListener("input", checkPhone);
num.addEventListener("input", checkNum);

//Function for checking the number input
function checkNum() {
  if (num.validity.rangeUnderflow || num.validity.rangeOverflow) {
    const message = "Sorry, you must enter a number between 1 and 10."
    errorHandling(errors[3], message);
  }
  else {
    noError(errors[3]);
  }
}

//Function for checking the phone number input
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
    noError(errors[2]);
  }
}

//Function for checking the email input
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
    noError(errors[1]);
  }
}

//Function for checking the name input
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
    noError(errors[0]);
  }
}

//This function adds the error class and makes a custom message show up explaining the error
function errorHandling(element, message) {
  addClass(element);
  writeTextContent(element, message);
}

//This function removes the error class and sets the error message to blank if there isn't an error
function noError(element, message = "") {
  removeClass(element);
  writeTextContent(element, message);
}

//This function is for adding the error message or setting the error message to blank if there isn't an error
function writeTextContent(element, message) {
  return element.textContent = message;
}

//These two functions are for adding and removing the "error" class
function addClass(element) {
  element.classList.add("error");
}

function removeClass(element) {
  element.classList.remove("error");
}
