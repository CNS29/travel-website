import React from "react";
import { useSelector } from "react-redux";
import "./dichvudikem.css";
function Dichvudikem(props) {
  const tours = useSelector((state) => state.tour.tour.data);
  const tour = [];
  if (tours) {
    for (let i = 0; i < tours.length; i++) {
      if (tours[i].id === +props.id) {
        tour.push(tours[i].Dichvus);
      }
    }
  }
  return (
    <div className="dichvudikem">
      {tour[0].map((ok) => (
        <p key={ok.id}>• {ok.name}</p>
      ))}
    </div>
  );
}

export default Dichvudikem;
