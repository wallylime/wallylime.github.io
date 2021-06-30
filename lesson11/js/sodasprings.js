//JS specific to the Soda Springs page

//This code is for filling in the weather summary
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?id=5607916&appid=10fc032484daf74e68e4eb98c9bc0ad7&units=imperial";
fetch(weatherURL)
  .then((response) => response.json())
  .then((ssWeather) => { 
    document.getElementById("current-temp").textContent = Math.round(ssWeather.main.temp);
    document.getElementById("current-description").textContent = ssWeather.weather[0].description;
    document.getElementById("wind-speed").textContent = Math.round(ssWeather.wind.speed);
    document.getElementById("humidity").textContent = ssWeather.main.humidity;
  })

//This code is for filling in the 5-day forecast
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=5607916&appid=10fc032484daf74e68e4eb98c9bc0ad7&units=imperial";
fetch(forecastURL)
  .then((response) => response.json())
  .then ((ssForecast) => {
    const dayofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const fivedays = ssForecast.list.filter(item => item.dt_txt.includes("18:00:00"));
    let num = 1;
    let imgurl = "https://openweathermap.org/img/wn/";
    fivedays.forEach(day => {
      let forecastday = new Date(day.dt_txt);
      document.getElementById("day" + num).textContent = dayofweek[forecastday.getDay()];
      document.getElementById("day" + num + "temp").textContent = Math.round(day.main.temp);
      let icon = document.getElementById("icon" + num);
      icon.setAttribute("src", imgurl + day.weather[0].icon + "@2x.png");
      icon.setAttribute("alt", day.weather[0].description);
      num ++;
    })
  })

//This code is for calculating wind chill
var current_temp = parseFloat(document.querySelector("#current-temp").innerHTML);
var wind_speed = parseFloat(document.querySelector("#wind-speed").innerHTML);
if (current_temp < 51 && wind_speed > 3) {
  var wind_chill = 35.74 + .6215 * current_temp - 35.75 * Math.pow(wind_speed, .16) + .4275 * current_temp * Math.pow(wind_speed, .16);
  wind_chill = Math.round(wind_chill * 10) / 10;
  document.querySelector("#wind-chill").innerHTML = wind_chill + "&deg;F";
} 

else {
  document.querySelector("#wind-chill").innerHTML = "N/A";
}

//This code is for the Soda Springs events section
const townListURL = "https://byui-cit230.github.io/weather/data/towndata.json";
fetch(townListURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (townlist) {
    const towns = townlist["towns"];

    for (i=0; i < towns.length; i++) {
      if (towns[i].name == "Soda Springs") {
        let h3 = document.createElement("h3");
        h3.textContent = "Soda Springs Events:";
        document.querySelector("div.townevents").appendChild(h3);
        let ssEvents = towns[i].events;
        for (j=0; j < ssEvents.length; j++) {
          let p = document.createElement("p");
          p.innerHTML = ssEvents[j];
          document.querySelector("div.townevents").appendChild(p);
        }
      }
    }
  })
