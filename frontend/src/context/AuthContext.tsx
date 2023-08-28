import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

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
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider = ({ children }: IProps) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState<IUser>({
    email: "",
    token: "",
  });

  console.log("user: ", user);

  // login
  const login = async (email: string, password: string) => {
    await axios
      .post("http://localhost:3000/api/login", { email, password })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.user);
          setUser(response.data.user);
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
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        {contextHolder}
        {children}
      </>
    </AuthContext.Provider>
  );
};
