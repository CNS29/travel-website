import React from "react";
import { useSelector } from "react-redux";
import renderHTML from "react-render-html";
import "./chitiettour.css";
function Chitiettour(props) {
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
    <div id="ct-tour">
      <div className="content-tour">
        {tour.map((ok) => (
          <div key={ok.id}>{renderHTML(ok.chitiettour)}</div>
        ))}
      </div>
    </div>
  );
}

export default Chitiettour;
