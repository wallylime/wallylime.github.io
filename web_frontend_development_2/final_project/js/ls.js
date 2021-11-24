//Reads local storage and returns JSON of the saved value
 export function readFromLS(key) {
  let ls = JSON.parse(localStorage.getItem(key)); //grabs the LS value and converts it to JSON
  return ls;
}

//Changes data to a text string and saves the key-value pair in local storage
export function writeToLS(key, data) {
  let text = JSON.stringify(data); //converts data into text so that we can save it as the ls value in the next line of code
  localStorage.setItem(key, text);
}