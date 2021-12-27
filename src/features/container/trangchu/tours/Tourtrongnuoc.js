import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { validDate, ratingPoint } from "../../../common/commonHandle";

import { Spin } from "antd";

import "./Tour.css";

function Tourtrongnuoc() {
  const tours = useSelector((state) => state.tour.tour.data);
  const binhluans = useSelector((state) => state.binhluan.binhluan.data);
  const [tour, setTour] = useState();

  useEffect(() => {
    if (!(binhluans && tours)) return;
    const tourIn = [];
    for (let i = 0; i < tours.length; i++) {
      let rating = ratingPoint(tours[i].id, binhluans);
      if (
        tours[i].status === 1 &&
        tours[i].vitri === 1 &&
        tourIn.length < 6 &&
        validDate(tours[i].Ngaydis)
      ) {
        tourIn.push({ ...tours[i], rating });
      }
    }
    setTour(tourIn);
  }, [tours, binhluans]);

  return (
    <div className="mt-5 mb-5 tour tour-in">
      <div className="container-fluid">
        <h1 className="tour_title">Du lịch trong nước</h1>
        <p className="tour_sub-title">
          Các chuyến du lịch trong nước đặc sắc, thú vị, tham quan danh lam
          thắng cảnh Việt Nam
        </p>
        <div className="row g-0">
          {!tour ? (
            <div className="text-center py-4">
              <Spin />
            </div>
          ) : (
            tour.map((item) => (
              <div className="col-md-4" key={item.id}>
                <Link to={`/tour/${item.id}`}>
                  <div className="tour-favor_item">
                    <div className="tour_wrapper">
                      <img src={item.avatar} alt={item.tenanh} />
                    </div>
                    <div className="content_tour">
                      <h1 className="container_tour_title">{item.name}</h1>
                      <p className="time">{item.thoigian} Ngày</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default Tourtrongnuoc;
