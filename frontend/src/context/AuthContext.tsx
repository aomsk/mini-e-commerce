/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, redirect } from "react-router-dom";
import { message } from "antd";
import jwtDecode from "jwt-decode";
interface IProps {
  children: JSX.Element | JSX.Element[];
}

interface IUser {
  email: string;
  token: string;
}

interface IAuthContext {
  user: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  currentUser: string;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = ({ children }: IProps) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem("user") as string) || {
      email: "",
      token: "",
    }
  );
  const [currentUser, setCurrentUser] = useState<string>("public");

  useEffect(() => {
    console.log("user : ", user);
    if (user?.token) {
      const decoded: any = jwtDecode((user as IUser)?.token);
      if (decoded.role === "admin") {
        setCurrentUser("admin");
      } else {
        setCurrentUser("customer");
      }
    }
  }, [user]);

  // login
  const login = async (email: string, password: string) => {
    await axios
      .post("http://localhost:3000/api/login", { email, password })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          navigate("/");
          messageApi.open({
            type: "success",
            content: "Welcome to MiniMini Store login success",
          });
          localStorage.setItem("token", response.data.user.token);
          localStorage.setItem("email", response.data.user.email);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      })
      .catch((error) => {
        console.log("error: ", error.message);
        if (error.response) {
          messageApi.open({
            type: "error",
            content: error.response.data.message,
          });
          return;
        }
        messageApi.open({
          type: "error",
          content: error.message,
        });
      });
  };

  // logout
  const logout = () => {
    setUser({
      email: "",
      token: "",
    });
    localStorage.clear();
    setCurrentUser("public");
    messageApi.open({
      type: "success",
      content: "logout success GoodBye 👋",
    });
    return redirect("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, currentUser }}>
      <>
        {contextHolder}
        {children}
      </>
    </AuthContext.Provider>
  );
};
