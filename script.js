/**
 *
 * USING GEOLOCATION IF USER ALLOWS
 *
 */

const apiKey = '&appid=730a4c8462e80f10f220f4ea42071822';
const apiPath = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiUnit = '&units=metric';

function geolocationQuery() {
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
          function apiData() {
            console.log(data);
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

            let temperatureValue = `${temp}`;

            let feels_like_temp = `${feels_like}`;

            document.querySelector(
              '.city-location'
            ).innerText = `${name}, ${country}`;

            document.querySelector(
              '.icon-logo-1'
            ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            document.querySelector('.temp-value').innerHTML =
              Math.round(temperatureValue) + '°C';

            document.querySelector('.feels_value').innerHTML =
              Math.round(`${feels_like}`) + '°C';

            document.querySelector(
              '.icon-1-description'
            ).innerHTML = `${description}`;

            document.querySelector(
              '.icon-2-description'
            ).innerText = `${humidity}%`;

            document.querySelector('.icon-3-description').innerHTML =
              Math.round(`${speed}`) + 'km/h';
          }

          apiData();

          /*=============================================
  =            TOGGLE TEMPERATURE SWITCH        =
  =============================================*/
          switchBtn();
        });
    });
  }

  /*=============================================
  =            BACKGROUND CHANGE FOR GEOLOCATION         =
  =============================================*/

  let weatherChange = () => {
    let mainContent = document.querySelector('.main-container');
    mainContent.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${this.main} + weather')`;
  };

  weatherChange();
}

window.addEventListener('load', geolocationQuery);

/**
 *
 * USING SEARCH QUERIES
 *
 */

function getWeather(city) {
  const apiKey = '&appid=730a4c8462e80f10f220f4ea42071822';
  const apiPath = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const apiUnit = '&units=metric';

  fetch(apiPath + city + apiKey + apiUnit)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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

      let temperatureValue = `${temp}`;

      let feels_like_temp = `${feels_like}`;

      let windSpeed = `${speed}`;

      document.querySelector(
        '.city-location'
      ).innerText = `${name}, ${country}`;

      document.querySelector(
        '.icon-logo-1'
      ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      document.querySelector('.temp-value').innerHTML =
        Math.round(temperatureValue) + '°C';

      document.querySelector('.feels_value').innerHTML =
        Math.round(`${feels_like}`) + '°C';

      document.querySelector(
        '.icon-1-description'
      ).innerHTML = `${description}`;

      document.querySelector('.icon-2-description').innerText = `${humidity}%`;

      document.querySelector('.icon-3-description').innerHTML =
        Math.round(`${speed}`) + 'km/h';

      /*=============================================
  =            TOGGLE TEMPERATURE SWITCH        =
  =============================================*/

      function switchBtn() {
        let switchContainer = document.querySelector('.toggle-btn');

        function tempconverter() {
          let celsuis = Math.round(temperatureValue);
          let farenheit = celsuis * 1.8 + 32;
          let CelsuisFeels = Math.round(feels_like_temp);
          let farenheitFeels = CelsuisFeels * 1.8 + 32;

          document.querySelector('.temp-value').innerHTML =
            `${Math.round(farenheit)}` + '°F';
          document.querySelector('.feels_value').innerHTML =
            `${Math.round(farenheitFeels)}` + '°F';
        }

        function normalTemp() {
          let celsuis = Math.round(temperatureValue);
          let celsuisFeels = Math.round(feels_like_temp);
          let farenheit = celsuis * 1.8 + 32;

          document.querySelector('.temp-value').innerHTML =
            `${Math.round(celsuis)}` + '°C';
          document.querySelector('.feels_value').innerHTML =
            `${Math.round(celsuisFeels)}` + '°C';
        }

        function milePerHour() {
          let windSpeedValue = Math.round(windSpeed);
          let mphConversion = windSpeedValue / 0.621371;

          document.querySelector('.icon-3-description').innerHTML =
            `${Math.round(mphConversion)}` + 'mph';
        }

        function kiloPerHour() {
          let windSpeedValue = Math.round(windSpeed);
          document.querySelector('.icon-3-description').innerHTML =
            windSpeedValue + 'km/h';
        }

        switchContainer.addEventListener('click', () => {
          switchContainer.classList.toggle('active');
          if (switchContainer.className.includes('active')) {
            tempconverter();
            milePerHour();
          } else {
            normalTemp();
            kiloPerHour();
          }
        });
      }

      switchBtn();
    });
}

getWeather();

function searchCity() {
  getWeather(document.querySelector('.search-field').value);
}

searchCity();

/*=============================================
  =            SEARCH BAR OPERATION       =
  =============================================*/

document.querySelector('.fa-search').addEventListener('click', function () {
  weather.search();
});

document
  .querySelector('.search-field')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      searchCity();
    }
  });

/*=============================================
  =            GET THE DATE      =
  =============================================*/

const today = moment().format('LL');

document.querySelector('.current-date').innerHTML = today;
