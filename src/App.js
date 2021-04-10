import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Canvas from "./Canvas";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Canvas />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
