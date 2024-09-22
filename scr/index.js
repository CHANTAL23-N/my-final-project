function refreshWeather(response) {
  let weatherTemperature = document.querySelector("#weather-temperature");
  let temperature = response.data.temperature.current;
  let cityWeather = document.querySelector("#cities");

  cityWeather.innerHTML = response.data.city;

  weatherTemperature.innerHTML = Math.round(temperature);
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
