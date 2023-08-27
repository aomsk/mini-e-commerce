import React from "react";
import "../styles/navbar.css";
// import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  // const [isLogin] = useState<boolean>(false);
  const menus = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Register",
      path: "/register",
    },
  ];

  return (
    <nav>
      <div>
        <Link to={"/"} className="link">
          <h2>Mini Mini</h2>
        </Link>
      </div>
      <div>
        <ul>
          {menus.map((menu, index) => (
            <li key={index}>
              <Link to={menu.path} className="link">
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
