const weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=43.6121&lon=-116.3915&exclude=minutely,hourly&units=imperial&appid=10fc032484daf74e68e4eb98c9bc0ad7";
fetch(weatherURL)
  .then((response) => response.json())
  .then((meridianWeather) => {

    //For current weather info    
    let currentWeather = document.getElementById("current-weather");
    currentWeather.innerHTML = `<span class="weather-words">${meridianWeather.current.weather[0].description.toUpperCase()} & </span><span class="weather-numbers">${meridianWeather.current.temp}&deg; F</span> <br> <span class="weather-words">HUMIDITY: </span><span class="weather-numbers">${meridianWeather.current.humidity}%</span>`;
    
    //For three day forecast
    const dayofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let num = 1;
    for (i=1; i < 4; i++) {
      let date = new Date(meridianWeather.daily[i].dt * 1000);
      let forecast = document.getElementById("forecast" + num);
      forecast.innerHTML = `<span class="weather-words">${dayofweek[date.getDay()].toUpperCase()}: <br> </span><span class="weather-numbers">${meridianWeather.daily[i].temp.day}&deg; F</span>`;
      num += 1;
    }

    if (meridianWeather.hasOwnProperty("alerts") == true) {
      alert(meridianWeather.alerts[0].description);
    }

  })