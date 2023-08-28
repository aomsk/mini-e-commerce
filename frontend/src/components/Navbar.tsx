import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
// import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  // const [isLogin] = useState<boolean>(false);
  // const token = localStorage.getItem("token");
  const [token, setToken] = useState<string | null>();

  // const menus = [
  //   {
  //     name: "Home",
  //     path: "/",
  //   },
  //   {
  //     name: "Login",
  //     path: "/login",
  //   },
  //   {
  //     name: "Register",
  //     path: "/register",
  //   },
  // ];

  useEffect(() => {
    const local_token = localStorage.getItem("token");
    setToken(local_token);
  }, [token]);

  return (
    <nav>
      <div>
        <Link to={"/"} className="link">
          <h2>Mini Mini</h2>
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <Link className="link" to={"/"}>
              Home
            </Link>
            {!token ? (
              <Link className="link" to={"/login"}>
                Login
              </Link>
            ) : (
              ""
            )}
            {!token ? (
              <Link className="link" to={"/register"}>
                Register
              </Link>
            ) : (
              ""
            )}
            {token ? (
              <Link className="link" to={"/cart"}>
                Cart
              </Link>
            ) : (
              ""
            )}
          </li>
        </ul>
        {/* <ul>
          {menus.map((menu, index) => {
            return (
              <li key={index}>
                <Link to={menu.path} className="link">
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </ul> */}
      </div>
    </nav>
  );
};

export default Navbar;
