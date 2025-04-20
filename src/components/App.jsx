import { useState, useEffect, useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import * as auth from "../utils/auth";
import * as api from "../utils/api";
import { getToken, setToken } from "../utils/token";

import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import "./styles/App.css";
import { useLoggedIn } from "./LoggedInWrapper";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useLoggedIn();
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setIsLoading(false);
      return;
    }

    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setUserData({ username, email });
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
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
        const redirectPath = location.state?.from?.pathname || "/ducks";
        navigate(redirectPath);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
              <Login handleLogin={handleLogin} />
            </ProtectedRoute>
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="registerContainer">
            <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
              <Register handleRegistration={handleRegistration} />
            </ProtectedRoute>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
