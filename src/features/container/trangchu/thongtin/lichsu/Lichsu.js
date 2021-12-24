import React from "react";
import "./lichsu.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Lichsu() {
  const infor = useSelector((state) => state.infor.infor.data);
  const hoadons = useSelector((state) => state.hoadons.hoadon.data);
  let thongtin = [];
  if (hoadons && infor) {
    for (let i = 0; i < hoadons.length; i++) {
      if (hoadons[i].userId === infor.id) {
        thongtin.push(hoadons[i]);
      }
    }
  }
  return (
    <div className="history">
      <div className="history__header">
        <h3 className="text-center">Lịch sử đặt tour</h3>
        <div className="hr"></div>
      </div>
      <div className="history__content">
        {thongtin.length === 0 ? (
          <div className="spin">
            <h4>Không có thông tin</h4>
          </div>
        ) : (
          thongtin.map((ok, index) => (
            <Link to={`/tours/${ok.tourId}`} key={index}>
              <div className="history__box">
                <img src={ok.Tour.avatar} alt="" />
                <div className="history__tour">
                  <div className="history--title">
                    <div className="history--name">{ok.Tour.name}</div>
                  </div>
                  <div className="history--infor">
                    <table>
                      <tbody>
                        <tr>
                          <th>Ngày khởi hành &emsp;&emsp;</th>
                          <th>{ok.ngaydi}</th>
                        </tr>
                        <tr>
                          <th>Thời gian</th>
                          <th>{ok.Tour.thoigian}</th>
                        </tr>
                        <tr></tr>
                      </tbody>
                    </table>
                    <table className="nmn">
                      <tbody>
                        <tr>
                          <th>Số người lớn &emsp;&emsp;</th>
                          <th>{ok.nguoilon}</th>
                        </tr>
                        <tr>
                          <th>Số trẻ em</th>
                          <th>{ok.treem}</th>
                        </tr>
                        <tr>
                          <th>Số em bé</th>
                          <th>{ok.embe}</th>
                        </tr>
                        <tr>
                          <th>Tổng tiền</th>
                          <th>{ok.thanhtien.toLocaleString()} vnđ</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}