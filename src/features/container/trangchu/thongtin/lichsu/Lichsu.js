import React from "react";
import "./lichsu.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Lichsu() {
  const infor = useSelector((state) => state.infor.infor.data);
  const hoadons = useSelector((state) => state.hoadon.hoadon.data);
  let thongtin = [];
  if (hoadons && infor) {
    for (let i = 0; i < hoadons.length; i++) {
      if (hoadons[i].userId === infor.id) {
        thongtin.push(hoadons[i]);
      }
    }
  }
  console.log(thongtin);
  return (
    <div className="history">
      <h4 className="text-center mb-3">Lịch sử đặt Tour</h4>
      <div className="history__content">
        {thongtin.length === 0 ? (
          <h4 className="not-infor">Không có thông tin</h4>
        ) : (
          thongtin.map((ok, index) => (
            <Link to={`/tours/${ok.tourId}`} key={index}>
              <div className="history_item">
                <img src={ok.Tour.avatar} alt={ok.name} />
                <table className="mx-5">
                  <thead>
                    <tr>
                      <th>
                        <h4 className="my-2">{ok.Tour.name}</h4>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Ngày khởi hành: {ok.ngaydi}</th>
                    </tr>
                    <tr>
                      <th>Thời gian: {ok.Tour.thoigian}</th>
                    </tr>
                    <tr>
                      <th>Tổng tiền: {ok.thanhtien.toLocaleString()} VNĐ</th>
                    </tr>
                    <tr>
                      <th>Số người lớn: &emsp;&emsp;</th>
                      <th>{ok.nguoilon}</th>
                    </tr>
                    <tr>
                      <th>Số trẻ em:</th>
                      <th>{ok.treem}</th>
                    </tr>
                    <tr>
                      <th>Số em bé:</th>
                      <th>{ok.embe}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
