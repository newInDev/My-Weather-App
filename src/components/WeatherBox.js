import React, { useEffect, useState } from "react";
import "./WeatherBox.css";
import { useRef } from "react";

import WeatherCard from "./WeatherCard";
import { motion } from "framer-motion";
import { useReducer } from "react";

const WeatherBox = (props) => {
  const [smalScreen, setSmallScreen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [currIndex, setCurrIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);

  useEffect(() => {
    const handleResizer = function () {
      if (window.innerWidth === 700) {
        setWidth(window.innerWidth);
      }
    };

    window.addEventListener("resize", handleResizer);
    return () => window.removeEventListener("resize", handleResizer);
  }, []);

  return (
    <motion.div
      className="weatherBox-cont"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, delay: 0.5 }}
    >
      {props.weatherData ? (
        props.weatherData.map((item, indx) => {
          const currentCard = indx === currIndex;
          if (item === undefined) {
            return <h1>Please Enter location</h1>;
          } else {
            return (
              <WeatherCard
                date={item.time}
                temp={item.temp}
                realFeels={item.feelsLike}
                humidity={item.humidity}
                wind={item.wind}
                description={item.descript}
                weatherCode={item.weatherCode}
                currentCard={item.currentCard}
                key={item.id}
                id={item.id}
                handleTimeClick={props.handleTimeClick}
                cityName={props.cityName}
                onlessInfoClick={props.onlessInfoClick}
                onMoreInfoClick={props.onMoreInfoClick}
                // current={currentCard}
              />
            );
          }
        })
      ) : (
        <h1>Please Enter Location</h1>
      )}
    </motion.div>
  );
};

export default WeatherBox;
