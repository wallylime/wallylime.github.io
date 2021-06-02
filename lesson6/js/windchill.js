var current_temp = parseFloat(document.querySelector("#current-temp").value);
var wind_speed = parseFloat(document.querySelector("#wind-speed").value);
if (current_temp < 51 && wind_speed > 3) {
  var wind_chill = 35.74 + .6215 * tempF - 35.75 * Math.pow(speed, .16) + .4275 * tempF * Math.pow(speed, .16);
  wind_chill = Math.round(wind_chill * 10) / 10;
  document.querySelector("#wind-chill").innerHTML = wind_chill + "&deg;F";
} 

else {
  document.querySelector("#wind-chill").innerHTML = "N/A";
}