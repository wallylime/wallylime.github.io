let url = "https://swapi.dev/api/people";

fetch(url)
  .then((response) => response.json())
  .then((peopleList) => {
    //Building the initial list of 10 Star Wars people
    const div = document.querySelector("div.people");
    for(let i = 0, max = peopleList.results.length; i < max; i++) {
      let personCard = renderOnePerson(peopleList.results[i]);
      div.append(personCard);
    }
    
    //Finding the next and previous buttons and attaching event listeners
    const previousButton = document.querySelector("#previous"); 
    const nextButton = document.querySelector("#next");
    previousButton.addEventListener("click", getPrevious);
    nextButton.addEventListener("click", getNext);

    //Function for getting the previous page's results
    function getPrevious() {
      if (peopleList.previous != null) {
        let previousUrl = `"${peopleList.previous}"`;
        url = previousUrl;
        fetch(url);
    }
      else {
        alert("This is the first page of results.");
      }
    }
    
    //Function for getting the next page's results
    function getNext() {
      if (peopleList.next != null) {
        let nextUrl = `"${peopleList.next}"`;
        url = nextUrl;
        console.log(url);
        fetch(url);
      }
      else {
        alert("This is the last page of results.")
      }
    }

   //Function for rendering each Star Wars person in the HTML
   function renderOnePerson(person) {
     let newDiv = document.createElement("div");
     newDiv.classList.add("personCard");
     newDiv.innerHTML = 
     `<h2>${person.name}</h2>
      <p>Gender: ${person.gender}</p>
      <p>Height: ${person.height}</p>
      <p>Mass: ${person.mass}</p>
      <p>Eye Color: ${person.eye_color}</p>
      <p>Hair Color: ${person.hair_color}</p>`;
      //newDiv.addEventListener("click", showMoreDetails);
     return newDiv;
   }

  
  })