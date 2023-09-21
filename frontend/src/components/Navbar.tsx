import React from "react";
import "../styles/navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar: React.FC = () => {
  const { logout, currentUser } = useAuthContext();

  const USER_TYPES = {
    PUBLIC_USER: "public",
    CUSTOMER_USER: "customer",
    ADMIN_USER: "admin",
  };

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
          {currentUser === USER_TYPES.ADMIN_USER && (
            <>
              <li>
                <NavLink to={"/admin"}>Admin</NavLink>
              </li>
            </>
          )}
          {currentUser === USER_TYPES.CUSTOMER_USER || currentUser === USER_TYPES.ADMIN_USER ? (
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
          ) : null}
          {currentUser === USER_TYPES.PUBLIC_USER && (
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
