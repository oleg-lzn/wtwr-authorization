import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./index.css";
import { LoggedInWrapper } from "./components/LoggedInWrapper";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoggedInWrapper>
        <App />
      </LoggedInWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
