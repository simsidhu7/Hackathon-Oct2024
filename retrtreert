const apiKey = "97357709bb540ca08b01dee90fb5fa83";

class WeatherApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  }

  async getWeather(city) {
    try {
      const response = await axios.get(
        `${this.baseUrl}?q=${city}&appid=${this.apiKey}`
      );
      return {
        main: response.data.main,
        weather: response.data.weather,
      };
    } catch (error) {
      console.error(error);
    }
  }
}

const currentWeather = new WeatherApi(apiKey);

export async function setWeatherData(city) {
  const weatherData = await currentWeather.getWeather(city);
  if (weatherData) {
    const weatherCard = createWeatherCard(weatherData);
    const weatherEl = document.querySelector(".weather-container");
    weatherEl.appendChild(weatherCard);
  }
}

function createWeatherCard(weatherData) {
  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather__card");

  const weatherTemp = document.createElement("p");
  weatherTemp.classList.add("weather__temp");
  weatherTemp.innerText = weatherData.main.temp - 273;

  const weatherMaxTemp = document.createElement("p");
  weatherMaxTemp.classList.add("weather__max-temp");
  weatherMaxTemp.innerText = weatherData.main.temp_max - 273;

  const weatherMinTemp = document.createElement("p");
  weatherMinTemp.classList.add("weather__min-temp");
  weatherMinTemp.innerText = weatherData.main.temp_min - 273;

  const weatherDescription = document.createElement("p");
  weatherDescription.classList.add("weather__description");
  weatherDescription.innerText = weatherData.weather[0].description;

  weatherCard.appendChild(weatherTemp);
  weatherCard.appendChild(weatherMaxTemp);
  weatherCard.appendChild(weatherMinTemp);
  weatherCard.appendChild(weatherDescription);

  return weatherCard;
}
