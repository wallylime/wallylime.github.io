//These functions are for saving and retrieving things in local storage
function localSave(key, value) {
  localStorage.setItem(key, value);
}

function localRetrieve(key) {
  return localStorage.getItem(key);
}

export {
  localSave,
  localRetrieve
}