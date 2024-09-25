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
  getForecast(response.data.city);
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
    minutes = `0${minutes}`;
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "4a3bb3b0f55704da4fec61c404ebo0t7";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
       <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            
            <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" />
          
            <div class="weather-forecast-temperature">
              <div class="weather-forecast-temperatures">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperatures">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div> 
          `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Johannesburg");
displayForecast();
