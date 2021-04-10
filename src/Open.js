import React from "react";
import { Link } from "react-router-dom";
import "./open.css";

export default function Open({ drawings }) {
  return (
    <div className="open">
      {drawings && drawings.length < 0 ? (
        drawings.map((drawing) => (
          <div className="drawing">{JSON.stringify(drawing)}</div>
        ))
      ) : (
        <div className="drawing">
          <Link className="button" to="/">
            <i className="fas fa-plus" />
          </Link>
        </div>
      )}
    </div>
  );
}
