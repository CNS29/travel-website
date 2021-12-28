import React from "react";
import { Link } from "react-router-dom";

export default function Error({ message }) {
  return (
    <div id="error">
      <div className="text-center">
        <h1 style={{ fontSize: "7rem" }}>404</h1>
        <br />
        <h4>{message}</h4>
        <Link to="/dangnhap" className="btn btn-primary mt-5">
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}
