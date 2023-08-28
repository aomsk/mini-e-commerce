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
// protected routes
import ProtectedRoute from "./utils/ProtectedRoutes";
// context
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />} errorElement={<ErrorPage />}>
          <Route path="/cart" element={<Cart />} errorElement={<ErrorPage />} />
        </Route>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} errorElement={<ErrorPage />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" replace />} errorElement={<ErrorPage />} />
        {/* <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
          errorElement={<ErrorPage />}
        />
        <Route path="*" element={<NotFound />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
