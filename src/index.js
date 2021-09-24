import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Card from "./components/Card";

ReactDOM.render(
  <React.StrictMode>
    <div id="mainContent">
      <Card />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
