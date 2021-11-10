//Here's my event listener that triggers whenever a key is pushed
document.addEventListener("keydown", playSound);

//This part is to help with the stretch challenge so that all of the keys have their own unique count and aren't affected by other keys being pushed
const keysObject = document.querySelectorAll('.key');
keysObject.forEach(keyItem => keyItem.count = 0);

function playSound(event) {
  //Find the corresponding div and audio file
  const divMatch = document.querySelector(`div[data-key="${event.keyCode}"]`);
  const audioMatch = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  if (!divMatch) return;//if the key that was pressed wasn't one of the available options, return from this function and do nothing
  
  //add the playing class to the key and move it down 10px by going to the moveKey function
  divMatch.classList.add("playing");
  moveKey(divMatch);

  audioMatch.addEventListener("ended", () => divMatch.classList.remove("playing"));//this will take the playing class off when the audio file ends
  audioMatch.currentTime = 0;//This restarts the audio file in case the same key is hit in rapid succession
  audioMatch.play();

function moveKey(key) {
    if (key.count<100){
    key.count = (key.count+10);
    let newPosition = key.count;
    key.style.transform= "translateY("+ newPosition+"px)";
    }
    else {
        key.count = 0;
        key.style.transform= "translateY(0)";
    }
}
}