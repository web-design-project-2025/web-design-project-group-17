// lines 2-33 inspired by https://www.youtube.com/watch?v=hmxOYyl28uw
'use strict'
const monthNames =  ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let dateObj = new Date();
let month = monthNames[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate() - 0;
let year = dateObj.getUTCFullYear();
let newdate = `${month}, ${day}, ${year}`

const app = document.querySelector('.app');

fetch('https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=702da32ca10fb56403a9e366886b6cad&units=metric')

.then(response => response.json())
.then(data => {
  console.log(data)

  app.insertAdjacentHTML('afterbegin', `
    <div class="titlebar">
    <p class= "date">${newdate}</p>
    <h4 class= "city">${data.name}</h4>
    <p class= "description">${data.weather[0].description}</p>
    </div>

    <div class= "temperature">
    <img src= "https://openweathermap.org/img/wn/${data.weather
      [0].icon}@2x.png" />
      <h2>${Math.round(data.main.temp)}°C</h2>
    </div>
    
    ` )
})