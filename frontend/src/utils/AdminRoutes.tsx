/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AdminRoutes = () => {
  const token = localStorage.getItem("token");
  const decoded: any = jwtDecode(token as string);

  if (decoded.role !== "admin") {
    return (
      <div className="container" style={{ paddingTop: "10rem" }}>
        You do not access this page
      </div>
    );
  }
  return <Outlet />;
};

export default AdminRoutes;
