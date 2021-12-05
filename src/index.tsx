import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { unregister } from "./serviceWorkerRegistration";
import { BrowserRouter } from "react-router-dom";
import { AuthStore } from "stores/AuthStore";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
      <AuthStore.Container>
        <App />
      </AuthStore.Container>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

unregister();
