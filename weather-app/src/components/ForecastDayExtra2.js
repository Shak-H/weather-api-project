import React from "react";

import {
  trimHourTime,
  wholeNumTemp,
  windDirection,
  windSpeed,
} from "../helper/GetTime";

const ForecastDayExtra2 = ({ hour }) => {
  console.log(hour);
  return (
    <>
      <div className="extra-weather-info-container">
        <div className="extra-weather-info">
          <span className="bold">Hour</span>
          <span>Temp &#8451;</span>
          <span>Rain &#37;</span>
          <span>Wind Dir.</span>
          <span>Speed mph.</span>
        </div>
        <div className="extra-weather-info-result">
          {hour.map((specificHour) => (
            <div
              className="extra-weather-info-column"
              key="{specificHour.time_epoch}"
            >
              <span className="bold">{trimHourTime(specificHour.time)}</span>
              <span>{wholeNumTemp(specificHour.temp_c)}</span>
              <span>{specificHour.chance_of_rain}</span>
              <span>{windDirection(specificHour.wind_dir)}</span>
              <span>{windSpeed(specificHour.wind_mph)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ForecastDayExtra2;
