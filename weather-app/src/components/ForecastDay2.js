import React, { useState } from "react";
import { correctFormat } from "../helper/SortForecast";
import ForecastDayExtra2 from "./ForecastDayExtra2";

const ForecastDay2 = ({ day, date, hour }) => {
  const [displayExtra, setDisplayExtra] = useState(false);
  const toggleDisplay = () => {
    setDisplayExtra(!displayExtra);
  };
  const displayShowHide = displayExtra ? "Expand" : "Condense";

  return (
    <>
      <div className="weather-summary-container">
        <div className="weather-summary">
          <p>
            Date: <span className="bold">{correctFormat(date)}</span>
          </p>
          <p>Average Temperature:</p>
          <p>Average Humidity:</p>
          <p>Chance of rain:</p>
          <p>Chance of snow:</p>
        </div>
        <div className="weather-summary">
          <p>
            <span className="bold">{day.condition.text.toLowerCase()}</span>
          </p>
          <p>{day.avgtemp_c} &#8451;</p>
          <p>{day.avghumidity} g/kg</p>
          <p>{day.daily_chance_of_rain} &#37;</p>
          <p>{day.daily_chance_of_snow} &#37;</p>
        </div>
        <div id="expand-div">
          <span onClick={toggleDisplay}>{displayShowHide}</span>
        </div>
        {!displayExtra ? (
          <>
            <ForecastDayExtra2 hour={hour} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ForecastDay2;
