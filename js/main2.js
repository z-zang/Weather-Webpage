
// Getting longitude and latitude
navigator.geolocation.getCurrentPosition(getCoords, geoError);
function getCoords(position){
  var crds = position.coords;

  var latitude = crds.latitude;
  var longitude = crds.longitude;

  // Alert latitude and longitude
  // alert(latitude + ", " + longitude);

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

    // Adding info into divs by ID
    document.getElementById('city').innerHTML += response.name;
    document.getElementById('country').innerHTML += response.sys.country;
    document.getElementById('temp').innerHTML += Math.round(response.main.temp) + ' celsius';
    document.getElementById('detail').innerHTML += response.weather[0].main;

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
