let mainTemp = document.querySelector(".temp");
let feelsLike = document.querySelector(".feels-like");
let minTemp = document.querySelector(".temp-min");
let maxTemp = document.querySelector(".temp-max");
// let sunrise = document.querySelector(".sunrise");
// let sunset = document.querySelector(".sunset");
let weatherDescription = document.querySelector(".weather-description");
let humidity = document.querySelector(".humidity");
let date = document.querySelector(".date");

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
      mainTemp.textContent = `${Math.round(
        (data.main.temp - 273.15) * 1.8 + 32
      )}°`;
      feelsLike.textContent = `feels like ${Math.round(
        (data.main.feels_like - 273.15) * 1.8 + 32
      )}°`;
      minTemp.textContent = `min temp ${Math.round(
        (data.main.temp_min - 273.15) * 1.8 + 32
      )}°`;
      maxTemp.textContent = `max temp ${Math.round(
        (data.main.temp_max - 273.15) * 1.8 + 32
      )}°`;
      weatherDescription.textContent = data.weather[0].main;
      humidity.textContent = `${data.main.humidity}%`;
      if (data.weather[0].main === "") {
        let img = createImage("img/img-1.webp");
      } else if (data.weather[0].main === "Clouds") {
        let img = createImage("img/img-2.webp");
      } else if (data.weather[0].main === "scattered clouds") {
        let img = createImage("img/img-3.jpeg");
      } else if (data.weather[0].main === "broken clouds") {
        let img = createImage("img/img-4.jpeg");
      } else if (data.weather[0].main === "shower rain") {
        let img = createImage("img/img-5.jpeg");
      } else if (data.weather[0].main === "rain") {
        let img = createImage("img/img-6.jpeg");
      } else if (data.weather[0].main === "thunderstorm") {
        let img = createImage("img/img-7.webp");
      } else if (data.weather[0].main === "snow") {
        let img = createImage("img/img-8.jpeg");
      } else if (data.weather[0].main === "mist") {
        let img = createImage("img/img-9.jpeg");
      }
    })
    .then(function () {
      const d = new Date();
      d.getTime();
      date.textContent = `${
        d.getMonth() + 1
      }/${d.getDate()}/${d.getFullYear()}`;
    });
  // .then((test) => {
  //   console.log('g');
  // })
};

weatherAPI();
