import React from "react";
import "../styles/navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar: React.FC = () => {
  const { user, logout } = useAuthContext();
  const token = localStorage.getItem("token");

  return (
    <nav>
      <div>
        <Link to={"/"}>
          <h2>Mini Mini</h2>
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          {user.token || token ? (
            <>
              <li>
                <NavLink to={"/cart"}>Cart</NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/register"}>Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
