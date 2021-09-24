import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Card from "./components/Card";
import ReviewButton from "./components/ReviewButton";

ReactDOM.render(
  <React.StrictMode>
    <div>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
