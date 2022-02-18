# Weather API - GA Project 2

![gif](https://github.com/Shak-H/weather-api-project/blob/master/weather-app-gif.gif)

## TABLE OF CONTENTS

- [Overview](#overview)
  - [Brief](#brief)
  - [Technologies Used](#technologies)
  - [Getting Started](#getting-started)
- [Planning](#planning)
  - [The Weather API](#api)
  - [Pseudocode & Wireframing](#pseudocode)
- [Development](#development)
  - [Main Structure & API](#main)
  - [Forms](#forms)
  - [Styling](#styling)
- [Bugs & Known Errors](#bugs)
- [Future Improvements](#improvements)
- [Key Learnings](#learnings)

## <a name='overview'>OVERVIEW</a>

### <a name='brief'>BRIEF</a>

Our brief was to create a React app leveraging a public API.

### <a name='technologies'>TECHNOLOGIES USED</a>

- HTML5
- CSS/Sass
- JavaScript (ES6)
- React
- Axios
- Git / GitHub
- React-router
- Insomnia / Postman
- [Weather API](https://www.weatherapi.com/docs/)

### <a name='getting-started'>GETTING STARTED</a>

Clone or download this repository. 
In Terminal, run `yarn` at the project root to download any dependencies. 
In Terminal, run `yarn start` to start the server in your local environment.

## PLANNING

### <a name='api'>THE WEATHER API</a>

The first step in our project was to choose a public API to use with our React app. Yin-wai and I both felt picking an API that anyone could relate to was important. Then, seeing as we love nothing better in this country than to discuss the weather, an app where you could check what the weather is going to be like or has been like seemed perfect. After researching several different public API’s related to weather we settled on [Weather API](https://www.weatherapi.com/docs/).

Weather API provides different types of information relating to weather and geo data, such as Real-time weather, 14 days forecasts, historical weather, astronomy and Air Quality Data.

We started by using the Postman REST client to test the API and see how the data would be presented. This was our first project using an API so it took us a while to get to grips with the documentation and how to access the information we wanted to display. Weather API requires an API key, so we registered to receive this and started sending some test requests. We soon figured out the JSON formatting, here is an example of one of our GET requests. 

![image](https://user-images.githubusercontent.com/81522060/151801923-52445bc6-383a-430b-9e0e-a1a7296cc12e.png)

We only had 48 hours to build the app, and so decided to use just four of the requests provided; current weather, forecast, historical weather and Astronomy data. 

### <a name='pseudocode'>PSEUDOCODE & WIREFRAMING</a>

We worked together to sketch out some wireframes on paper to envision the HTML layout and decide what pages we need. We then drafted some pseudocode together for the main site elements to ensure we followed and understood the logic before we split the workload and started branching.

## <a name='development'>DEVELOPMENT</a>

### <a name='main'>MAIN STRUCTURE & API</a>

Now it was time to start writing the code. We decided to start by working together over Zoom and using VSCode’s LiveShare feature, so we could collaborate on the same file. We wanted to establish the main site structure together and get the API working with React. After creating the React app, we created functional components with a placeholder h2 element for all the pages. These were saved in a components folder to keep things organised.

With our page components defined and exported, we installed React Router to create routing in our main `App.js` file. We defined and returned the main HTML structure with `header`, `footer` and `main` elements, before wrapping the HTML in a `BrowserRouter` component and adding in Routes for each page, defining paths and components.

```

    <Router>
      <header>
        <Nav />
      </header>
      <body>
        <main>
          <Switch>
            <Route path="/forecast.json" component={Forecast} />
            <Route path="/history.json" component={History} />
            <Route path="/astronomy.json" component={Astronomy} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </body>
      <footer>
        <Footer />
      </footer>
    </Router>
    
```
### <a name='forms'>FORMS</a>

One of the great things about the Weather API, was it had lots of different request parameters so, rather than giving generic information on the weather, the user could tailor the request to give them the exact information they were looking for. Users visiting the site can select a location, a time, a set amount of days and even a language of their choice. The forms, allowing the user to select the information they wanted to see, were therefore a central part of our app.

We used React’s Effect Hook to allow the request to be tailored depending on the information put in by the user. We then opted to use Axios for HTTP requests, so we installed it to our dependencies before writing out our request. We wrote a GET request with Axios, where the URL would change depending on the data parameters selected by the user, and added an Authorization header for our API key. Axios automatically transforms JSON data so there was no need to parse the response, and we used dot notation to return just the required data nested in our response object.

```

  useEffect(() => {
    async function fetchLocation() {
      const config = {
        method: "get",
        url: `http://api.weatherapi.com/v1/forecast.json?key=8b928a9753d74262887160151212610&q=${finalFormSubmit.location}&days=1&aqi=yes&alerts=yes&lang=${finalFormSubmit.language}&hour=${finalFormSubmit.time}`,
        headers: { api: "8b928a9753d74262887160151212610" },
      };
      try {
        const response = await axios(config);
        const forecastDay = response.data.forecast.forecastday;
        const hour = forecastDay[0].hour;
        setTimeCondition(hour[0].condition.text);
        setForecast(forecastDay[0].day.condition.text);
        setLocations(response.data.location);
        setCurrentCondition(response.data.current.condition.text);
        setCurrentTemp(response.data.current.temp_c);
      } catch (err) {}
    }
    fetchLocation();
  }, [finalFormSubmit]);

```

We used React’s State Hook to store form data as an object. Each of our HTML form inputs contained an onChange event handler to update the data variable’s state object with the relevant value. We then used the information stored to change the request parameters in the URL with an `onSubmit` event handler. 

```

const [formSubmit, setFormSubmit] = useState({
    location: "",
    time: "15",
    language: "",
  });
  const [finalFormSubmit, setFinalFormSubmit] = useState({
    location: "",
    time: "",
    language: "eng",
  });

  const handleLocationChange = (event) => {
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
  };
  
```

To enable the user to select different times and languages we used the `select` Tag which creates a drop-down list of options. 

```

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
    <option value="eng">English</option>
    <option value="fi">Finnish</option>
    <option value="fr">French</option>

```

The code for the Home, History and Astronomy Page was quite similar, with the information the user can select the main thing that changed. The forecast page however, displayed a lot more information to the user and so we decided to use a ternary operator and an `onClick` event listener, to allow the user to select whether or not they could see the extra information. 

```

const ForecastDay = ({ day, date, hour }) => {
  const [displayExtra, setDisplayExtra] = useState(false);
  const toggleDisplay = () => {
    setDisplayExtra(!displayExtra);
  };
  const displayShowHide = displayExtra ? "Expand" : "Condense";

```

This extra information was stored in a separate component and then displayed depending on whether the user clicked to see it, we again used a ternary operator here. 

```

  <div id="expand-div">
    <span onClick={toggleDisplay}>{displayShowHide}</span>
  </div>
  {!displayExtra ? (
    <>
      <ForecastDayExtra hour={hour} />
    </>
  ) : (
    <></>
  )}
  </div>
    
   
```

### <a name='styling'>STYLING</a>

Since this was a Hackathon, we decided to keep the styling very simple as we knew we would not have much time to style. We learnt SASS the previous week on our course and were keen to use the extension in this project, particularly to keep things organised while working as a pair.

We created partial SASS files to modularize our CSS, making it easier to work collaboratively while keeping our code dry. We also used SASS variables, for colours we were reusing often, to keep our styling consistent.

## <a name='bugs'> BUGS & KNOWN ERRORS</a>

The main bug is around the information displayed to the user once the requests are made. When the user selects a different language, only the information that the API sends back is given in the chosen language.

![image](https://user-images.githubusercontent.com/81522060/151804264-c4252135-1f4f-448e-88fc-bf7b937738e9.png)

## <a name='improvements'>FUTURE IMPROVEMENTS</a>

This project was a Hackathon and as a result, the code is far from perfect. It could do with being refactored in places and there are many features we would have liked to add given more time.

I would have liked to have taken advantage of all the different request parameters and information given from the API, such as suggestions to the user depending on the weather, for example, advising the user to take an umbrella if it was forecast to rain. 

We weren’t left with much time for styling, and as a result we did not have time to make the site look as aesthetically pleasing as we would have liked or add in any responsive styling for mobile/tablet views. 

The main extra feature we wanted was to have the background image change dependent on the weather. We feel this would have greatly added to the user experience. 

## <a name='learnings'>KEY LEARNINGS</a>

The big learning from this came when we started to split the work up. We felt confident in the code that needed to be written for our MVP and so decided to work on some extra features before the MVP had been completed. We wanted to have the background change depending on the weather, i.e raining if it was raining etc. I worked on the MVP, while Yin-Wai worked on the extra feature. 

We underestimated the difficulty of this task, meaning after a full day (half of our allotted time) we realised we were unable to figure out how this extra feature would work. This meant not only that I ended writing a lot of the code used in the site myself, but that Yin-Wai was unable to put into practise things we had both learnt and so was unfair to him and a bad use of our limited time. 

This was my first project using React and was a great way to consolidate my understanding, particularly when it came to conditional rendering and React Hooks. This was also the first experience using Git and GitHub to work collaboratively, and I realised the importance of clear commit messages.

This project was also my first real experience of pair programming on a significant project. Yin-Wai and I really enjoyed working together and it was a great opportunity to learn different approaches from one another, and get some experience with LiveShare and git.

Finally, working with an external API and a plugin, I gained some really useful grounding in understanding and using documentation for external resources.

