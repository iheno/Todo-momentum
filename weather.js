const weather = document.querySelector(".js-weather");

const API_KEY = "7c5566ff889af86f32eb30f65ad63fea";
const COORDS = 'coords';

function getWeather(lat, lng) {
  // 데이터를 얻는 방법은 간단하다 fetch라는 것을 사용하면 된다.
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response) {
    return response.json();
  }).then(function(json){
    // console.log(json);
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${Math.floor(temperature)}°
    ${place}`
  }); // then 이란 데이터가 완전히 들어온 다음 호출
}

// 좌표저장 
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 좌표를 가져오는데 성공했을때를 처리하는 함수.
function handleGeoSucces(position) {
  //console.log(position.coords.latitude);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
   /* latitude: latitude,
    longitude: longitude, --> */
    latitude,
    longitude
  }; 
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log('Cant access...!')
}

function askForCoords() {
  // sue navigator API
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if(loadedCords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCords);
    // console.log(parseCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();