//the dates in () is a parameter
function formatDate(dates) {
  let date = dates.getDate();
  let hours = dates.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dates.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = dates.getFullYear();

  let dayIndex = dates.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //We can put a: let day=days[dayIndex]; here so the below return can use ${day} only
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[dates.getMonth()];
  return `${days[dayIndex]},  ${date} ${month}, ${year}, ${hours}:${minutes} `;
}

//export data from API
function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#lowest-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

//below: go to look the city and give API data.
function search(city) {
  let apiKey = "3f30641e59d7236006ebb9c1f85663e5";
  let apiUrl = `
    https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Below: once bottom submit trigger to Serach & show the city value
function handleSubmit(event) {
  event.preventDefault();
  //-(then move becoz we furhter set a serch city)let apiKey = "3f30641e59d7236006ebb9c1f85663e5";
  //-(then move becoz we furhter set a serch city)let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //below make an API call to OpenWeather AIP to give the data,
  //-(then move becoz we furhter set a serch city)axios.get(apiUrl).then(displayWeatherCondition);
  let city = document.querySelector("#search-city").value;
  search(city);
}

//from navigator to feed the latidute & longitude, and further to displayWeatherCondition.
function searchLocation(position) {
  let apiKey = "3f30641e59d7236006ebb9c1f85663e5";
  let apiUrl = `
    https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
}

//below: action after current button hit. go navigator.geolocaton to find currentPosition
//and then go searchLocation function to feed the latidute & longitude, and further to displayWeatherCondition.
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//select the id=date line to replace.
let dateElement = document.querySelector("#date");
//set up to call current time
let currentTime = new Date();
//it will replace by formatDate function above and call this current time.
dateElement.innerHTML = formatDate(currentTime);

//Serach bar to show the city
let searchForm = document.querySelector("#upper-level");
searchForm.addEventListener("submit", handleSubmit);
//This to show the current city data on page
search("Perth");

//below is from currentbutton, go get the getCurrentLocation function
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
