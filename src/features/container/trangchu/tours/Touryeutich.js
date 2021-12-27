import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { validDate, ratingPoint } from "../../../common/commonHandle";

import { Rate, Spin } from "antd";
import "./Tour.css";

function Touryeuthich() {
  const binhluans = useSelector((state) => state.binhluan.binhluan.data);
  const tours = useSelector((state) => state.tour.tour.data);
  const [tour, setTour] = useState();

  useEffect(() => {
    if (!(binhluans && tours)) return;
    const tourFavorite = [];
    for (let i = 0; i < tours.length; i++) {
      let rating = ratingPoint(tours[i].id, binhluans);
      if (
        tours[i].status === 1 &&
        validDate(tours[i].Ngaydis) &&
        rating >= 4 &&
        tourFavorite.length < 6
      ) {
        tourFavorite.push({ ...tours[i], rating });
      }
    }
    setTour(tourFavorite);
  }, [tours, binhluans]);

  return (
    <div className="mt-5 mb-5 tour tour-favor">
      <div className="container">
        <h1 className="tour_title">Tour du lịch yêu thích</h1>
        <p className="tour_sub-title">
          Các chuyến đi du lịch được nhiều người quan tâm.
        </p>
        {!tour ? (
          <div className="text-center py-4">
            <Spin />
          </div>
        ) : (
          <div className="row g-3">
            {tour.map((item) => (
              <div className="col-md-4" key={item.id}>
                <div className="tour-favor_item">
                  <div className="tour_wrapper">
                    <img src={item.avatar} alt={item.tenanh} />
                  </div>
                  {item.Khuyenmais.length !== 0 &&
                    item.Khuyenmais[0].status === 1 && (
                      <div className="sale sale-top-left">
                        <span>Giảm {item.Khuyenmais[0].khuyenmai}%</span>
                      </div>
                    )}
                  <div className="content_tour">
                    <h1 className="container_tour_title">{item.name}</h1>
                    <Rate value={item.rating} disabled />
                    <p className="my-2">
                      Giá: {item.gianguoilon.toLocaleString()}
                    </p>
                    <Link to={`/tour/${item.id}`} className="btn btn-primary">
                      Xem ngay
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Touryeuthich;
