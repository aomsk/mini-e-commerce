import { Link } from "react-router-dom";
import "../styles/ErrorPage.css";

function NotFound() {
  return (
    <div className="container">
      <div className="errorPage_container">
        <h3>Page Not Found</h3>
        <h3>404</h3>
        <Link to={"/"}>back to home</Link>
      </div>
    </div>
  );
}

export default NotFound;
