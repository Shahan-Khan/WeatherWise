import React, { useEffect, useState } from "react";
import { Weather_API_KEY } from "./api";
import "./WeatherComponent.css";
import "./SearchBar";
import BeatLoader from "react-spinners/BeatLoader";
// const WeatherComponent = ({ city }) => {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [weatherForecast, setWeatherForecast] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const apiKey = Weather_API_KEY;

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       if (!city) return;

//       setLoading(true);
//       setError(null);

//       try {
//         // Fetch current weather
//         const currentWeatherResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
//         );
//         const currentWeatherData = await currentWeatherResponse.json();

//         // Fetch weather forecast
//         const forecastResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=37&appid=${apiKey}&units=metric`
//         );
//         const forecastData = await forecastResponse.json();

//         // Set the fetched data to state
//         setCurrentWeather(currentWeatherData);
//         setWeatherForecast(forecastData);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchWeatherData();
//   }, [city, apiKey]);

//   if (loading) {
//     return <div className="load-msg">Loading...</div>;
//   }

//   if (error) {
//     return <div className="load-msg">Error: {error.message}</div>;
//   }

const WeatherComponent = ({ city, coordinates }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = Weather_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      let weatherUrl = "";
      let forecastUrl = "";

      if (city) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
      } else if (coordinates) {
        const { latitude, longitude } = coordinates;
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      }

      if (!weatherUrl) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch current weather
        const currentWeatherResponse = await fetch(weatherUrl);
        const currentWeatherData = await currentWeatherResponse.json();

        // Fetch weather forecast
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Set the fetched data to state
        setCurrentWeather(currentWeatherData);
        setWeatherForecast(forecastData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, coordinates, apiKey]);

  if (loading) {
    return <div ><BeatLoader color="#36d7b7" /></div>;
  }

  if (error) {
    return <div className="load-msg">Error: {error.message}</div>;
  }

  const nextFiveDays = [4, 12, 20, 28, 36];
  const forecastList = nextFiveDays.map((index) => ({
    dt_txt: weatherForecast.list[index].dt_txt,
    temp_min: weatherForecast.list[index].main.temp_min,
    temp_max: weatherForecast.list[index].main.temp_max,
    weather_discription: weatherForecast.list[index].weather[0].description,
    img_url: `https://openweathermap.org/img/wn/${weatherForecast.list[index].weather[0].icon}@2x.png`,
  }));
  const dates = forecastList.map((item) => {
    return item.dt_txt.split(" ");
  });
  const date = dates.map((item) => {
    return item[0].split("-");
  });
  const month = date.map((item) => {
    return item[1];
  });
  const day = date.map((item) => {
    return item[2];
  });

  return (
    <div className="weatherHolder">
      <div className="weather-details">
        <div className="top">
          <div>
            <p className="city">{currentWeather.name}</p>
            <p className="weather-description">
              {currentWeather.weather[0].description}
            </p>
          </div>
          <img
            alt="weather-icon"
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
          />
        </div>
        <div className="bottom">
          <p className="temperature">
            {Math.round(currentWeather.main.temp)}°C
          </p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Details</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(currentWeather.main.feels_like)}°C
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">
                {currentWeather.wind.speed} m/s
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">
                {currentWeather.main.humidity}%
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">
                {currentWeather.main.pressure} hPa
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* forecast-weather details */}
      <div className="weather-forcast">
        {/* <SearchBar /> */}
        <div className="forcast-cards">
          <div>
            <h4>
              {day[0]}/{month[0]}
            </h4>
            <img src={forecastList[0].img_url} alt="" />
            <p>{forecastList[0].weather_discription}</p>
            <p>
              {forecastList[0].temp_min}/{forecastList[0].temp_max}°C
            </p>
          </div>
          <div>
            <h4>
              {day[1]}/{month[1]}
            </h4>
            <img src={forecastList[1].img_url} alt="" />
            <p>{forecastList[1].weather_discription}</p>
            <p>
              {forecastList[1].temp_min}/{forecastList[1].temp_max}°C
            </p>
          </div>
          <div>
            <h4>
              {day[2]}/{month[2]}
            </h4>
            <img src={forecastList[2].img_url} alt="" />
            <p>{forecastList[2].weather_discription}</p>
            <p>
              {forecastList[2].temp_min}/{forecastList[2].temp_max}°C
            </p>
          </div>
          <div>
            <h4>
              {day[3]}/{month[3]}
            </h4>
            <img src={forecastList[3].img_url} alt="" />
            <p>{forecastList[3].weather_discription}</p>
            <p>
              {forecastList[3].temp_min}/{forecastList[3].temp_max}°C
            </p>
          </div>
          <div>
            <h4>
              {day[4]}/{month[4]}
            </h4>
            <img src={forecastList[4].img_url} alt="" />
            <p>{forecastList[4].weather_discription}</p>
            <p>
              {forecastList[4].temp_min}/{forecastList[4].temp_max}°C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
