import React from "react";
import "./lichsu.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Image } from "antd";
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

  const columns = [
    {
      title: "Hành ảnh",
      dataIndex: "anh",
    },
    {
      title: "Tên Tour",
      dataIndex: "name",
    },
    {
      title: "Thông tin",
      dataIndex: "infor",
    },
  ];

  return (
    <div className="history">
      <div className="history__content">
        <div className="row">
          {thongtin.length === 0 ? (
            <h4 className="not-infor">Không có thông tin</h4>
          ) : (
            <Table
              columns={columns}
              pagination={{ pageSize: 6 }}
              dataSource={thongtin.map((ok, index) => ({
                key: index + 1,
                name: (
                  <div className="tour_admin_table_name">{ok.Tour.name}</div>
                ),
                anh: <Image src={ok.Tour.avatar} alt={ok.name} />,
                infor: (
                  <table>
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
                ),
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// thongtin.map((ok, index) => (
//   <div className="col-md-6">
//     <Link to={`/tours/${ok.tourId}`} key={index}>
//       <div className="history_item">
//         <img src={ok.Tour.avatar} alt={ok.name} />
//         <table className="mx-5">
//           <thead>
//             <tr>
//               <th>
//                 <h4 className="my-2 text_limmit_home">{ok.Tour.name}</h4>
//               </th>
//             </tr>
//           </thead>
//         </table>
//       </div>
//     </Link>
//   </div>
// ));
