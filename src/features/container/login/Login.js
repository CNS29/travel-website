import React, { useState } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { message } from "antd";
import { inforData } from "./inforSlice";
import { useDispatch } from "react-redux";
import loginApi from "../../../api/loginApi";
function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState({ email: "", password: "" });
  const { email, password } = state;

  const actioninfor = async () => {
    await dispatch(inforData());
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      message.warning("Email không đúng định dạng!");
    } else {
      if (email.trim() === "" || password.trim() === "") {
        message.warning("Bạn chưa nhập đầy đủ thông tin!");
      } else {
        let token = await loginApi
          .login({ email: email, password: password })
          .then((data) => {
            return data;
          });
        if (token !== "err") {
          localStorage.setItem("token", token);
          actioninfor();
          message.success("Đăng nhập thành công!");
          history.push("/");
        } else {
          message.warning("Sai tên đăng nhập hoặc mật khẩu!");
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

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div id="login">
      <div className="box-login">
        <form className="form d-grid" onSubmit={onsubmit}>
          <h3 className="text-uppercase fw-bold text-center py-3">Đăng nhập</h3>
          <input
            type="text"
            className="form-control"
            placeholder="Tài khoản"
            value={email}
            name="email"
            onChange={onchange}
          />
          <input
            type="password"
            className="form-control my-3"
            placeholder="Mật khẩu"
            value={password}
            name="password"
            onChange={onchange}
          />
          <div className="d-flex justify-content-between mb-3 px-2">
            <div>
              <input className="form-check-input" type="checkbox" />
              <span className="remember_text">&nbsp;Nhớ mật khẩu</span>
            </div>
            <Link to="/dangky" className="text-primary">
              Đăng ký
            </Link>
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
