import React, { useEffect, useState, useRef } from "react";

import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { storage } from "../../../../firebase";
import { inforData } from "../../login/inforSlice";
import { dateFormat } from "../../../common/commonHandle";
import taikhoanApi from "../../../../api/taikhoanApi";

import { Menu, Dropdown, Modal, message, Avatar } from "antd";
import logo from "./../../../images/logo.png";
import noImg from "../../../images/noImg.png";
import "./menu.css";

function ListMenu() {
  const dispatch = useDispatch();
  const ref = useRef();
  const users = useSelector((state) => state.infor.infor.data);
  const [user, setUser] = useState();
  const [state, setState] = useState({
    visibleUserInfor: false,
    visibleUpdateUserInfor: false,
    name: "",
    avatar: "",
    gioitinh: 1,
    sdt: "",
    diachi: "",
    ngaysinh: "",
    inputFileImage: "",
  });

  useEffect(() => {
    // Customize animation header.
    let scrollY = 0;
    const scrollEvent = () => {
      if (!ref.current) return;
      if (window.scrollY > 120) {
        if (window.scrollY > scrollY) {
          ref.current.style.top = "-80px";
          scrollY = window.scrollY;
        } else {
          ref.current.style.top = "0px";
          scrollY = window.scrollY;
        }
      } else {
        ref.current.style.top = "0px";
      }
    };
    window.addEventListener("scroll", scrollEvent);

    getProfile();

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [users]);

  const getProfile = async () => {
    if (!users) return;
    taikhoanApi.getOne(users.id).then((data) => {
      setUser(data);
      setState((prevState) => ({
        ...prevState,
        name: data.name,
        avatar: data.avatar,
        gioitinh: data.gioitinh,
        sdt: data.sdt,
        diachi: data.diachi,
        ngaysinh: data.ngaysinh,
      }));
    });
  };

  const showModalUser = (data) => {
    setState({
      ...state,
      [data]: true,
    });
  };

  const closeModalUser = (data) => {
    setState({
      ...state,
      [data]: false,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(inforData());
    setUser("");
  };

  const onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (name === "avatar") {
      if (!target.files[0]) return;
      value = target.files[0];
      setState({
        ...state,
        inputFileImage: value,
        [name]: URL.createObjectURL(value),
      });
      return;
    }
    setState({
      ...state,
      [name]: value,
    });
  };

  const validateInputUpdateInforUser = (data) => {
    if (data === "") return "";
    return data.replace(/\s+/g, " ").trim();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, diachi, ngaysinh, gioitinh, sdt, inputFileImage } = state;
    let id = user.id;
    if (
      !(
        validateInputUpdateInforUser(name) &&
        validateInputUpdateInforUser(diachi) &&
        gioitinh &&
        ngaysinh &&
        sdt
      )
    ) {
      message.warning("B???n ch??a nh???p ????? th??ng tin!");
      return;
    }
    if (inputFileImage) {
      await storage
        .ref(`imagesUser/${inputFileImage.name}`)
        .put(inputFileImage);
      const urlImageFirebase = await storage
        .ref("imagesUser")
        .child(inputFileImage.name)
        .getDownloadURL();
      updateData({
        id,
        name: validateInputUpdateInforUser(name),
        diachi: validateInputUpdateInforUser(diachi),
        gioitinh,
        ngaysinh,
        sdt,
        avatar: urlImageFirebase,
        tenanh: inputFileImage.name,
      });
    } else {
      updateData({
        id,
        name: validateInputUpdateInforUser(name),
        diachi: validateInputUpdateInforUser(diachi),
        gioitinh,
        ngaysinh,
        sdt,
      });
    }
  };

  const updateData = (data) => {
    taikhoanApi
      .edituser(data)
      .then((data) => {
        setState({
          ...state,
          visibleUpdateUserInfor: false,
        });
        getProfile();
        message.success("C???p nh???t th??ng tin th??nh c??ng!");
      })
      .catch((err) => {
        message.error("S???a th???t b???i!");
      });
  };

  const menu = (
    <Menu>
      {user ? (
        <Menu.ItemGroup>
          {console.log(user.Roles[0].name)}
          {user.Roles[0].name !== "user" && (
            <Menu.Item key="1">
              <Link to="/admin">Qu???n l?? Admin</Link>
            </Menu.Item>
          )}
          <Menu.Item key="2">
            <span onClick={() => showModalUser("visibleUserInfor")}>
              Xem th??ng tin
            </span>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/thongtin/0">Xem l???ch s???</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <span onClick={handleLogout}>????ng xu???t</span>
          </Menu.Item>
        </Menu.ItemGroup>
      ) : (
        <Menu.Item key="5">
          <Link to="/dangnhap">????ng nh???p</Link>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <header
      ref={ref}
      id="header"
      className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
    >
      <div className="container">
        <Link to="/" className="header_logo flex-grow-1">
          <img src={logo} alt="logo-website" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#collapsibleNavId"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end flex-grow-1 bg-dark"
          id="collapsibleNavId"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-white">Let's Travel</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body justify-content-between align-items-center">
            <ul className="navbar-nav justify-content-center align-items-center">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  Trang ch???
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/tours"
                >
                  Tour du l???ch
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/news"
                >
                  Tin t???c
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-link"
                  to="/contact"
                >
                  Li??n h???
                </NavLink>
              </li>
            </ul>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomCenter"
            >
              <span className="nav-link d-flex justify-content-center">
                <Avatar
                  size={50}
                  src={user && user.avatar ? user.avatar : noImg}
                />
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
      {user && (
        <>
          <Modal
            title="Th??ng tin kh??ch h??ng"
            visible={state.visibleUserInfor}
            footer={null}
            onCancel={() => closeModalUser("visibleUserInfor")}
          >
            <div className="row g-3">
              <div className="col-md-4 text-center">
                <Avatar size={100} src={user.avatar || noImg} />
                <h5 className="mt-3">{user.name}</h5>
                <p className="mt-1">{user.Roles[0].mota}</p>
              </div>
              <div className="col-md-8">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>H??? t??n:</th>
                      <td>{user.name}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>{user.email}</td>
                    </tr>
                    <tr>
                      <th>Ng??y sinh:</th>
                      <td>
                        {user.ngaysinh
                          ? dateFormat(user.ngaysinh)
                          : "Ch??a c?? d??? li???u"}
                      </td>
                    </tr>
                    <tr>
                      <th>Gi???i t??nh:</th>
                      <td>
                        {user.gioitinh !== null
                          ? user.gioitinh === 1
                            ? "Nam"
                            : "N???"
                          : "Ch??a c?? d??? li???u"}
                      </td>
                    </tr>
                    <tr>
                      <th>S??? ??i???n tho???i:</th>
                      <td>{user.sdt ? user.sdt : "Ch??a c?? d??? li???u"}</td>
                    </tr>
                    <tr>
                      <th>?????a ch???:</th>
                      <td>{user.diachi ? user.diachi : "Kh??ng c?? d??? li???u"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-5">
                <div
                  onClick={() => showModalUser("visibleUpdateUserInfor")}
                  className="btn btn-outline-primary"
                >
                  Ch???nh s???a th??ng tin
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            title="C???p nh???t th??ng tin"
            visible={state.visibleUpdateUserInfor}
            footer={null}
            onCancel={() => closeModalUser("visibleUpdateUserInfor")}
          >
            <form onSubmit={onSubmit}>
              <div className="form-group mb-4">
                <h6 className="fw-bold mb-2">H??? v?? t??n</h6>
                <input
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <h6 className="fw-bold mb-2">???nh ?????i di???n</h6>
                <div>
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    name="avatar"
                    onChange={onChange}
                  />
                  <label htmlFor="icon-button-file">
                    <Avatar
                      size={100}
                      src={state.avatar ? state.avatar : noImg}
                    />
                  </label>
                  <br />
                </div>
              </div>
              <div className="form-group mb-4">
                <h6 className="fw-bold mb-2">Gi???i t??nh</h6>
                <select
                  className="form-control"
                  name="gioitinh"
                  value={state.gioitinh !== null ? state.gioitinh : "2"}
                  onChange={onChange}
                >
                  <option value="2">Ch???n gi???i t??nh</option>
                  <option value="1">Nam</option>
                  <option value="0">N???</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <h6 className="fw-bold mb-2">S??? ??i???n tho???i</h6>
                <input
                  type="number"
                  name="sdt"
                  value={state.sdt ? state.sdt : ""}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <h6 className="fw-bold mb-2">?????a ch???</h6>
                <input
                  type="text"
                  name="diachi"
                  value={state.diachi ? state.diachi : ""}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-4">
                <h6 className="fw-bold mb-2">Ng??y sinh</h6>
                <input
                  type="date"
                  name="ngaysinh"
                  value={state.ngaysinh ? state.ngaysinh : ""}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-outline-primary">
                  C???p nh???t
                </button>
              </div>
            </form>
          </Modal>
        </>
      )}
    </header>
  );
}
export default ListMenu;
