/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
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
  user: IUser;
  login: (email: string, password: string) => void;
  logout: () => void;
  currentUser: string;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = ({ children }: IProps) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState<IUser>({
    email: "",
    token: "",
  });
  const [currentUser, setCurrentUser] = useState<string>(localStorage.getItem("user_type") || "public");
  console.log("currentUser: ", currentUser);

  // login
  const login = async (email: string, password: string) => {
    await axios
      .post("http://localhost:3000/api/login", { email, password })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          const decoded: any = jwtDecode(response.data.user.token);
          console.log("decoded: ", decoded);
          if (decoded.role === "admin") {
            setCurrentUser("admin");
            localStorage.setItem("user_type", "admin");
          } else {
            setCurrentUser("customer");
            localStorage.setItem("user_type", "customer");
          }
          navigate("/");
          localStorage.setItem("token", response.data.user.token);
          localStorage.setItem("email", response.data.user.email);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        messageApi.open({
          type: "error",
          content: error.response.data.message,
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
