import React, { useState } from "react";
import "./SearchBar.css";
import searchIcon from "../images/search-interface-symbol_54481.png";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="search-box">
      <input
        id="search"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button className="search-btn" onClick={handleSearch}>
        <img
          src={searchIcon}
          style={{ height: "20px", width: "20px" }}
          alt="search"
        />
      </button>
    </div>
  );
};

export default SearchBar;
