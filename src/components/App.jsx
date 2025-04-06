import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import * as auth from "../utils/auth";
import * as api from "../utils/api";
import { getToken, setToken } from "../utils/token";

import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import "./styles/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;

    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setUserData({ username, email });
        navigate("/ducks");
      })
      .catch((e) => console.error(e));
  }, []);

  const handleRegistration = async ({
    email,
    username,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      try {
        await auth.register(username, password, email);
        navigate("/login");
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  };

  const handleLogin = async ({ username, password }) => {
    if (!username || !password) return;
    try {
      const data = await auth.authorize(username, password);
      if (data.jwt) {
        setToken(data.jwt);
        setUserData(data.user);
        setIsLoggedIn(true);
        navigate("/ducks");
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  return (
    <Routes>
      <Route
        path="*"
        element={
          isLoggedIn ? (
            <Navigate to="/ducks" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/ducks"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Ducks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-profile"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <MyProfile userData={userData} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <div className="loginContainer">
            <Login handleLogin={handleLogin} />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="registerContainer">
            <Register handleRegistration={handleRegistration} />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
