const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const conditionDetail = document.querySelector(".condition-detail");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

let cityInput = "London";

// City quick selection event listener setup
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.textContent.trim();
    fetchWeatherData();
  });
});

// Input search submit hook setup
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value.trim().length === 0) {
    alert("Please type in a city name");
  } else {
    cityInput = search.value.trim();
    fetchWeatherData();
    search.value = "";
  }
});

// Converts date layout profile configurations dynamically
function formatWeatherDate(dateString) {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Safe date construction normalization
  const parsedDate = new Date(dateString.replace(/-/g, "/"));
  
  if (isNaN(parsedDate)) return dateString; // String structure parsing fallback
  
  return `${weekday[parsedDate.getDay()]} ${months[parsedDate.getMonth()]} ${parsedDate.getDate()}`;
}

function fetchWeatherData() {
  // Fade out structure animations active configuration trigger
  app.style.opacity = "0.3";

  // Use HTTPS to prevent browser origin mixed-content blocking policies
  fetch(`https://weatherapi.com{encodeURIComponent(cityInput)}&aqi=yes`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found or server error");
      }
      return response.json();
    })
    .then((data) => {
      // Inject standard values metrics
      temp.innerHTML = Math.round(data.current.temp_c) + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text.toUpperCase();
      if(conditionDetail) conditionDetail.innerHTML = data.current.condition.text;
      
      nameOutput.innerHTML = data.location.name.toUpperCase();
      
      // Split date text array index structures cleanly
      const localDateTime = data.location.localtime; // Format: "YYYY-MM-DD HH:MM"
      const timeParts = localDateTime.split(" ")[1];
      
      timeOutput.innerHTML = timeParts;
      dateOutput.innerHTML = formatWeatherDate(localDateTime.split(" ")[0]);

      // Direct Content Network Delivery address injection handling icon updates securely
      icon.src = "https:" + data.current.condition.icon;

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + " km/h";

      // Background rendering selection conditional algorithm structure logic
      let timeOfDay = data.current.is_day ? "day" : "night";
      const code = data.current.condition.code;

      // Handle custom local path matching parameters 
      if (code === 1000) {
        app.style.backgroundImage = `url('./weatherproject/weather1.jpg')`;
        btn.style.background = timeOfDay === "night" ? "#181e27" : "#e5ba92";
      } else if ([1003, 1006, 1009, 1030, 1069, 1087, 1135, 1273, 1276, 1279, 1282].includes(code)) {
        app.style.backgroundImage = `url('./weatherproject/weather3.jpg')`;
        btn.style.background = timeOfDay === "night" ? "#181e27" : "#fa6d1b";
      } else if ([1063, 1072, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246, 1249, 1252].includes(code)) {
        app.style.backgroundImage = `url('./weatherproject/weather2.jpg')`;
        btn.style.background = timeOfDay === "night" ? "#325c80" : "#647d75";
      } else {
        app.style.backgroundImage = `url('./weatherproject/images.jpeg')`;
        btn.style.background = timeOfDay === "night" ? "#1b1b1b" : "#4d72aa";
      }

      // Restore layout layout visibility metrics structure configurations
      app.style.opacity = "1";
    })
    .catch((error) => {
      console.error(error);
      alert(`Could not retrieve data for "${cityInput}". Please double-check spelling or network connection.`);
      // Bring opacity back to full view if search failures emerge 
      app.style.opacity = "1";
    });
}

// Kickstart deployment pipeline profiles instantly
fetchWeatherData();
