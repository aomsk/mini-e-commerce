import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// interface IProtectedProps {
//   children: JSX.Element | JSX.Element[];
// }

const ProtectedRoute = () => {
  // const ProtectedRoute = ({ children }: IProtectedProps) => {
  const { user } = useAuthContext();
  const token = localStorage.getItem("token");
  // if (!user.token && !token) {
  //   return <Navigate to={"/"} replace />;
  // }
  // return children;
  if (!user.token && !token) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
