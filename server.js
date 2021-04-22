if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req, res) => {
  //api.openweathermap.org / data / 2.5 / forecast ? id = 524901 & appid={ ${ OPENWEATHER_API_KEY }}
  http: console.log(req.body);
});

app.listen(5500, () => {
  console.log('server is running');
});
