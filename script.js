const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherCard = document.getElementById('weatherResult');
const errorMsg = document.getElementById('errorMsg');

const locationElem = document.getElementById('location');
const iconElem = document.getElementById('icon');
const tempElem = document.getElementById('temperature');
const conditionElem = document.getElementById('condition');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');

const API_KEY = '948ff275c69544e89a6192632251006';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;

    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        locationElem.textContent = `${data.location.name}, ${data.location.country}`;
        iconElem.src = data.current.condition.icon;
        iconElem.alt = data.current.condition.text;
        tempElem.textContent = `Temperature: ${data.current.temp_c}°C`;
        conditionElem.textContent = data.current.condition.text;
        humidityElem.textContent = `Humidity: ${data.current.humidity}%`;
        windElem.textContent = `Wind: ${data.current.wind_kph} kph`;

        weatherCard.classList.remove('hidden');
        errorMsg.textContent = '';
    } catch (error) {
        weatherCard.classList.add('hidden');
        errorMsg.textContent = '⚠️ ' + error.message;
    }
});
