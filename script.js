const apiKey = "4c6d89189c71fd38ae9b0d0cc5f4f7bf";


function getWeather() {
  const city = document.getElementById("city").value.trim();

  if (city === "") {
    alert("Please enter city name");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        document.getElementById("result").innerHTML = "City not found ❌";
        return;
      }

        document.getElementById("result").innerHTML = `
    <h2>${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    <p style="font-size:22px;">${data.main.temp}°C</p>
    <p>${data.weather[0].description}</p>
    <p>💨 Wind: ${data.wind.speed} km/h</p>
    `;

    })
    .catch(error => {
      document.getElementById("result").innerHTML = "Something went wrong ❌";
      console.error(error);
    });
}

document.getElementById("city").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  document.querySelector(".theme-toggle").textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Load theme on refresh
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  document.querySelector(".theme-toggle").textContent = "☀️";
}


