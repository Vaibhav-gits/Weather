import React, { useState } from 'react';
import './App.css';

const API_KEY = 'your_real_api_key'; // Replace with real API key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError(data.message || 'City not found.');
      }
    } catch (err) {
      setError('Failed to fetch weather data.');
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-container">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬 Wind: {weather.wind.speed} m/s</p>
          <p>☁️ Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
