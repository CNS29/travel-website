import React from "react";

export default function Error({ message }) {
  return (
    <div id="error">
      <div className="text-center">
        <i
          className="far fa-frown "
          style={{ fontSize: "150px", marginBottom: "2rem" }}
        ></i>
        <h1>404</h1>
        <br />
        <h4>{message}</h4>
      </div>
    </div>
  );
}
