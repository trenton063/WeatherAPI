let mainTemp = document.querySelector(".temp");


const lat = 37.0902;
const lng = 95.7129;

const weatherAPI = function () {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=51550f6ee61d0be1cff9a205feeaccbb`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      mainTemp.innerHTML = Math.round(data.main.temp - 273.15) * 1.8 + 32;
    });
};
weatherAPI();
