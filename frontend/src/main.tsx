import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

// component
import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";
import NotFound from "./components/NotFound";
// views
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
        <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
          errorElement={<ErrorPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
