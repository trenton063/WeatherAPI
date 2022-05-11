let mainTemp = document.querySelector(".temp");

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
      mainTemp.innerHTML = Math.round(data.main.temp - 273.15) * 1.8 + 32;
    });
};

weatherAPI();
