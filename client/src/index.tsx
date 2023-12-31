import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Landing from "./pages/Landing";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import RequireAuth from "./components/auth/RequireAuth";
import Dashboard from "./pages/Dashboard";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/dashboard" Component={RequireAuth(Dashboard)} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
