import React, { useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "./api/axios";
import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";

const App = () => {
  const { auth, setAuth, setAppLoading, appLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get("/auth/me");
        if (res) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.data.email,
              username: res.data.username,
              userId: res.data.userId,
              favoriteFood: res.data.favoriteFood,
            },
          });
        }
      } catch (err) {}
    };
    fetchAccount();
  }, []);
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
