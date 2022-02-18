import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/forecast.json">Forecast</Link>
          </li>
          <li>
            <Link to="/history.json">Historical</Link>
          </li>
          <li>
            <Link to="/astronomy.json">Astronomy</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
