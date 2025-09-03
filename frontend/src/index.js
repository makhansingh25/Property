import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./auth/Auth";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="457190284719-0cjdbmt3n0pdr11515ujculvajoghiui.apps.googleusercontent.com">
    <AuthProvider>
      <Toaster />
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
);

reportWebVitals();
