// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./Context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
  </BrowserRouter>
  </React.StrictMode>
);
