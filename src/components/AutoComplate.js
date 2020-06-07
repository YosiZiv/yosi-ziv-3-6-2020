import React from "react";

const AutoComplate = ({ searchResult, onClick }) => {
  console.log(searchResult);

  const cities = searchResult.length
    ? searchResult.map((item) => {
        const { key, city } = item;
        return (
          <li onClick={() => onClick(key)} key={key} id={key}>
            {city}
          </li>
        );
      })
    : null;

  return <div>{cities}</div>;
};
export default AutoComplate;
