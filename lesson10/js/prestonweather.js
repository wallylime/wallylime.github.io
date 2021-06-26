//This code is for filling in the weather summary on the Preston page
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=10fc032484daf74e68e4eb98c9bc0ad7&units=imperial";
fetch(weatherURL)
  .then((response) => response.json())
  .then((prestonWeather) => { 
    document.getElementById("current-temp").textContent = Math.round(prestonWeather.main.temp);
    document.getElementById("current-description").textContent = prestonWeather.weather[0].description;
    document.getElementById("wind-speed").textContent = Math.round(prestonWeather.wind.speed);
    document.getElementById("humidity").textContent = prestonWeather.main.humidity;
  })

//This code is for filling in the 5-day forecast on the Preston page
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=10fc032484daf74e68e4eb98c9bc0ad7&units=imperial";
fetch(forecastURL)
  .then((response) => response.json())
  .then ((prestonForecast) => {
    const dayofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const fivedays = prestonForecast.list.filter(item => item.dt_txt.includes("18:00:00"));
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