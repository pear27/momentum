const API_KEY = "6cdc3d8f52c1a52d8f0d30a4b1a5a5d0";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");

            const weatherIconCode = data.weather[0].icon;
            const weatherImg = document.createElement("img");
            weatherImg.src = `icons/weather_icons/${weatherIconCode}.png`;

            weather.innerText = `${parseInt(data.main.temp)}°`;
            city.innerText = data.name;
            document.querySelector("#weather").appendChild(weatherImg);
        });
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);