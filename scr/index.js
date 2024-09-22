function refreshWeather(response) {
  let weatherTemperature = document.querySelector("#weather-temperature");
  let temperature = response.data.temperature.current;
  let cityWeather = document.querySelector("#cities");
  let descriptionWeather = document.querySelector("#description");
  let humidityWeather = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperatureIcon" />`;
  cityWeather.innerHTML = response.data.city;
  descriptionWeather.innerHTML = response.data.condition.description;
  humidityWeather.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  weatherTemperature.innerHTML = Math.round(temperature);
  weatherTime.innerHTML = formatDate(date);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0$(minutes)`;
  }

  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "4a3bb3b0f55704da4fec61c404ebo0t7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);
