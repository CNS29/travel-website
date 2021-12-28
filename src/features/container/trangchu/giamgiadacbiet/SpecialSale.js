import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { validDate } from "../../../common/commonHandle";

import "./specialsale.css";

function SpecialSale() {
  const tours = useSelector((state) => state.tour.tour.data);
  const [tour, setTour] = useState();
  useEffect(() => {
    if (!tours) return;
    for (let i = 0; i < tours.length; i++) {
      if (
        tours[i].Khuyenmais.length !== 0 &&
        tours[i].Khuyenmais[0].khuyenmai === 30 &&
        tours[i].Khuyenmais[0].status === 1 &&
        validDate(tours[i].Ngaydis)
      ) {
        setTour(tours[i]);
        break;
      }
    }
  }, [tours]);

  return (
    <div id="special-sale">
      <div className="container-fluid">
        {tour && (
          <div className="special-sale_item">
            <img src={tour.avatar} alt={tour.tenanh} />
            <div className="special-sale_item_desc">
              <h4>Giảm giá {tour.Khuyenmais[0].khuyenmai}%</h4>
              <span>Nhân dịp {tour.Khuyenmais[0].name}</span>
              <h2 className="special_item_title">{tour.name}</h2>
              <Link to={`/tours/${tour.id}`} className="btn btn-primary">
                Xem ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpecialSale;
