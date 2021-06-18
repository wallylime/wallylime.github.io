//We worked on this code together as a team.
//The following code is for fetching info from a JSON file about Preston, Soda Springs, & Fish Haven
const townListURL = "https://byui-cit230.github.io/weather/data/towndata.json";
fetch(townListURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (townlist) {
    const towns = townlist["towns"];
    
    //Soda Springs Info
      let townInfo = document.createElement("section");

      let h2 = document.createElement("h2");
      h2.textContent = towns[0].name;
      townInfo.appendChild(h2);

      let p1 = document.createElement("p");
      p1.innerHTML = `<span class="infoHeadings">Year Founded: </span> ${towns[0].yearFounded}`;
      townInfo.appendChild(p1);

      let p2 = document.createElement("p");
      p2.innerHTML = `<span class="infoHeadings">Population: </span> ${towns[0].currentPopulation}`;
      townInfo.appendChild(p2);

      let p3 = document.createElement("p");
      p3.innerHTML = `<span class="infoHeadings">Annual Rain Fall: </span> ${towns[0].averageRainfall}`;
      townInfo.appendChild(p3);

      let image = document.createElement("img");
      image.setAttribute("src", "images/floristshop.jpg");
      image.setAttribute("alt", "picture of a florist shop by Krisztina Papp");
      image.setAttribute("title", "Photo by Krisztina Papp on Unsplash")
      townInfo.appendChild(image);

      document.querySelector("div.towns").appendChild(townInfo);

    //Fish Haven Info
      townInfo = document.createElement("section");

      h2 = document.createElement("h2");
      h2.textContent = towns[2].name;
      townInfo.appendChild(h2);

      p1 = document.createElement("p");
      p1.innerHTML = `<span class="infoHeadings">Year Founded: </span> ${towns[2].yearFounded}`;
      townInfo.appendChild(p1);

      p2 = document.createElement("p");
      p2.innerHTML = `<span class="infoHeadings">Population: </span> ${towns[2].currentPopulation}`;
      townInfo.appendChild(p2);

      p3 = document.createElement("p");
      p3.innerHTML = `<span class="infoHeadings">Annual Rain Fall: </span> ${towns[2].averageRainfall}`;
      townInfo.appendChild(p3);

      image = document.createElement("img");
      image.setAttribute("src", "images/housebylake.jpg");
      image.setAttribute("alt", "picture of a house by a lake by Kristina Tamašauskaitė");
      image.setAttribute("title", "Photo by Kristina Tamašauskaitė on Unsplash");
      townInfo.appendChild(image);

      document.querySelector("div.towns").appendChild(townInfo);

    //Preston Info
      townInfo = document.createElement("section");

      h2 = document.createElement("h2");
      h2.textContent = towns[6].name;
      townInfo.appendChild(h2);

      p1 = document.createElement("p");
      p1.innerHTML = `<span class="infoHeadings">Year Founded: </span> ${towns[6].yearFounded}`;
      townInfo.appendChild(p1);

      p2 = document.createElement("p");
      p2.innerHTML = `<span class="infoHeadings">Population: </span> ${towns[6].currentPopulation}`;
      townInfo.appendChild(p2);

      p3 = document.createElement("p");
      p3.innerHTML = `<span class="infoHeadings">Annual Rain Fall: </span> ${towns[6].averageRainfall}`;
      townInfo.appendChild(p3);

      image = document.createElement("img");
      image.setAttribute("src", "images/cityroad.jpg");
      image.setAttribute("alt", "picture of a road going through a small town by Louise Tollisen");
      image.setAttribute("title", "Photo by Louise Tollisen on Unsplash");
      townInfo.appendChild(image);

      document.querySelector("div.towns").appendChild(townInfo);
    })