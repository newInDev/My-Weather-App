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

  // const nextCard = () => {
  //   let newIndx = currIndex >= 4 ? 0 : currIndex + 1;
  //   setCurrIndex(newIndx);
  // };

  // const prevCard = () => {
  //   let newIndx = currIndex === 0 ? 4 : currIndex - 1;
  //   setCurrIndex(newIndx);
  // };

  // const handleTouchStart = (event) => {
  //   console.log(event.touches[0].clientX);
  //   setStartX(event.touches[0].clientX);
  // };

  // const handleTouchMove = (event) => {
  //   console.log(event.touches[0].clientX);
  //   setEndX(event.touches[0].clientX);
  // };

  // const handleToucheEnd = (event) => {
  //   const threshold = 50;
  //   console.log(`Start X: ${startX}`);
  //   console.log(endX);
  //   if (
  //     startX !== null &&
  //     endX !== null &&
  //     Math.abs(endX - startX) > threshold
  //   ) {
  //     if (endX < startX) {
  //       prevCard();
  //     } else {
  //       nextCard();
  //     }
  //   }
  // };

  return (
    <motion.div
      className="weatherBox-cont"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, delay: 0.5 }}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleToucheEnd}
    >
      {/* <div className="preview-card" onClick={prevCard}>
        ❰
      </div>
      <div className="next-card" onClick={nextCard}>
        ❱
      </div> */}
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
