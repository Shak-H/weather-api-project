import { useState, useEffect } from "react";
import axios from "axios";
// import ForecastDay from '../components/ForecastDay'
import { trimSunrise, trimSunset } from "../helper/GetTime";
import ForecastDay2 from "../components/ForecastDay2";

const Forecast2 = () => {
  const [locations, setLocations] = useState("");
  const [formSubmit, setFormSubmit] = useState({
    location: "",
    language: "",
    days: "",
  });
  const [finalFormSubmit, setFinalFormSubmit] = useState({
    location: "",
    language: "eng",
    days: "",
  });
  const [currentCondition, setCurrentCondition] = useState("");
  const [forecastDay, setForecastDay] = useState("");
  const [forecasts, setForecasts] = useState([]);

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setFormSubmit({
      ...formSubmit,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFinalFormSubmit(formSubmit);
  };

  const handleFormReset = () => {
    setLocations("");
    setFormSubmit("");
    setCurrentCondition("");
  };

  useEffect(() => {
    console.log("reach");
    async function fetchLocation() {
      const config = {
        method: "get",
        url: `http://api.weatherapi.com/v1/forecast.json?key=8b928a9753d74262887160151212610&q=${finalFormSubmit.location}&days=${finalFormSubmit.days}&lang=${finalFormSubmit.language}`,
        headers: {
          api: "8b928a9753d74262887160151212610",
        },
      };
      try {
        console.log("reach.try");
        const response = await axios(config);
        console.log(response);
        const forecastDay = response.data.forecast.forecastday;
        setForecastDay(forecastDay[0]);
        setLocations(response.data.location);
        setCurrentCondition(response.data.current.condition.text);
        setForecasts(forecastDay);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchLocation();
  }, [finalFormSubmit]);
  return (
    <>
      <div className="forecast">
        {!locations ? (
          <div className="forecast-form">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder="Choose your location"
                  onChange={handleLocationChange}
                  name="location"
                  value={formSubmit.location}
                />
                <input
                  onChange={handleLocationChange}
                  value={formSubmit.days}
                  type="number"
                  name="days"
                  min="1"
                  max="3"
                />
              </div>
              <div className="forecast-submit">
                <input type="submit" value="Submit" onClick={handleSubmit} />
              </div>
            </form>
          </div>
        ) : (
          <div className="forecast-container">
            <div className="forecast-result">
              <p>
                The weather in <span className="bold">{locations.name}</span> is{" "}
                <span className="italic">{currentCondition.toLowerCase()}</span>{" "}
              </p>
              <p>
                Sunrise:{" "}
                <span className="bold">
                  {trimSunrise(forecastDay.astro.sunrise)}
                </span>
              </p>
              <p>
                Sunset:{" "}
                <span className="bold">
                  {trimSunset(forecastDay.astro.sunset)}
                </span>
              </p>
              <button onClick={handleFormReset}>Search another location</button>
            </div>
            <div className="forecast-extra">
              {forecasts.map((forecast) => (
                <ForecastDay2 key={forecast.date} {...forecast} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Forecast2;
