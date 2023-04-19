import React, { useState } from "react";
import "./SearchBar.css";
import { motion } from "framer-motion";

const SearchBar = (props) => {
  const [findLocation, setFindLocation] = useState("");
  const catchSavevalue = function (event) {
    console.log(event.keyCode);
    if (
      event.key === "Enter" ||
      event.key === "Go" ||
      event.key === "Search" ||
      event.keyCode === 13
    ) {
      event.preventDefault();
      alert(event.target.value);
      props.handleSearch(event.target.value);
    }
  };

  // const handleSubmit = () => {
  //   // if (event.keyCode === 13 || event.which === 13) {
  //   //   event.preventDefault();

  //   // }
  //   alert("Hey");
  //   props.handleSearch(findLocation);
  // };

  return (
    <motion.div
      className="searchbar-cont"
      initial={{ width: `${10}%`, visibility: "hidden" }}
      animate={{ width: `${35}%`, visibility: "visible" }}
      transition={{ type: "spring", delay: 0.5, duration: 3 }}
      onKeyUp={catchSavevalue}
      onSubmit={catchSavevalue}
    >
      <input
        type="text"
        placeholder="Enter Location"
        onChange={(e) => setFindLocation(e.target.value)}
      />
    </motion.div>
  );
};

export default SearchBar;
