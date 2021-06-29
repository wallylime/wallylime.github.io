//Used on home page of weather site
//The following code is for fetching info from a JSON file about Preston, Soda Springs, & Fish Haven
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
        let datadiv = document.createElement("div");

        let h2 = document.createElement("h2");
        h2.textContent = towns[i].name;

        let p1 = document.createElement("p");
        p1.innerHTML = `<span class="infoHeadings">Year Founded: </span> ${towns[i].yearFounded}`;

        let p2 = document.createElement("p");
        p2.innerHTML = `<span class="infoHeadings">Population: </span> ${towns[i].currentPopulation}`;

        let p3 = document.createElement("p");
        p3.innerHTML = `<span class="infoHeadings">Annual Rain Fall: </span> ${towns[i].averageRainfall}`;
      
        datadiv.append(h2, p1, p2, p3);
        datadiv.setAttribute("class", "data");

        let image = document.createElement("img");
        image.setAttribute("src", `images/${towns[i].photo}`);
        image.setAttribute("alt", `picture of ${towns[i].name}`);
        if (towns[i].name == "Preston") {
          image.setAttribute("title", "photo by Louise Tollisen on Unsplash");
        }
        else if (towns[i].name == "Soda Springs") {
          image.setAttribute("title", "photo by Krisztina Papp on Unsplash");
        }
        else if (towns[i].name == "Fish Haven") {
          image.setAttribute("title", "photo by Kristina Tamašauskaitė on Unsplash");
        }

        townInfo.append(datadiv, image);
        townInfo.setAttribute("class", "towngrid");

        document.querySelector("div.towns").appendChild(townInfo);        

      }
    }
  })