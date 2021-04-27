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

    document.querySelector('.city-location').innerText = `${name}, ${country}`;

    document.querySelector(
      '.icon-logo-1'
    ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    document.querySelector('.temp-value').innerHTML =
      Math.round(`${temp}`) + '°C';

    document.querySelector('.feels_value').innerHTML =
      Math.round(`${feels_like}`) + '°C';

    document.querySelector('.icon-1-description').innerHTML = `${description}`;

    document.querySelector('.icon-2-description').innerText = `${humidity}%`;

    document.querySelector('.icon-3-description').innerHTML =
      Math.round(`${speed}`) + 'km/h';
  },

  search: function () {
    this.fetchWeather(document.querySelector('.search-field').value);
  },
};

// BACKGROUND WEATHER CHANGE

let mainContent = document.querySelector('.main-container');

mainContent.style.backgroundImage =
  "url('https://source.unsplash.com/1600x900/?weather,sky')";

// / BUTTON TOGGLE OPERATION

document.querySelector('.toggle-circle').addEventListener('click', function () {
  this.classList.toggle('toggle-circle-active');
});

// let colorChange = () => {
//   document.querySelector('.weather-data').style.backgroundColor = 'red';
// };

// colorChange();

// DATE CHANGE OPERATION

const today = moment().format('LL');

document.querySelector('.current-date').innerHTML = today;

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

let iconChange = () => {
  weather.displayWeather(data.wind);
};
