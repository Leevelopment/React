import React, { useEffect, useState } from "react";

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "529a990ed60a3d2ba2e66df3d47a2809"; // Replace with your actual API key

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    };

    const handleGeolocationSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude);
    };

    const handleGeolocationError = (error) => {
      console.log("Error getting geolocation:", error);
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    } else {
      console.log("Geolocation is not supported");
    }
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, main, weather } = weatherData;

  if (!main || !weather) {
    return <div>Error: Unable to retrieve weather data.</div>;
  }

  return (
    <div>
      <h2>Weather in {name}</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Description: {weather[0].description}</p>
    </div>
  );
};

export default WeatherDisplay;
