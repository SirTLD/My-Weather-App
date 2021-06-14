const apiKey = '&appid=730a4c8462e80f10f220f4ea42071822';
const apiPath = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiUnit = '&units=metric';

window.addEventListener('load', () => {
  let longitude;
  let latitude;
  let locationArea = document.querySelector('.city-location');

  let tempValue = document.querySelector('.temp-value');

  let tempFeels = document.querySelector('.feels_value');

  // let weatherMain = document.querySelector('.icon-1');

  let WeatherDescription = document.querySelector('.icon-1-description');

  let WeatherHumidity = document.querySelector('.icon-2-description');

  let windSpeed = document.querySelector('.icon-3-description');

  let weatherIcon = document.querySelector('.icon-logo-1');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const locationPath = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}${apiKey}${apiUnit}`;

      fetch(locationPath)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);

          const { name } = data;

          const { icon, description, main } = data.weather[0];

          const { temp, humidity, feels_like } = data.main;

          const { speed } = data.wind;

          const { country } = data.sys;

          // DOM ELEMENTS FROM API

          locationArea.innerText = `${name}, ${country}`;

          tempValue.innerHTML = Math.round(`${temp}`) + '°C';

          tempFeels.innerHTML = Math.round(`${feels_like}`) + '°C';

          // weatherMain.innerText = `${main}`;

          WeatherDescription.innerHTML = `${description}`;

          WeatherHumidity.innerText = `${humidity}%`;

          windSpeed.innerHTML = Math.round(`${speed}`) + 'km/h';

          weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        });
    });
  } else {
    document.querySelector('.city-location').innerText =
      'Search for a Location';
  }
});

// ---------------------------------

let weather = {
  apikey: '&appid=730a4c8462e80f10f220f4ea42071822',
  apiPath: 'http://api.openweathermap.org/data/2.5/weather?q=',
  apiUnit: '&units=metric',

  fetchWeather: function (city) {
    fetch(this.apiPath + city + this.apikey + this.apiUnit)
      .then((res) => res.json())
      .then((data) => {
        this.displayWeather(data);
      });
  },

  displayWeather: function (data) {
    let locationArea = document.querySelector('.city-location');

    let tempValue = document.querySelector('.temp-value');

    let tempFeels = document.querySelector('.feels_value');

    // let weatherMain = document.querySelector('.icon-1');

    let WeatherDescription = document.querySelector('.icon-1-description');

    let WeatherHumidity = document.querySelector('.icon-2-description');

    let windSpeed = document.querySelector('.icon-3-description');

    let weatherIcon = document.querySelector('.icon-logo-1');

    const { name } = data;

    const { icon, description, main } = data.weather[0];

    const { temp, humidity, feels_like } = data.main;

    const { speed } = data.wind;

    const { country } = data.sys;

    console.log(
      name,
      icon,
      description,
      main,
      temp,
      feels_like,
      humidity,
      speed,
      country
    );

    // DOM ELEMENTS FROM API

    locationArea.innerText = `${name}, ${country}`;

    tempValue.innerHTML = Math.round(`${temp}`) + '°C';

    tempFeels.innerHTML = Math.round(`${feels_like}`) + '°C';

    // weatherMain.innerText = `${main}`;

    WeatherDescription.innerHTML = `${description}`;

    WeatherHumidity.innerText = `${humidity}%`;

    windSpeed.innerHTML = Math.round(`${speed}`) + 'km/h';

    weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  },

  search: function () {
    this.fetchWeather(document.querySelector('.search-field').value);
  },
};

// ICON CHANGE

let iconChange = () => {};

// SEARCH BAR OPERATION

document.querySelector('.fa-search').addEventListener('click', function () {
  weather.search();
});

document
  .querySelector('.search-field')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });

// BACKGROUND CHANGE

let weatherChange = () => {
  let mainContent = document.querySelector('.main-container');

  mainContent.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${this.main} + weather')`;
};

weatherChange();

// -------------------------------------

// GET THE DATE

const today = moment().format('LL');

document.querySelector('.current-date').innerHTML = today;

// TOGGLE TEMPERATURE SWITCH

let switchContainer = document.querySelector('.toggle-btn');

switchContainer.addEventListener('click', () => {
  switchContainer.classList.toggle('active');

  // console.log(weather.displayWeather('tempValue'));

  console.log('click was done');
});
