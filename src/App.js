import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherBox from "./components/WeatherBox";
import weatherDescription from "./weatherDescri";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [iconShow, seticontShow] = useState(true);
  const [genWeatherData, setGenWeatherData] = useState();
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [geoLocationAvailable, setGeoLocationAvailable] = useState(false);

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime&timezone=Europe%2FMoscow`;

  const geoLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=d21e817e10bf9f90a0e1e7896bf715e3`;

  let tempObject = [];

  const switchiconToBar = (data) => {
    seticontShow(data);
  };

  const handleSearch = (city) => {
    alert(`Hey Am am a city user Set: ${city}`);
    setCity(city);
  };

  console.log(weatherData);

  const formatWeatherData = function (data) {
    // console.log(data);
    if (data === undefined) return;
    tempObject.push({
      id: nanoid(),
      time: data.current_weather.time,
      temp: data.current_weather.temperature,
      weatherCode: data.current_weather.weathercode,
      descript: weatherDescription[data.current_weather.weathercode],
      currentCard: true,
    });
    for (let i = 1; i <= 4; i++) {
      tempObject.push({
        id: nanoid(),
        time: data.daily.time[i],
        temp: data.daily.temperature_2m_max[i],
        feelsLike: data.daily.apparent_temperature_max[i],
        weatherCode: data.daily.weathercode[i],
        descript: weatherDescription[data.daily.weathercode[i]],
      });
    }

    setWeatherData(tempObject);
  };

  const handleTimeClick = function (id, timeStemp, lessInfo) {
    let newObj = {};
    let elementIndex = genWeatherData.hourly.time.indexOf(timeStemp);
    newObj.key = nanoid();
    newObj.temp = genWeatherData.hourly.temperature_2m[elementIndex];
    newObj.time = genWeatherData.hourly.time[elementIndex];
    newObj.humidity = genWeatherData.hourly.relativehumidity_2m[elementIndex];
    newObj.feelsLike = genWeatherData.hourly.apparent_temperature[elementIndex];
    newObj.weatherCode = genWeatherData.hourly.weathercode[elementIndex];
    newObj.descript =
      weatherDescription[genWeatherData.hourly.weathercode[elementIndex]];
    newObj.wind = genWeatherData.hourly.windspeed_10m[elementIndex];
    newObj.currentCard = true;

    setWeatherData(
      weatherData.map((item) => {
        if (item.id === id) {
          return { id: item.id, ...newObj };
        } else {
          return item;
        }
      })
    );
  };
  console.log(genWeatherData);
  const getCityName = function (lat, long) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d21e817e10bf9f90a0e1e7896bf715e3&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setCityName(data.name));
  };

  const handleLessInfoClick = (data) => {
    setWeatherData(
      weatherData.map((item) => {
        if (item.id === data.id) {
          return { ...data };
        } else {
          return item;
        }
      })
    );
  };

  const handleMoreInfoClick = (id, timeStemp) => {
    let newObj = {};
    let elementIndex = genWeatherData.hourly.time.indexOf(timeStemp);
    newObj.humidity = genWeatherData.hourly.relativehumidity_2m[elementIndex];
    newObj.feelsLike = genWeatherData.hourly.apparent_temperature[elementIndex];
    newObj.wind = genWeatherData.hourly.windspeed_10m[elementIndex];

    setWeatherData(
      weatherData.map((item) => {
        if (item.id === id) {
          return {
            id: item.id,
            time: item.time,
            temp: item.temp,
            weatherCode: item.weatherCode,
            descript: item.descript,
            ...newObj,
          };
        } else {
          return item;
        }
      })
    );
  };

  React.useEffect(() => {
    if (navigator.geolocation) {
      setGeoLocationAvailable(true);
    }
  }, []);
  React.useEffect(() => {
    if (geoLocationAvailable) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getCityName(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("test");
      setLatitude(41.716667);
      setLongitude(44.783333);
      setCityName("Tbilisi");
    }
  }, [geoLocationAvailable]);

  console.log(latitude);
  console.log(longitude);

  React.useEffect(() => {
    if (longitude === "") return;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setGenWeatherData(data);
        formatWeatherData(data);
      });
  }, [longitude]);

  React.useEffect(() => {
    if (city === "") return;
    fetch(geoLocationUrl)
      .then((resposne) => resposne.json())
      .then((data) => {
        // console.log(data);
        setLatitude(data[0].lat);
        setLongitude(data[0].lon);
        setCityName(data[0].name);
      });
  }, [city]);

  // const generateWeatherTime = function (timeStemp) {
  //   let time = new Date(timeStemp * 1000);
  //   let hour = time.getHours();
  //   return `${hour}:00`;
  // };

  return (
    <div className="main--container">
      <div className="main-search_cont">
        <SearchBar handleSearch={handleSearch} />
      </div>

      <WeatherBox
        weatherData={weatherData}
        handleTimeClick={handleTimeClick}
        cityName={cityName}
        onlessInfoClick={handleLessInfoClick}
        onMoreInfoClick={handleMoreInfoClick}
      />
    </div>
  );
}

export default App;
