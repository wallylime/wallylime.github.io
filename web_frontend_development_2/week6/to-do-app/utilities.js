//This file is for bits of code that are not project specific and can be resused in other projects

//Creates elements and adds innerHTML to them
function createElement(tag, innerHTML) {
  const element = document.createElement(tag);
  element.innerHTML = innerHTML;
  return element;
}

//The following two functions could be used on a variety of projects with .hide appearing in the CSS and set to display: none;

//Removes class of "hide"
function removeHide(element) {
  element.classList.remove("hide");
}

//Adds class of "hide"
function addHide(element) {
  element.classList.add("hide");
}

export {
  createElement,
  removeHide,
  addHide
}