import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import History from "./pages/History";
import Nav from "./components/Nav";
import Astronomy from "./pages/Astronomy";
import "./App.css";
import Home2 from "./pages/Home2";
import Forecast2 from "./pages/Forecast2";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <header>
        <Nav />
      </header>
      <body>
        <main>
          <Switch>
            <Route path="/forecast.json" component={Forecast2} />
            <Route path="/history.json" component={History} />
            <Route path="/astronomy.json" component={Astronomy} />
            <Route path="/" component={Home2} />
          </Switch>
        </main>
      </body>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
