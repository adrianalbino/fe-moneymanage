import React from "react";
import ReactDOM from "react-dom/client";
import UserProvider from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "react-toastify/dist/ReactToastify.css";
import AppNavigation from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AppNavigation />
      </LocalizationProvider>
    </UserProvider>
  </React.StrictMode>
);
