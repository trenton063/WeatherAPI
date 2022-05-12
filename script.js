let mainTemp = document.querySelector(".temp");
let feelsLike = document.querySelector(".feels-like");
let minTemp = document.querySelector(".temp-min");
let maxTemp = document.querySelector(".temp-max");
// let sunrise = document.querySelector(".sunrise");
// let sunset = document.querySelector(".sunset");
let weatherDescription = document.querySelector(".weather-description");
let humidity = document.querySelector(".humidity");

let currentImg;
const imgContainer = document.querySelector(".img");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const weatherAPI = function () {
  getPosition()
    .then((pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=51550f6ee61d0be1cff9a205feeaccbb`
      );
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      mainTemp.textContent = Math.round((data.main.temp - 273.15) * 1.8 + 32);
      feelsLike.textContent = Math.round(
        (data.main.feels_like - 273.15) * 1.8 + 32
      );
      minTemp.textContent = Math.round(
        (data.main.temp_min - 273.15) * 1.8 + 32
      );
      maxTemp.textContent = Math.round(
        (data.main.temp_max - 273.15) * 1.8 + 32
      );
      weatherDescription.textContent = data.weather[0].description;
      humidity.textContent = `${data.main.humidity}%`;
      if (data.weather[0].description === "clear sky") {
        let img = createImage("img/img-1.jpg");
      }
    })
  // .then((test) => {
  //   console.log('g');
  // })
};

weatherAPI();
