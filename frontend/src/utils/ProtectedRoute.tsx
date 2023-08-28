import { Navigate } from "react-router-dom";

interface IProtectedProps {
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute = ({ children }: IProtectedProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default ProtectedRoute;
