// making a js Clock 
// const clockContainer = document.querySelector(".js-clock")
// const clockTitle = clockContainer.querySelector("h1")

// More cleaner ->

const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function  getTime() {
const date = new Date(),
  minutes = date.getMinutes(),
  hours = date.getHours(),
  seconds = date.getSeconds();
    // second make looks like -> 01
  clockTitle.innerText = `${
    hours < 10 ? `0${hours}` : hours
  }:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
} 

function init() {
 getTime();
 setInterval(getTime, 1000); //setInterval :  시간 셋팅
}

init();