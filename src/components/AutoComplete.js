import React from "react";

const AutoComplete = ({ searchResult, onClick }) => {
  const cities = searchResult.length
    ? searchResult.map((item) => {
        const { key, city } = item;
        return (
          <li onClick={() => onClick(key, city)} key={key} id={key}>
            {city}
          </li>
        );
      })
    : null;

  return <div>{cities}</div>;
};
export default AutoComplete;
