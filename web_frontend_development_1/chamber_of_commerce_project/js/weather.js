const weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=43.6121&lon=-116.3915&exclude=minutely,hourly&units=imperial&appid=10fc032484daf74e68e4eb98c9bc0ad7";
fetch(weatherURL)
  .then((response) => response.json())
  .then((meridianWeather) => {
    //For current weather info
    let currentCondition = document.getElementById("current-condition");
    currentCondition.innerHTML = meridianWeather.current.weather[0].description;  
    
    let currentWeather = document.getElementById("current-weather");
    currentWeather.innerHTML = `${meridianWeather.current.temp}&deg; F`;

    let currentHumidity = document.getElementById("current-humidity");
    currentHumidity.innerHTML = `${meridianWeather.current.humidity}%`;
    
    //For three day forecast
    const dayofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let num = 1;
    for (i=1; i < 4; i++) {
      let date = new Date(meridianWeather.daily[i].dt * 1000);
      let day = document.getElementById("day" + num);
      day.innerHTML = `${dayofweek[date.getDay()]}`;
      let forecast = document.getElementById("forecast" + num);
      forecast.innerHTML = `${meridianWeather.daily[i].temp.day}&deg; F`;
      num += 1;
    }

    if (meridianWeather.hasOwnProperty("alerts") == true) {
      alert(meridianWeather.alerts[0].description);
    }

  })