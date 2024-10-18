const accessKey = "zS7kgfrMCvXUAF5nMrPb_RkQLMaG4gjVYvKwFsAdfpk";

class BackgroundImgApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.unsplash.com/search/photos";
  }

  async getCityImg(city) {
    try {
      const response = await axios.get(
        `${this.baseUrl}?query=${city}&client_id=${this.apiKey}`
      );
      const firstResult = response.data.results[0].urls.regular;
      return firstResult;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

const backgroundImg = new BackgroundImgApi(accessKey);

async function setBackgroundImage(city) {
  const imageUrl = await backgroundImg.getCityImg(city);

  console.log(imageUrl);
  const backgroundEl = document.querySelector("main");
  backgroundEl.classList.add("main__background");
  if (imageUrl) {
    backgroundEl.style.background = `url("${imageUrl}")`;
  } else {
    const backgroundUrl = "../background-image.jpg";
    backgroundEl.style.background = `url("${backgroundUrl}")`;
  }
}

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
    while (weatherEl.firstChild) {
      weatherEl.removeChild(weatherEl.firstChild);
    }
    
    weatherEl.appendChild(weatherCard);
  }
}

function createWeatherCard(weatherData) {
  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather__card");

  const weatherTemp = document.createElement("p");
  weatherTemp.classList.add("weather__temp");
  weatherTemp.innerText = "Temperature: " + Math.round(weatherData.main.temp - 273) + "° C";

  const weatherHumidity = document.createElement("p");
  weatherHumidity.classList.add("weather__max-temp");
  weatherHumidity.innerText = "Humidity: " + Math.round(weatherData.main.humidity) + "%";

  const weatherDescription = document.createElement("p");
  weatherDescription.classList.add("weather__description");
  weatherDescription.innerText = "Weather: " + weatherData.weather[0].description;

  weatherCard.appendChild(weatherTemp);
  weatherCard.appendChild(weatherHumidity);
  weatherCard.appendChild(weatherDescription);

  return weatherCard;
}

const cityForm = document.querySelector(".destination-form");

cityForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const inputCity = event.target.input.value;
  setBackgroundImage(inputCity);
  setWeatherData(inputCity);
});
