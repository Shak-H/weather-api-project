import { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [locations, setLocations] = useState("");
  const [timeTemperature, setTimeTemperature] = useState("");
  const [timeCondition, setTimeCondition] = useState("");
  const [formSubmit, setFormSubmit] = useState({
    location: "",
    time: "15",
    language: "",
    date: "",
  });
  const [finalFormSubmit, setFinalFormSubmit] = useState({
    location: "",
    time: "",
    language: "eng",
    date: "",
  });

  const handleLocationChange = (event) => {
    console.log("reached");
    const { name, value } = event.target;
    setFormSubmit({
      ...formSubmit,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    console.log("formSubmitted");
    event.preventDefault();
    setFinalFormSubmit(formSubmit);
    console.log("finalFormSubmit.date");
    console.log(finalFormSubmit);
  };

  const handleFormReset = () => {
    setLocations("");
    setTimeTemperature("");
    setTimeCondition("");
    setFormSubmit("");
  };

  useEffect(() => {
    console.log("useEffect reached");
    async function fetchLocation() {
      const config = {
        method: "get",
        url: `http://api.weatherapi.com/v1/history.json?key=8b928a9753d74262887160151212610&q=${finalFormSubmit.location}&dt=${finalFormSubmit.date}&lang=${finalFormSubmit.language}&hour=${finalFormSubmit.time}`,
        headers: { api: "8b928a9753d74262887160151212610" },
      };
      try {
        const response = await axios(config);
        const forecastDay = response.data.forecast.forecastday;
        const hour = forecastDay[0].hour;
        console.log(forecastDay);
        console.log(response.data);
        setTimeCondition(hour[0].condition.text);
        setLocations(response.data.location);
        console.log(response.data);
        // console.log(locations)
        setTimeTemperature(hour[0].temp_c);
      } catch (err) {}
    }
    fetchLocation();
  }, [finalFormSubmit]);

  return (
    <>
      <div className="history">
        {!locations ? (
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder="Choose your location"
                  name="location"
                  value={formSubmit.location}
                  onChange={handleLocationChange}
                />
                <input
                  type="date"
                  name="date"
                  value={formSubmit.date}
                  onChange={handleLocationChange}
                />
                <select
                  name="time"
                  value={formSubmit.time}
                  placeholder="Choose your time"
                  onChange={handleLocationChange}
                >
                  <option value="01">1am</option>
                  <option value="02">2am</option>
                  <option value="03">3am</option>
                  <option value="04">4am</option>
                  <option value="05">5am</option>
                  <option value="06">6am</option>
                  <option value="07">7am</option>
                  <option value="08">8am</option>
                  <option value="09">9am</option>
                  <option value="10">10am</option>
                  <option value="11">11am</option>
                  <option value="12">12am</option>
                  <option value="13">1pm</option>
                  <option value="14">2pm</option>
                  <option value="15">3pm</option>
                  <option value="16">4pm</option>
                  <option value="17">5pm</option>
                  <option value="18">6pm</option>
                  <option value="19">7pm</option>
                  <option value="20">8pm</option>
                  <option value="21">9pm</option>
                  <option value="22">10pm</option>
                  <option value="23">11pm</option>
                  <option value="00">12pm</option>
                </select>
                <select
                  name="language"
                  value={formSubmit.language}
                  placeholder="Choose your language"
                  onChange={handleLocationChange}
                >
                  <option value="eng">English</option>
                  <option value="bn">Bengali</option>
                  <option value="bg">Bulgarian</option>
                  <option value="zh">Chinese Simplified</option>
                  <option value="zh_tw">Chinese Traditional</option>
                  <option value="cs">Czech</option>
                  <option value="da">Danish</option>
                  <option value="nl">Dutch</option>
                  <option value="fi">Finnish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="el">Greek</option>
                  <option value="hi">Hindi</option>
                  <option value="hu">Hungarian</option>
                  <option value="it">Italian</option>
                  <option value="ja">Japanese</option>
                  <option value="jv">Javanese</option>
                  <option value="ko">Korean</option>
                  <option value="zh_cmn">Mandarin</option>
                  <option value="mr">Marathi</option>
                  <option value="pl">Polish</option>
                  <option value="pt">Portuguese</option>
                  <option value="ro">Romanian</option>
                  <option value="ru">Russian</option>
                  <option value="sr">Serbian</option>
                  <option value="si">Sinhalese</option>
                  <option value="sk">Slovak</option>
                  <option value="es">Spanish</option>
                  <option value="sv">Swedish</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="tr">Turkish</option>
                  <option value="uk">Ukrainian</option>
                  <option value="ur">Urdu</option>
                  <option value="vi">Vietnamese</option>
                  <option value="zh_wuu">Wu(Shanghainese)</option>
                  <option value="zh_hsn">Xiang</option>
                  <option value="zh_yue">Yue(Cantonese)</option>
                  <option value="zu">Zulu</option>
                </select>
              </div>
              <div>
                <input type="submit" value="Submit" onClick={handleSubmit} />
              </div>
              <span>(Go back up to 7 days)</span>
            </form>
          </div>
        ) : (
          <div className="history-result">
            <p>
              In <span className="bold">{locations.name}</span>, on the{" "}
              <span className="bold">{formSubmit.date}</span>, at{" "}
              <span className="bold">{formSubmit.time}:00</span> the weather was{" "}
              <span className="italic">
                {timeCondition.toLocaleLowerCase()}
              </span>{" "}
              with a temperature of{" "}
              <span className="bold">{timeTemperature}</span> degree celsius.
            </p>
            <button onClick={handleFormReset}>Search another location</button>
          </div>
        )}
      </div>
    </>
  );
};

export default History;
