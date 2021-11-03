let url = "https://swapi.dev/api/people";

fetch(url)
  .then((response) => response.json())
  .then((peopleList) => {
    //Building the list of 10 Star Wars people
    const div = document.querySelector("div.people");
    peopleList.results.forEach(person => {
      let personCard = renderOnePerson(person);
      div.append(personCard);
    })
    
    //Finding the next and previous buttons and attaching event listeners
    const previousButton = document.querySelector("#previous"); 
    const nextButton = document.querySelector("#next");
    previousButton.addEventListener("click", getPrevious);
    nextButton.addEventListener("click", getNext);

    //Function for getting the previous page's results
    function getPrevious() {
      if (peopleList.previous != null) {
        let previousUrl = peopleList.previous;
        url = previousUrl;
        fetch(url);
    }
      else {
        alert("This is the first page of results.");
      }
    }
    
    //Function for getting the next page's results
    function getNext() {
      fetch(nextUrl);
      // if (peopleList.next != null) {
      //   let nextUrl = peopleList.next;
      //   url = nextUrl;
      //   fetch(url);
      // }
      // else {
      //   alert("This is the last page of results.")
      // }
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
      <div class="hidden">
      <p>Eye Color: ${person.eye_color}</p>
      <p>Hair Color: ${person.hair_color}</p>
      <p>Skin Color: ${person.skin_color}</p>
      </div>`;
      // newDiv.addEventListener("click", showMoreDetails);
     return newDiv;
   }
  })