import React from "react";
import "./auto-complete.css";
const AutoComplete = ({ searchResult, onClick }) => {
  const cities = searchResult.length
    ? searchResult.map((item) => {
        const { key, city } = item;
        return (
          <p onClick={() => onClick(key, city)} key={key} id={key}>
            {city}
          </p>
        );
      })
    : null;

  return <div className="auto-complete">{cities}</div>;
};
export default AutoComplete;
