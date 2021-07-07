const weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=43.6121&lon=-116.3915&exclude=minutely,hourly&units=imperial&appid=10fc032484daf74e68e4eb98c9bc0ad7";
fetch(weatherURL)
  .then((response) => response.json())
  .then((meridianWeather) => {
    //For current weather info
    let imgurl = "https://openweathermap.org/img/wn/";
    let icon = document.getElementById("weather-icon");
    icon.setAttribute("src", imgurl + meridianWeather.current.weather[0].icon + "@2x.png");
    icon.setAttribute("alt", meridianWeather.current.weather[0].description + " icon");
    
    let currentWeather = document.getElementById("current-weather");
    currentWeather.innerHTML += `${meridianWeather.current.weather[0].description.toUpperCase()} <br> <span class="weather-numbers">${meridianWeather.current.temp}&deg; F</span> <br> HUMIDITY: <span class="weather-numbers">${meridianWeather.current.humidity}%</span>`;
    
    let weatherAlert = meridianWeather.alerts[0].description;
    alert(weatherAlert);

    //For three day forecast
    const dayofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let num = 1;
    //The 7-day forecast starts with the current day, so I am using the days indexed 1-3 to get the next 3 days
    for (i=1; i < 4; i++) {
      //Here's the code that I thought should work:
      let date = new Date(meridianWeather.daily[i].dt);
      let forecast = document.getElementById("forecast-" + num);
      forecast.innerHTML = `<span class="forecastDay">${dayofweek[date.getDay()]}</span> <br> <span class="weather-numbers">${meridianWeather.daily[i].temp.day}&deg; F</span>`;
      num += 1;
      //But for some reason, it keeps giving me Monday as the day of the week for each day. I used the console to troubleshoot:
      console.log(meridianWeather.daily[i].dt);
      console.log(date);
      //Each timestamp is showing up in the console correctly and when I use an online timestamp converter tool, it shows the correct date. HOWEVER, when the console shows the date variable, it shows up as Mon, Jan 19, 1970. I have no idea what is going on or what I am doing wrong. I thought I understood how this stuff worked. Apparently not.
    }

  })