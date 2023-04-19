import React, { useState } from "react";
import "./SearchBar.css";
import { motion } from "framer-motion";

const SearchBar = (props) => {
  const [findLocation, setFindLocation] = useState("");
  const catchSavevalue = function (event) {
    if (
      event.key === "Enter" ||
      event.key === "Go" ||
      event.key === "Search" ||
      event.keyCode === 13
    ) {
      event.preventDefault();
      props.handleSearch(event.target.value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      event.preventDefault();
      alert(findLocation);
      console.log(props.handleSearch);
      props.handleSearch(findLocation);
    }
  };

  return (
    <motion.div
      className="searchbar-cont"
      initial={{ width: `${10}%`, visibility: "hidden" }}
      animate={{ width: `${35}%`, visibility: "visible" }}
      transition={{ type: "spring", delay: 0.5, duration: 3 }}
      onKeyUp={catchSavevalue}
      onKeyDown={handleKeyDown}
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
