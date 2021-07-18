const businessesURL = "json/businesses.json";
fetch(businessesURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (businessJSON) {
    const businesses = businessJSON["businesses"];
    for (let i = 0; i < businesses.length; i++) {
      let card = document.createElement("section");
      
      let h2 = document.createElement("h2");
      h2.innerHTML = `<a href="${businesses[i].website}">${businesses[i].name}</a>`;

      let p1 = document.createElement("p");
      p1.innerHTML = `<span class="description">${businesses[i].description}</span>`;

      let p2 = document.createElement("p");
      p2.innerHTML = `${businesses[i].address.street}<br>${businesses[i].address.city}<br><br>${businesses[i].phone}<br><a href="${businesses[i].website}">${businesses[i].website}</a>`;

      card.append(h2, p1, p2);

      document.querySelector("div.cards").appendChild(card);
    }
  })

  function gridView() {
    let div = document.querySelector("div.cards");
    div.classList.add("grid-view");
  }

  function listView() {
    let div = document.querySelector("div.cards");
    div.classList.remove("grid-view");
  }