async function getWeather() {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const apiKey = 'bdc36cc7c94120697fc34d6beda8e9b3'; // Replace with your OpenWeatherMap API key

    // Construct the API URL
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
    if (state) {
        url += `,${state}`;
    }
    url += `&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        // Display the weather
      document.getElementById('location').innerHTML = `📍 Weather in ${data.name}`;
        document.getElementById('temperature').innerHTML = `🌡️ Temp: ${data.main.temp}°C`;
        document.getElementById('humidity').innerHTML = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById('description').innerHTML = `☁️ Condition: ${data.weather[0].description}`;
    } catch (error) {
        document.getElementById('weather').innerHTML = `<p>${error.message}</p>`;
    }
}
