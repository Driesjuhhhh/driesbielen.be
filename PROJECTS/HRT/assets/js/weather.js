let weather = {
  apiKey: "168a11ef11f76e58898408c28c50c75a",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey + "&lang=nl"
    )
      .then((response) => {
        if (!response.ok) {
          console.log(response)
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description, id } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".temp").innerText = temp   + "°C";


    // document.querySelector(".wind").innerText =
    //   "Wind snelheid: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");

    // Je wil iets doen als het weer clear is
    if (id == 800 || id == 801 || id == 802 || id == 803 || id == 804 ){
      document.querySelector(".text").innerText = "Tis droog! Rijden maar!"
    } else {
      document.querySelector(".text").innerText = "Jammer van de regen... We zijn dicht!"
    }

  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

weather.fetchWeather("Houthalen");
