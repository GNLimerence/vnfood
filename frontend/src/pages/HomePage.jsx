import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import FoodCarousel from "../components/FoodCarousel";
import FoodList from "../components/FoodList";

const HomePage = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      <FoodCarousel />
      <FoodList />
    </div>
  );
};

export default HomePage;
