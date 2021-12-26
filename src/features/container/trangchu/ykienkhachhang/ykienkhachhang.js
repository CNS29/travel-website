import { Avatar, Rate } from "antd";
import React from "react";
import mainAvatar from "../../../images/avatar.jpg";
import { useSelector } from "react-redux";
import "./ykien.css";

function Ykienkhachhang() {
  const binhluans = useSelector((state) => state.binhluan.binhluan.data);
  var binhluan = [];
  if (binhluans) {
    for (let i = 0; i < binhluans.length; i++) {
      if (binhluans[i].status === 1 && binhluans[i].loadhome === 1) {
        binhluan.push(binhluans[i]);
      }
    }
  }
  return (
    <div id="ykien">
      <div className="my-5 tour">
        <div className="heading text-center pt-5">
          <span>Đánh giá của khách hàng</span>
          <p className="mt-3 mb-4">
            Những đánh giá của khách hàng sau khi trải nghiệm đặt tour trên
            website.
          </p>
        </div>
        <div className="container">
          <div className="ykien-list m-auto">
            <div
              id="carouselYkien"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner rounded border p-3">
                {binhluan.length !== 0 &&
                  binhluan.map((ok, index) => (
                    <div
                      className={`carousel-item text-center ${
                        index === 0 && "active"
                      }`}
                      key={ok.id}
                    >
                      <Rate value={ok.star} disabled className="mb-3" />
                      <p>{ok.binhluan}</p>
                      <Avatar
                        src={ok.User.avatar ? ok.User.avatar : mainAvatar}
                        className="my-3"
                      />
                      <br />
                      <strong>{ok.User.name}</strong>
                    </div>
                  ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselYkien"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true">
                  <i className="fas fa-angle-double-left"></i>
                </span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselYkien"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true">
                  <i className="fas fa-angle-double-right"></i>
                </span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ykienkhachhang;
