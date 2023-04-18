import React, { useState } from "react";

import "./WeatherCard.css";
import backgrounds from "../backgrounds";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

const WeatherCard = (props) => {
  console.log(props.weatherCode);

  const styles = {
    backgroundImage: `url(${backgrounds[props.weatherCode]})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
  };
  const [moreInfo, setMoreInfo] = useState(false);
  const [initialWeather, setInitialWeather] = useState({});
  const [cardFront, setCardFront] = useState(true);
  const [currentIndx, setCurrentIndx] = useState(0);
  const hours = [
    "Select Hour",
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
  ];

  const date = new Date(props.date * 1000);
  const now = new Date();
  const dateOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const weatherHour = ["10:00am", "11:00am", "12:00am", "13:00pm"];
  const monthandDate = date.toLocaleDateString("ka-GE", dateOptions);
  const hour = now.getHours().toString();
  const minute = now.getMinutes().toString();
  const currTime = `${hour}:${minute.length > 1 ? minute : "0" + minute}`;

  const hideCardStyle = { color: "red" };

  const weatherByTime = function (indx) {
    console.log(indx);
    let id = props.id;
    let targetHour = hours[indx];
    let targetTime = new Date(props.date * 1000);
    targetTime.setHours(targetHour);
    targetTime.setMinutes(0);
    targetTime.setSeconds(0);
    targetTime.setMilliseconds(0);
    let timeStep = Math.floor(targetTime.getTime() / 1000);
    props.handleTimeClick(id, timeStep);
    setMoreInfo(true);

    //

    console.log(props.id);
  };

  const lessInfoClick = function () {
    props.onlessInfoClick(initialWeather);
    setCurrentIndx(0);
  };

  const nextHour = function () {
    const islastIndex = currentIndx === hours.length - 1;
    const newIndx = islastIndex ? 1 : currentIndx + 1;
    setCurrentIndx(newIndx);
    weatherByTime(newIndx);
  };

  const prevHour = function () {
    const isFirstIndex = currentIndx === 1;
    const newIndx = isFirstIndex ? hours.length - 1 : currentIndx - 1;
    setCurrentIndx(newIndx);
    weatherByTime(newIndx);
  };

  const MoreInfoClick = function (event) {
    props.onMoreInfoClick(props.id, props.date);
    setInitialWeather({
      id: props.id,
      time: props.date,
      descript: props.description,
      weatherCode: props.weatherCode,
      temp: props.temp,
      currentCard: true,
    });
  };

  const cardRotate = function () {
    setCardFront(!cardFront);
  };

  return (
    //{`card ${!props.current ? "card-inactive" : ""}`}
    <div className="card">
      <div className={`front ${!cardFront ? "" : "active"}`} style={styles}>
        <div className="location">{props.cityName}</div>
        <div className="more" onClick={MoreInfoClick}>
          <FontAwesomeIcon icon={faInfoCircle} onClick={cardRotate} />
        </div>
        <div className="weather">
          <h2>{monthandDate}</h2>
          {/* <img src={`icons/${props.weatherCode}.png`}></img> */}
          <h1>
            {Math.round(props.temp)}
            <sup>o</sup>
            <br></br>
          </h1>
          <h2>{props.description}</h2>
        </div>
      </div>
      <div className={`back ${!cardFront ? "active" : ""}`} style={styles}>
        <div className="description-back">{props.description}</div>
        <div className="go-back" onClick={cardRotate}>
          <FontAwesomeIcon icon={faCircleChevronLeft} onClick={lessInfoClick} />
        </div>
        <div className="weather-back">
          <h1>
            {Math.round(props.temp)}
            <sup>o</sup>
          </h1>
        </div>
        <ul className="forecast">
          <li>
            <div className="day">Real Feels</div>
            <div className="temperature">
              {props.realFeels}
              <sup>o</sup>
            </div>
          </li>
          <li>
            <div className="day">Wind</div>
            <div className="temperature">{props.wind}</div>
          </li>
          <li>
            <div className="day">Humidity</div>
            <div className="temperature">{props.humidity}</div>
          </li>
        </ul>

        <div className="timeline">
          <div className="timeline-slider">
            <div className="left-arrow" onClick={prevHour}>
              ❰
            </div>
            <div className="hour">{`${hours[currentIndx]} ${
              currentIndx <= 5 ? (currentIndx > 0 ? "AM" : "") : "PM"
            }`}</div>
            <div className="right-arrow" onClick={nextHour}>
              ❱
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
