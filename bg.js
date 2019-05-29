const body = document.querySelector("body");

const IMG_NUMBER = 6;

function handleImgLoad() {
  console.log('finished loading');
}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `background/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
  image.addEventListener("loadend", handleImgLoad); // if you loading from API use this
}

function genRandome() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
} 

function init() {
  const randomNumber = genRandome();
  paintImage(randomNumber);
}

init();  