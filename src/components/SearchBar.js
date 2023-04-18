import React, { useState } from "react";
import "./SearchBar.css";
import { motion } from "framer-motion";

const SearchBar = (props) => {
  const catchSavevalue = function (event) {
    if (event.key === "Enter" || event.key === "Go" || event.key === "Search") {
      props.handleSearch(event.target.value);
    }
  };

  return (
    <motion.div
      className="searchbar-cont"
      initial={{ width: `${10}%`, visibility: "hidden" }}
      animate={{ width: `${35}%`, visibility: "visible" }}
      transition={{ type: "spring", delay: 0.5, duration: 3 }}
      onKeyUp={catchSavevalue}
    >
      <input type="text" placeholder="Enter Location" />
    </motion.div>
  );
};

export default SearchBar;
