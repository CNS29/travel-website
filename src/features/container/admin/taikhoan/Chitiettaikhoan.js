import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import noImg from "../../../images/noImg.png";
import "./taikhoan.css";
function Chitiettaikhoan() {
  const { id } = useParams();
  const history = useHistory();
  const users = useSelector((state) => state.taikhoan.user.data);
  const user = [];
  if (users) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === +id) {
        user.push(users[i]);
      }
    }
  }
  const backPage = () => {
    history.goBack();
  };

  return (
    <div id="admin">
      <button onClick={backPage} className="btn btn-primary">
        Quay lại
      </button>
      <div className="content">
        <div className="ct">
          {!user
            ? "s"
            : user.map((ok) => (
                <div key={ok.id}>
                  <div className="text-center">
                    <img
                      src={ok.avatar ? ok.avatar : noImg}
                      className="avatar-ct"
                      alt=""
                    />
                  </div>
                  <table className="mt-5 table table-bordered">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Tên người dùng:&emsp;</strong>
                        </td>
                        <td>
                          <i>{ok.name}</i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Email:&emsp;</strong>
                        </td>
                        <td>
                          <i>{ok.email}</i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Số điện thoại:&emsp;</strong>
                        </td>
                        <td>{ok.sdt}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong> Giới tính:&emsp;</strong>
                        </td>
                        <td>
                          <i>{ok.gioitinh === 1 ? "Nam" : "Nữ"}</i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong> Ngày sinh:&emsp;</strong>
                        </td>
                        <td>
                          <i>{ok.ngaysinh}</i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Địa chỉ:&emsp;</strong>
                        </td>
                        <td>
                          <i>{ok.diachi}</i>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Chức vụ:&emsp;</strong>
                        </td>
                        <td>
                          <i>{ok.Roles[0].name}</i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

Chitiettaikhoan.propTypes = {};

export default Chitiettaikhoan;
