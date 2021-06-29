//For use on the Preston, Soda Springs, & Fish Haven Pages

const townListURL = "https://byui-cit230.github.io/weather/data/towndata.json";
fetch(townListURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (townlist) {
    const towns = townlist["towns"];

    for (i=0; i < towns.length; i++) {
      if (towns[i].name == "Preston" || towns[i].name == "Soda Springs" || towns[i].name == "Fish Haven") {
        
        let townInfo = document.createElement("section");

        let h3 = document.createElement("h3");
        h3.textContent = "Town Events";

        let p1 = document.createElement("p");
        p1.innerHTML = towns[i].events;

        townInfo.append(h3, p1);

        document.querySelector("div.townevents").appendChild(townInfo);        

      }
    }
  })