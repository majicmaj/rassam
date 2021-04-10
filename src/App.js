import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import Canvas from "./Canvas";
import "./styles.css";
import Open from "./Open";

export default function App() {
  const drawings = JSON.parse(localStorage.getItem("drawings")) || [];
  console.log(drawings);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/open">
            <Open drawings={drawings} />
          </Route>
          <Route path="/">
            <Canvas />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
