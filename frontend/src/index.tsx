import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Router from "./router";
// import "../styles/tailwind.css";
import "../styles/tailwind.css";

axios.defaults.baseURL = process.env.REACT_APP_BE_URL;

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as Element);

root.render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
