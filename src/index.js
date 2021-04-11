import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { register } from "../serviceWorkerRegistration";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

register();
