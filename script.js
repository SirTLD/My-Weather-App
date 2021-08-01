// USING GEOLOCATION

const apiKey = '&appid=730a4c8462e80f10f220f4ea42071822';
const apiPath = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiUnit = '&units=metric';

window.addEventListener('load', geolocationQuery);

function geolocationQuery() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
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

            let weatherDesc = `${description}`;

            document.querySelector(
              '.city-location'
            ).innerText = `${name}, ${country}`;

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

          // TOGGLE TEMPERATURE SWITCH

          let switchBtn = () => {
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
          };

          //  WEATHER ICON CHANGE

          let iconChange = () => {
            let iconShow = document.querySelector('.icon-logo-1');

            if (mainWeather.includes('Clouds')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-cloudy"></i>`;
            }

            if (mainWeather.includes('Rain')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-day-rain"></i>`;
            }

            if (mainWeather.includes('Snow')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-day-snow"></i>`;
            }

            if (mainWeather.includes('Clear')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-day-sunny"></i>`;
            }

            if (mainWeather.includes('Thunderstorm')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-thunderstorm"></i>`;
            }

            if (mainWeather.includes('Smoke')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-smoke"></i>`;
            }

            if (mainWeather.includes('Fog')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-fog"></i>`;
            }

            if (mainWeather.includes('Tornado')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-tornado"></i>`;
            }

            if (mainWeather.includes('Sand')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-sandstorm"></i>`;
            }

            if (mainWeather.includes('Dust')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-dust"></i>`;
            }

            if (mainWeather.includes('Ash')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-volcano"></i>`;
            }

            if (mainWeather.includes('Drizzle')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-showers"></i>`;
            }
            if (mainWeather.includes('Mist')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-rain-mix"></i>`;
            }
            if (mainWeather.includes('Haze')) {
              iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-day-haze"></i>`;
            }
          };

          iconChange();
        });

      switchBtn();
    });
  }

  // BACKGROUND CHANGE FOR SEARCH

  let weatherChange = () => {
    let mainContent = document.querySelector('.main-container');
    mainContent.style.backgroundSize = 'cover';
    if (`window.innerWidth > '1280px'`) {
      mainContent.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${
        document.querySelector('.search-field').value
      })`;
    } else {
      mainContent.style.backgroundImage = `url('https://source.unsplash.com/500x800/?${
        document.querySelector('.search-field').value
      }')`;
    }
  };
  weatherChange();
}

//USING SEARCH QUERIES

const SEARCH_PATH = `apiPath + 'London' + apiKey + apiUnit`;

async function getWeather() {
  const res = await fetch(SEARCH_PATH);
  const data = await res.json();
  weatherResult(data);
  console.log(weatherResult(data));
}

//TARGETING THE MAIN SECTION

// const mainContainer = document.getElementById('body-container');

// function weatherResult() {
//   // mainContainer.innerHTML = '';

//   // let mainBody = document.createElement('div');

//   // mainBody.classList.add('main-container-items');

//   const { name } = data;

//   const { icon, description, main } = data.weather[0];

//   const { temp, humidity, feels_like } = data.main;

//   const { speed } = data.wind;

//   const { country } = data.sys;

//   // mainBody.innerHTML = `

//   mainContainer.innerHTML = `

//   <div class="main-container-items">
//             <div class="search">
//                 <input class="search-field" type="text" placeholder="Enter City">
//                 <i class="fas fa-search"></i>
//             </div>

//             <div class="weather-data">

//                 <div class="weather-top-info">
//                     <p class="city-location">${(name, country)} </p>
//                     <p class="current-date">${currentDate()}</p>
//                 </div>

//                 <div class="weather-bottom-info">

//                     <div class="temp">

//                         <p class='temp-value'>${temp}</p>

//                         <p class='temp-feels'>Feels Like <span class="feels_value">${feels_like}</span></p>

//                     </div>

//                     <div class="temp-icons">

//                         <div class="temp-icons-top">

//                             <div class="icon icon-1">
//                                 <div class="icon-logo-1">

//                                     <i id='iconDisplay' class="wi wi-day-sunny"></i>
//                                 </div>

//                                 <div class="icon-description">
//                                     <h4 class="icon-1">Weather</h4>
//                                     <h3 class="icon-1-description">${description}</h3>
//                                 </div>
//                             </div>

//                             <div class="icon icon-2">
//                                 <div class="icon-logo-2">
//                                     <i class="wi wi-humidity"></i>
//                                 </div>
//                                 <div class="icon-description">
//                                     <h4 class="icon-2-title">Humidi4ty</h4>
//                                     <h3 class="icon-2-description">${humidity}</h3>
//                                 </div>
//                             </div>
//                         </div>

//                         <div class="temp-icons-bottom">

//                             <div class="icon icon-3">
//                                 <div class="icon-logo-3">
//                                     <i class="wi wi-cloudy-gusts"></i>
//                                 </div>
//                                 <div class="icon-description">
//                                     <h4 class="icon-3-title">Wind</h4>
//                                     <h3 class="icon-3-description">${speed} km/h</h3>
//                                 </div>
//                             </div>

//                             <div class="temp-toggle-container">
//                                 <p class='temp-units'><span>°C</span></p>
//                                 <div class="toggle-btn">
//                                     <div class="inner-circle">
//                                     </div>
//                                 </div>
//                                 <p class='temp-units'><span>°F</span></p>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//             </div>

//         `;

//   // mainContainer.appendChild(mainBody);
// }

// function currentDate() {
//   const today = moment().format('LL');
//   return today;
// }

// // const SEARCH_PATH = apiPath + city + apiKey + apiUnit;

// async function getWeather() {
//   const res = await fetch(SEARCH_PATH);
//   const data = await res.json();
// }

// USING SEARCH QUERIES

function getWeather(city) {
  fetch(apiPath + city + apiKey + apiUnit)
    .then((res) => res.json())
    .then((data) => {
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

      let weatherTitle = `${description}`;

      let temperatureValue = `${temp}`;

      let feels_like_temp = `${feels_like}`;

      let windSpeed = `${speed}`;

      let iconLogo = `${icon}`;

      let mainWeather = `${main}`;

      document.querySelector(
        '.city-location'
      ).innerText = `${name}, ${country}`;

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

      //TOGGLE TEMPERATURE SWITCH

      let switchBtn = () => {
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
      };

      switchBtn();

      //BACKGROUND CHANGE FOR SEARCH

      let weatherChange = () => {
        let mainContent = document.querySelector('.main-container');
        mainContent.style.backgroundSize = 'cover';
        if (`window.innerWidth > '1280px'`) {
          mainContent.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${
            document.querySelector('.search-field').value
          })`;
        } else {
          mainContent.style.backgroundImage = `url('https://source.unsplash.com/500x800/?${
            document.querySelector('.search-field').value
          }')`;
        }
      };
      weatherChange();

      //  WEATHER ICON CHANGE

      function iconChange() {
        let iconShow = document.querySelector('.icon-logo-1');

        if (mainWeather.includes('Clouds')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-cloudy"></i>`;
        }

        if (mainWeather.includes('Rain')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-day-rain"></i>`;
        }

        if (mainWeather.includes('Snow')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-day-snow"></i>`;
        }

        if (mainWeather.includes('Clear')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-day-sunny"></i>`;
        }

        if (mainWeather.includes('Thunderstorm')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-thunderstorm"></i>`;
        }

        if (mainWeather.includes('Smoke')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-smoke"></i>`;
        }

        if (mainWeather.includes('Fog')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-fog"></i>`;
        }

        if (mainWeather.includes('Tornado')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-tornado"></i>`;
        }

        if (mainWeather.includes('Sand')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-sandstorm"></i>`;
        }

        if (mainWeather.includes('Dust')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-dust"></i>`;
        }

        if (mainWeather.includes('Ash')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-volcano"></i>`;
        }

        if (mainWeather.includes('Drizzle')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-showers"></i>`;
        }
        if (mainWeather.includes('Mist')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-rain-mix"></i>`;
        }
        if (mainWeather.includes('Haze')) {
          iconShow.innerHTML = `<i id='iconDisplay'class="wi wi-day-haze"></i>`;
        }
      }

      iconChange();
    });
}

getWeather();

let searchCity = () => {
  getWeather(document.querySelector('.search-field').value);
};

//  SEARCH BAR OPERATION

document.querySelector('.fa-search').addEventListener('click', searchCity);

document
  .querySelector('.search-field')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      searchCity();
    }
  });

searchCity();

// GET THE DATE

const today = moment().format('LL');

document.querySelector('.current-date').innerHTML = today;
