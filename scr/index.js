function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityWeather = document.querySelector("#cities");
  cityWeather.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);
