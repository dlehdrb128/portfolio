import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as Element);

root.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>
);
