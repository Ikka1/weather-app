function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes} `;
}
//the time is wrong if search other city.

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;

  celsiusHighTemperature = response.data.main.temp_max;
  document.querySelector("#highest-temp").innerHTML = Math.round(
    celsiusHighTemperature
  );
  celsiusLowTemperature = response.data.main.temp_min;
  document.querySelector("#lowest-temp").innerHTML = Math.round(
    celsiusLowTemperature
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "3f30641e59d7236006ebb9c1f85663e5";
  let apiUrl = `
    https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city").value;
  search(cityInputElement);
}

function searchLocation(position) {
  let apiKey = "3f30641e59d7236006ebb9c1f85663e5";
  let apiUrl = `
    https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElementLow = document.querySelector("#lowest-temp");
  let temperatureElementHigh = document.querySelector("#highest-temp");
  //remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperatureLow = (celsiusLowTemperature * 9) / 5 + 32;
  temperatureElementLow.innerHTML = Math.round(fahrenheiTemperatureLow);
  let fahrenheiTemperatureHigh = (celsiusHighTemperature * 9) / 5 + 32;
  temperatureElementHigh.innerHTML = Math.round(fahrenheiTemperatureHigh);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElementLow = document.querySelector("#lowest-temp");
  temperatureElementLow.innerHTML = Math.round(celsiusLowTemperature);
  let temperatureElementHigh = document.querySelector("#highest-temp");
  temperatureElementHigh.innerHTML = Math.round(celsiusHighTemperature);
}

let celsiusLowTemperature = null;

let searchForm = document.querySelector("#upper-level");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-low-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-low-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Perth");
