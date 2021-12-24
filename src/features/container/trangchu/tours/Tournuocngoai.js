import { Rate, Spin, Tooltip } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Tournuocngoai() {
  const tours = useSelector((state) => state.tours.tour.data);
  const binhluans = useSelector((state) => state.binhluans.binhluan.data);
  const tour = [];
  const formatdate = (e) => {
    if (e) {
      var ngay = e.substr(0, 2);
      var thang = e.substr(3, 2);
      var nam = e.substr(6, 4);
      return nam + "-" + thang + "-" + ngay;
    }
  };
  const maxDate = (e) => {
    if (e) {
      var ngayMax = formatdate(e[0].ngay);
      for (let i = 0; i < e.length; i++) {
        if (ngayMax <= formatdate(e[i].ngay)) {
          ngayMax = formatdate(e[i].ngay);
        }
      }
      return ngayMax;
    }
  };
  if (tours) {
    var sort = [];
    for (let i = 0; i < tours.length; i++) {
      sort.unshift(tours[i]);
    }
    var date = new Date();
    var today =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 > 10
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "-" +
      (date.getDate() > 10 ? date.getDate() : "0" + date.getDate());
    for (let i = 0; i < sort.length; i++) {
      if (
        sort[i].status === 1 &&
        sort[i].vitri === 2 &&
        tour.length < 6 &&
        maxDate(sort[i].Ngaydis) >= today
      ) {
        tour.push(sort[i]);
      }
    }
  }

  const tinhdiem = (id) => {
    var binhluanload = [];
    if (binhluans) {
      for (let i = 0; i < binhluans.length; i++) {
        if (binhluans[i].status === +1 && binhluans[i].tourId === id) {
          binhluanload.push(binhluans[i]);
        }
      }
    }
    var tong = 0;
    if (binhluans) {
      for (let i = 0; i < binhluanload.length; i++) {
        tong += binhluanload[i].star;
      }
    }
    var diem = Math.round((tong / +binhluanload.length) * 10) / 10;
    if (isNaN(diem)) {
      diem = 0;
    }
    return diem;
  };
  const tinhkhuyenmai = (money, km) => {
    return (money - money * (km / 100)).toLocaleString();
  };
  return (
    <div className="mt-5 mb-5 tour">
      <div className="heading text-center">
        <span>du lịch nước ngoài</span>
        <p className="mt-3 mb-4">
          Du lịch nước ngoài đem lại cho mọi người sự mới mẻ về một đất nước
          khác và hiểu rõ về các quốc gia hơn.
        </p>
      </div>
      <div className="container">
        <div className="xem-them mt-3">
          <Link to="/tours">Xem Thêm</Link>
        </div>
        <div className="row g-3 justify-content-center">
          {tour.length === 0 ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            tour.map((ok) => (
              <div className="col-md-4" key={ok.id}>
                <Link to={`/tours/${ok.id}`}>
                  <div className="tour-item">
                    {ok.Khuyenmais.length !== 0 &&
                      ok.Khuyenmais[0].status === 1 && (
                        <Tooltip
                          placement="right"
                          title={ok.Khuyenmais[0].name}
                        >
                          <div className="ribbon-wrapper">
                            <div className="ribbon-red">
                              Giảm {ok.Khuyenmais[0].khuyenmai}%
                            </div>
                          </div>
                        </Tooltip>
                      )}
                    <img src={ok.avatar} className="img-fluid" alt="" />
                    <div className="content_tour">
                      <div className="title_tour text-capitalize">
                        {ok.name}
                      </div>
                      <div className="mt-2 d-flex justify-content-between align-items-center">
                        <div className="star">
                          <Rate value={tinhdiem(ok.id)} disabled />
                        </div>
                        <div className="money">
                          {ok.Khuyenmais.length !== 0 &&
                          ok.Khuyenmais[0].status === 1 ? (
                            <div className="position-relative">
                              <del className="money-dis">
                                {ok.gianguoilon.toLocaleString()} VNĐ
                              </del>
                              {tinhkhuyenmai(
                                ok.gianguoilon,
                                ok.Khuyenmais[0].khuyenmai
                              )}
                              VNĐ
                            </div>
                          ) : (
                            <div>{ok.gianguoilon.toLocaleString()} VNĐ</div>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 d-flex justify-content-between align-items-center">
                        <p>Số người: {ok.songuoi}</p>
                        <p>{ok.thoigian} Ngày</p>
                      </div>
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

export default Tournuocngoai;
