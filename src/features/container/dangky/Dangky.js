import React, { useState } from "react";
import "./dangky.css";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { message } from "antd";
import taikhoanApi from "../../../api/taikhoanApi";

function Dangky() {
  const history = useHistory();
  const [state, setState] = useState({
    password: "",
    repassword: "",
    name: "",
    status: 1,
    email: "",
  });
  const { password, repassword, status, name, email } = state;
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      message.warning("Email không đúng định dạng!");
    } else {
      if (
        password.trim() === "" ||
        repassword.trim() === "" ||
        name.trim() === "" ||
        email.trim() === ""
      ) {
        message.error("Bạn chưa nhập đầy đủ thông tin!");
      } else {
        if (password.length > 5) {
          if (password === repassword) {
            if (
              (await taikhoanApi.checkEmail(email).then((data) => {
                return data;
              })) !== null
            ) {
              message.error("Email đã được sử dụng!");
            } else {
              var UserRoles = [{ roleId: 6 }];
              taikhoanApi.postuser({
                name,
                status,
                email,
                password,
                UserRoles,
              });
              history.push("/dangnhap");
            }
          } else {
            message.error("Mật khẩu không trùng khớp!");
          }
        } else {
          message.error("Mật khẩu phải ít nhất 6 ký tự!");
        }
      }
    }
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div id="dangky">
      <div className="box-login">
        <form className="form d-grid" onSubmit={onsubmit}>
          <h3 className="text-uppercase fw-bold text-center py-3">Đăng ký</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Tên của bạn"
            name="name"
            value={name}
            onChange={onchange}
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onchange}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Mật khẩu"
            name="password"
            value={password}
            onChange={onchange}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Nhập lại mật khẩu"
            name="repassword"
            value={repassword}
            onChange={onchange}
          />
          <Link to="/dangnhap" className="text-primary text-end mb-3 px-2">
            Đã có tài khoản
          </Link>
          <button type="submit" className="btn btn-primary mb-3">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}

Dangky.propTypes = {};

export default Dangky;
