navigator.geolocation.getCurrentPosition(getCoords, geoError);

// window.addEventListener("load", navigator.geolocation.getCurrentPosition(getCoords, geoError), true);
window.addEventListener("load", getCoords, true);

function getCoords(pos){
  var crds = pos.coords;
  console.log(crds.latitude);
  var latitude = crds.latitude;
  var longitude = crds.longitude;

  getWeather(latitude, longitude);
}

function geoError(errorObj){ // takes one argument, error
  alert("Something went wrong?")

}

// Getting info from api, in json format, and then displaying it
function getWeather(latitude, longitude){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude, true);
  request.responseType = 'json';

  request.onload = function() {
  if (this.status >= 200 && this.status < 400) {

    // Success protocol
    var response = this.response;
    // TEST to see if json was fetched
    // document.getElementById('text').innerHTML += response;

    var celsius = Math.round(response.main.temp);

    // Adding info into divs by ID
    document.getElementById('city').innerHTML += response.name;
    document.getElementById('country').innerHTML += response.sys.country;
    document.getElementById('temp').innerHTML += celsius +
    ' <button class="btn btn-dark btn-override" onclick="toFahrenheit()">°C</button>';
    document.getElementById('detail').innerHTML += response.weather[0].main;

    changeIcon();

  } else {
    // Error protocol
    console.log('reached server but returned error');
  }
};

request.onerror = function() {
  console.log('connection error');
};

request.send();

}

function toFahrenheit() {
    var celsius = parseFloat(document.getElementById('temp').textContent.match(/\d+/g).map(Number));
    // console.log(celsius);
    var fahrenheit = Math.round((celsius * 9/5) + 32);
    document.getElementById('temp').innerHTML = 'Temperature: ' + fahrenheit + ' <button class="btn btn-dark btn-override" onclick="toCelsius()">°F</button>';
}

function toCelsius() {
  var fahrenheit = parseInt(document.getElementById('temp').textContent.match(/\d+/g).map(Number));
  // console.log(fahrenheit);
  var celsius = Math.round((fahrenheit - 32) /9 * 5);
  document.getElementById('temp').innerHTML = 'Temperature: ' + celsius + ' <button class="btn btn-dark btn-override" onclick="toFahrenheit()">°C</button>';
}


function changeIcon() {
  var weather = document.getElementById("detail").innerHTML;
  console.log(weather);
// only get the inserted HTML, OR: filter string

  switch (weather) {
    // var img1 = "<img src='/images/";
    // var img2 = ".png' class='icon-style'></img>"
    case "Detail: Drizzle":
      document.getElementById("weatherIcon").innerHTML = "<img src='/images/drizzle.png' class='icon-style'></img>";
      break;
    case "Detail: Clouds":
      document.getElementById("weatherIcon").innerHTML = "<img src='/images/cloudy.png' class='icon-style'></img>";
      break;
    case "Detail: Rain":
      document.getElementById("weatherIcon").innerHTML = "<img src='/images/rainy.png' class='icon-style'></img>";
      break;
    case "Detail: Snow":
      document.getElementById("weatherIcon").innerHTML = "<img src='/images/snowy.png' class='icon-style'></img>";
      break;
    case "Detail: Clear":
      document.getElementById("weatherIcon").innerHTML = "<img src='/images/sunny.png' class='icon-style'></img>";
      break;
    case "Detail: Thunderstorm":
      document.getElementById("weatherIcon").innerHTML = "<img src='/images/storm.png' class='icon-style'></img>";
      break;
    case "Detail: Mist":
      document.getElementById("weatherIcon").innerHTML = "<img src='/images/mist.png' class='icon-style'></img>";
      break;

    }

}
