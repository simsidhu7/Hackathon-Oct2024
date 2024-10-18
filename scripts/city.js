
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

const cityForm = document.querySelector(".destination-form");

cityForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const inputCity = event.target.input.value;
  setBackgroundImage(inputCity);
  setWeatherData(inputCity);
});
