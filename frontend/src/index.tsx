import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./component/App";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as Element);

root.render(<App />);
