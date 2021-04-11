import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import registerServiceWorkerr from "./serviceWorker";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
registerServiceWorkerr();
