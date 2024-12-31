import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./styles/global.css";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthWrapper } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import FoodDetail from "./pages/FoodDetail";
import Recommendations from "./pages/Recommendations";
import FavoriteFood from "./pages/FavoriteFood";
import CreateFoodPage from "./pages/CreateFood";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/foods/:id" element={<FoodDetail />} />
            <Route path="/recommendation" element={<Recommendations />} />
            <Route path="/favorite" element={<FavoriteFood />} />
            <Route path="create" element={<CreateFoodPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  </React.StrictMode>
);
