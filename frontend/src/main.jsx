import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const wakeUpBackend = () => {
  fetch(`https://busvoyage.onrender.com/ping`)
    .then(() => console.log("Backend is awake!"))
    .catch(() => console.log("Backend waking up..."));
};

wakeUpBackend();

setInterval(wakeUpBackend, 14 * 60 * 1000);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);