import React, { Component } from "react";
import renderHTML from "react-render-html";
import { useSelector } from "react-redux";
import "./luuy.css";
function Luuy(props) {
  const tours = useSelector((state) => state.tour.tour.data);
  const tour = [];
  if (tours) {
    for (let i = 0; i < tours.length; i++) {
      if (tours[i].id === +props.id) {
        tour.push(tours[i]);
      }
    }
  }
  return (
    <div className="luuy">
      {tour.map((ok) => (
        <div key={ok.id}>{renderHTML(ok.luuy)}</div>
      ))}
    </div>
  );
}

export default Luuy;
