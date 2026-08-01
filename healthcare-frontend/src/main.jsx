import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./styles/index.css";

import { Toaster } from "react-hot-toast";

import { HashRouter } from "react-router-dom";


ReactDOM.createRoot(
  document.getElementById("root")
)
.render(

  <React.StrictMode>

    <HashRouter>

      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

    </HashRouter>

  </React.StrictMode>

);