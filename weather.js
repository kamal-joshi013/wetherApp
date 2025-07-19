//accessing  the html element
const inputSearch = document.getElementById("inputSearch");
const searchButton = document.getElementById("searchButton");
const cityName = document.querySelector("#cityName");
const weatherIcon = document.getElementById("weatherImg");
const description = document.querySelector("#dec");
const tempDegree = document.querySelector("#tempDegree");
const humidityDetails = document.querySelector("#humidityp");
const windSpeed = document.querySelector("#wind");
async function getCityName(city, lat, lon) {
  const apiKey = "ffc2c8eb2df5bcf623009a47ec130a65";
  const url = city
    ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
       
      document.getElementById("loadingSpinner").style.display = "block"

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City not found: ${response.status}`);
    }
    const data = await response.json();
    document.getElementById("loadingSpinner").style.display = "none";
    const location = data.name;
    cityName.innerText = location;
    const weatherDescription = data.weather[0].description;
    description.innerHTML = weatherDescription;
    const weatherImg = data.weather[0].main;
    const temp = data.main.temp;
    tempDegree.innerText = `${temp}℃`;
    const humidity = data.main.humidity;
    humidityDetails.innerText = `${humidity}%`;
    const wind = data.wind.speed;
    windSpeed.innerText = `${wind}km/h`;

    handleWeatherMain(weatherImg);
  } catch (error) {
    console.error("Error:", error);
    
    // Redirect to error page
    window.location.href = "error.html";
  }
}

function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          getCityName(null, lat, lon);
        },
        (error) => {
          console.error("Geolocation error:", error);
          getCityName("Delhi"); 
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
      getCityName("Delhi"); 
    }
  }
  
  // Call function to get user location when page loads
  window.onload = getUserLocation;

function searchCity(event) {
  event.preventDefault();
  const city = inputSearch.value.trim().toLowerCase();
  console.log(city);

  if (city) {
    getCityName(city, null, null);
    inputSearch.value = "";
  }
}

// Event listener for Enter key press
inputSearch.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchCity(event);
  }
});

// Event listener for search button click
searchButton.addEventListener("click", searchCity);

document.getElementById("location").addEventListener("click", getUserLocation);

function handleWeatherMain(main) {
  switch (main) {
    case "Clear":
      weatherImg.src = "./ImagesForApp/clear.png";
      break;
    case "Clouds":
      weatherImg.src = "./ImagesForApp/clouds.png";
      break;
    case "Rain":
      weatherImg.src = "./ImagesForApp/rainy.png";
      break;
    case "Thunderstorm":
      weatherImg.src = "./ImagesForApp/Thunderstorm.webp";
      break;
    case "Snow":
      weatherImg.src = "./ImagesForApp/Snow.png";
      break;
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
      weatherImg.src = "./ImagesForApp/mist.webp";
      break;
    case "Squall":
      weatherImg.src = "./ImagesForApp/Squall.png";
      break;
    case "Tornado":
      weatherImg.src = "./ImagesForApp/tornado.png";
      break;
    default:
      weatherImg.src = "./ImagesForApp/deafultWeather.png";
      break;
  }
}


