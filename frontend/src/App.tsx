import { Routes, Route, Navigate } from "react-router-dom";

// component
import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";
import NotFound from "./components/NotFound";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
// protected routes and public routes
import ProtectedRoute from "./utils/ProtectedRoutes";
import AdminRoutes from "./utils/AdminRoutes";
// context
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const token = localStorage.getItem("token");
  const { currentUser } = useAuthContext();
  return (
    <>
      <Navbar />
      <Routes>
        // protected routes
        <Route element={<ProtectedRoute />} errorElement={<ErrorPage />}>
          <Route path="/cart" element={<Cart />} errorElement={<ErrorPage />} />
          <Route path="/profile" element={<Profile />} errorElement={<ErrorPage />} />
          // admin routes
          <Route element={<AdminRoutes />} errorElement={<ErrorPage />}>
            <Route path="/admin" element={<Admin />} errorElement={<ErrorPage />} />
          </Route>
        </Route>
        // public routes
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route
          path="/login"
          element={!token || currentUser === "public" ? <Login /> : <Navigate to="/" replace />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/register"
          element={!token || currentUser === "public" ? <Register /> : <Navigate to="/" replace />}
          errorElement={<ErrorPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
