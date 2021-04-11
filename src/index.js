import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import registerServiceWorker from "./service-worker";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
registerServiceWorker();
