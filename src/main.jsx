import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { app, storage } from "../src/DatabaseConfigaration/FirebaseConnect.js";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

console.log(app); // Add this to ensure the app is being initialized properly
