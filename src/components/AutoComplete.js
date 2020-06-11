import React from "react";
import "./auto-complete.css";
import { connect } from "react-redux";
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
const mapStateToProps = ({ weatherReducer: { searchResult } }) => {
  return {
    searchResult,
  };
};
export default connect(mapStateToProps, null)(AutoComplete);
