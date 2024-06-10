
# WeatherWise 
WeatherWise is a weather forecasting app that allows users to:

- Get the current weather and weather forecast for their current location.
- Search for and display weather information for any city.
- The app uses the OpenWeather API to fetch weather data.


## Features

**1. Current Location Weather:**

- Automatically fetches and displays the current weather for the user's location upon loading the app.
- Asks for location access permission with an alert.

**2. City Search:**

- Allows users to search for and display weather information by entering a city name.
- Includes a search bar with an input field and a search button.

**3. Current Weather and Forecast:**

- Displays current weather including temperature and description.
- Provides a 5-day weather forecast with date, temperature, and weather description.

**4. Error Handling:**

- Displays appropriate error messages if there's an issue fetching data.
- Handles errors gracefully and informs the user.

**5. Loading State:**

- Shows a loading message while fetching weather data.


## How to use

**1. Get an API Key:**

Sign up at OpenWeather to get an API key.

**2. Set Up the Project:**

- Create a new React project using `create-react-app`.
- Implement the components and logic as described in the project structure.

**3. Replace the API Key:**

- Replace 'Weather_API_KEY' in the code with your actual API key.

**4. Run the App:**

- Start your React app using `npm start` or `yarn start`.

**5. Usage:**

- The app will initially attempt to get the user's current location and display the weather for that location.
- Users can also search for weather information by entering a city name and clicking the search button.
## Project Structure

**1. App:**

- Manages the overall state of the application.
- Handles geolocation to get the user's current location.
- Includes the search bar and displays weather information.

**2. SearchBar:**

- Provides an input field and a search button for entering a city name.
- Triggers the search action to update the weather information.


**3. WeatherComponent:**

- Fetches and displays current weather and weather forecast data based on the city or coordinates.
- Manages the loading and error states during data fetching.
## Customization 

**CSS**
- Customize the styles by modifying the CSS classes used in the components.

## Demo

![image](https://github.com/Shahan-Khan/WeatherWise/assets/72437646/e8e38c89-a018-4fda-8a0e-34fa5bb4a79f)

