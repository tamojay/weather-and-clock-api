window.addEventListener('load', () => {

  let lati;
  let longi;
  let location = document.querySelector('.location');
  let tempValue = document.querySelector('.temp-value');
  let tempDescription = document.querySelector('.temp-description');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lati = position.coords.latitude;
      longi = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=8a3bbbf125121ea742c8de3e44dbfe2a&units=metric`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          const temperature = data.main.temp;
          const desc = data.weather[0].description;
          const city = data.name;
          const country = data.sys.country;

          tempValue.textContent = Math.round(temperature);
          location.textContent = `${city}, ${country}`;
          tempDescription.textContent = desc;
        })
    })
  }
})

const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360);
}
setClock();
setInterval(setClock, 1000);
