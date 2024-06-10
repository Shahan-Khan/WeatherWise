import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherComponent from "./WeatherComponent";
import SearchBar from "./SearchBar";
import PulseLoader from "react-spinners/PulseLoader";
import Logo from "../images/weather_logo.png"

const App = () => {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [locationAccessRequested, setLocationAccessRequested] = useState(false);

  const handleSearch = (cityName) => {
    setCity(cityName);
    setCoordinates(null); // Clear coordinates when searching by city
  };

  useEffect(() => {
    if (!city && !locationAccessRequested) {
      alert(
        "This app needs access to your location to provide weather updates for your area."
      );
      setLocationAccessRequested(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching geolocation: ", error);
          alert(
            "Unable to access your location. Please search for a city instead."
          );
        }
      );
    }
  }, [city, locationAccessRequested]);

  return (
    <div className="container">
      <div className="header">
      <div className="branding">
        <img src={Logo} alt="Logo" width={"50px"} height={"50px"}/>
        <h2>WeatherWise</h2>
      </div>
        <SearchBar onSearch={handleSearch} />
      </div>
      {city || coordinates ? (
        <WeatherComponent city={city} coordinates={coordinates} />
      ) : (
        <div className="fetch-loc">
          Fetching location <PulseLoader color="#36d7b7" size={10} />
        </div>
      )}
    </div>
  );
};

export default App;
