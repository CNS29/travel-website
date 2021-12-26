import { message, Rate, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./tour.css";
import { Button, Popover, Radio } from "@material-ui/core";
import { Link, useHistory, useParams } from "react-router-dom";
import Detail from "../detail/Detail";
import Footer from "../../trangchu/footer/Footer";
import Modal from "antd/lib/modal/Modal";
import Hinhthucthanhtoan from "./Hinhthucthanhtoan";
import Dieukhoan from "./Dieukhoan";
import { binhluanData } from "../../admin/Binhluan/binhluanSlice";
import { addhoadon, hoadonData } from "../../admin/Hoadon/hoadonSlice";
import taikhoanApi from "../../../../api/taikhoanApi";
import { ngaydiData } from "../../admin/Ngaydi/ngaydiSlice";
import { addthanhtoan } from "./thanhtoanSlice";

import { dateFormat } from "../../../common/commonHandle";

function Tour() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const binhluans = useSelector((state) => state.binhluan.binhluan.data);
  const tours = useSelector((state) => state.tour.tour.data);
  const ngaydis = useSelector((state) => state.ngaydi.ngaydi.data);
  const users = useSelector((state) => state.infor.infor.data);
  const hoadons = useSelector((state) => state.hoadon.hoadon.data);
  const [stylepayment, setstylepayment] = useState(1);
  const [state, setState] = useState({
    listdate: "",
    visible: false,
    visible2: false,
    visible3: false,
    name: "",
    email: "",
    sdt: "",
    diachi: "",
    nguoilon: 1,
    treem: 0,
    embe: 0,
    dieukhoan: false,
    valueDate: "",
    date: "",
    loadlaihoadon: 1,
  });

  useEffect(() => {
    const refeshData = async () => {
      await dispatch(binhluanData());
      await dispatch(hoadonData());
      await dispatch(ngaydiData());
    };
    refeshData();
    window.scrollTo(0, 0);
  }, [state.loadlaihoadon]);

  const binhluanload = [];
  if (binhluans) {
    for (let i = 0; i < binhluans.length; i++) {
      if (binhluans[i].tourId === +id && binhluans[i].status === 1) {
        binhluanload.push(binhluans[i]);
      }
    }
  }

  const tour = [];
  if (tours) {
    for (let i = 0; i < tours.length; i++) {
      if (tours[i].id === +id) {
        tour.push(tours[i].Ngaydis);
      }
    }
  }

  const tinhdiem = () => {
    let tong = 0;
    if (binhluans) {
      for (let i = 0; i < binhluanload.length; i++) {
        tong += binhluanload[i].star;
      }
    }
    let diem = Math.round((tong / +binhluanload.length) * 10) / 10;
    if (isNaN(diem)) {
      diem = 0;
    }
    return diem;
  };

  let giakhuyenmai;
  if (tours) {
    giakhuyenmai = tours.find((x) => x.id === +id);
  }

  const checkngaydi = () => {
    if (tour.length !== 0) {
      let ngaydi = tour[0];
      let ngaymin = ngaydi[0].ngay;
      let date = new Date();
      let listDate = [];
      for (let i = 0; i < ngaydi.length; i++) {
        if (
          new Date(ngaymin) < new Date(ngaydi[i].ngay) &&
          date <= new Date(ngaydi[i].ngay)
        ) {
          listDate.push(ngaydi[i].ngay);
        }
      }
      listDate.sort(function (a, b) {
        return new Date(a) - new Date(b);
      });
      return listDate[0] ? listDate[0] : ngaymin;
    }
  };

  const fillDate = () => {
    if (tour.length !== 0) {
      let ngaydi = tour[0];
      let date = new Date();
      let dates = [];
      for (let i = 0; i < ngaydi.length; i++) {
        if (date <= new Date(ngaydi[i].ngay)) {
          dates.push({ id: i + 1, ngay: ngaydi[i].ngay });
        }
      }
      return dates;
    }
  };

  let tour_ngay = [];
  if (ngaydis && checkngaydi()) {
    tour_ngay.push(
      ngaydis
        .find((x) => x.ngay === checkngaydi())
        .Tours.find((x) => x.id === +id)
    );
  }

  const hide = () => {
    setState({
      ...state,
      visible3: false,
    });
  };
  const handleVisibleChange = () => {
    setState({ ...state, visible3: true, listdate: fillDate() });
  };

  const showModal = async () => {
    if (users) {
      let user = await taikhoanApi.getOne(+users.id).then((data) => {
        return data;
      });
      setState({
        ...state,
        visible3: false,
        visible: true,
        name: user.name,
        diachi: user.diachi,
        sdt: user.sdt,
        email: user.email,
      });
    } else {
      message.warning("Bạn cần đăng nhập trước!");
    }
  };
  const handleOk = (e) => {
    if (
      name === "" ||
      sdt === "" ||
      diachi === "" ||
      email === "" ||
      !name ||
      !sdt ||
      !diachi ||
      !email
    ) {
      message.warning("Bạn cần cập nhật thông tin cho tài khoản!");
    } else {
      let songuoi = tours.find((x) => x.id === +id).songuoi;
      if (songuoiconlai(songuoi) === 0) {
        message.warning("Đã hết chỗ quý khách vui lòng chọn thời gian khác!");
      } else {
        if (tong > songuoiconlai(songuoi)) {
          message.warning("Vượt quá số người cho phép!");
        } else {
          setState({
            ...state,
            visible2: true,
          });
        }
      }
    }
  };
  const handleCancel = (e) => {
    setState({
      ...state,
      visible: false,
    });
  };
  const thanhtien = (gia_te, gia_eb) => {
    let gianguoilon = checkKhuyenmai();
    return gianguoilon * nguoilon + gia_te * treem + gia_eb * embe;
  };

  const callbackfunction = (data) => {
    setstylepayment(data);
  };

  const handleOk2 = async () => {
    if (state.dieukhoan === false) {
      message.warning("Bạn chưa đồng ý điều khoản của chúng tôi!");
    } else {
      let userId = await taikhoanApi.getOne(+users.id).then((data) => {
        return data.id;
      });
      let tourId = id;
      let tongtien = thanhtien(tour_ngay[0].giatreem, tour_ngay[0].giaembe);
      if (stylepayment === 1) {
        await dispatch(
          addhoadon({
            thanhtien: tongtien,
            tourId,
            userId,
            nguoilon,
            treem,
            embe,
            ngaydi: state.date === "" ? dateFormat(checkngaydi()) : state.date,
          })
        );
        setState({
          ...state,
          visible2: false,
          visible: false,
          loadlaihoadon: state.loadlaihoadon + 1,
        });
      } else if (stylepayment === 3) {
        dispatch(
          addthanhtoan({
            hoadon: {
              tourId,
              userId,
              nguoilon,
              treem,
              embe,
              ngaydi:
                state.date === "" ? dateFormat(checkngaydi()) : state.date,
            },
            nguoilon,
            treem,
            embe,
            tongtien,
            name: tour_ngay[0].name,
            giatreem: tour_ngay[0].giatreem,
            giaembe: tour_ngay[0].giaembe,
            gianguoilon: tour_ngay[0].gianguoilon,
          })
        );
        history.push("/stripe");
      }
    }
  };

  const handleCancel2 = (e) => {
    setState({
      ...state,
      visible2: false,
    });
  };
  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onChangedate = (e) => {
    setState({ ...state, valueDate: e.target.value });
  };

  const songuoiconlai = (e) => {
    let tonghd = 0;
    if (hoadons) {
      for (let i = 0; i < hoadons.length; i++) {
        if (hoadons[i].tourId === +id) {
          tonghd += hoadons[i].nguoilon + hoadons[i].treem + hoadons[i].embe;
        }
      }
    }
    return e - tonghd;
  };
  const tinhkhuyenmai = (money, km) => {
    return money - money * (km / 100);
  };
  const checkKhuyenmai = () => {
    if (giakhuyenmai.Khuyenmais.length === 0) {
      return giakhuyenmai.gianguoilon;
    } else {
      if (giakhuyenmai.Khuyenmais[0].status === 0) {
        return giakhuyenmai.gianguoilon;
      } else {
        return tinhkhuyenmai(
          giakhuyenmai.gianguoilon,
          giakhuyenmai.Khuyenmais[0].khuyenmai
        );
      }
    }
  };

  const adddate = (e) => {
    setState({
      ...state,
      date: state.listdate.find((x) => x.id === +e).ngay,
    });
  };

  const { name, sdt, diachi, email, nguoilon, treem, embe } = state;
  let tong;
  if (giakhuyenmai) {
    tong = Number(nguoilon) + Number(treem) + Number(embe);
  }

  return (
    <div className="margin_header">
      <div id="detail-tour">
        <div className="container">
          <div className="breadcrumb">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <i className="fas fa-home mr-2"></i>Trang chủ
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/tours">Tour du lịch</Link>
                </li>
                <li className="breadcrumb-item active">
                  {tour_ngay.length > 0 ? tour_ngay[0].name : ""}
                </li>
              </ol>
            </nav>
          </div>
          {tour_ngay.length === 0 ? (
            <div className="spin m-5">
              <Spin className="mt-1" />
            </div>
          ) : (
            tour_ngay.map((ok) => (
              <div className="box-tour mt-3" key={ok.id}>
                <div className="row g-5">
                  <div className="col-lg-6">
                    <div
                      id="carouselDetailTour"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div className="carousel-inner rounded">
                        {tours
                          .find((x) => x.id === +id)
                          .Anhs.map((oki, index) => (
                            <div
                              className={`carousel-item ${
                                index === 0 && "active"
                              }`}
                              key={oki.id}
                            >
                              <img
                                src={oki.link}
                                alt="detailImage"
                                className="detail-image"
                              />
                            </div>
                          ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselDetailTour"
                        data-bs-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        >
                          <i className="fas fa-angle-double-left"></i>
                        </span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselDetailTour"
                        data-bs-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        >
                          <i className="fas fa-angle-double-right"></i>
                        </span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="rating">
                      <Rate value={tinhdiem()} disabled />
                      <strong className="ms-2">
                        ({binhluanload.length} đánh giá)
                      </strong>
                    </div>
                    <div className="tour-infor my-3">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <span>Khởi hành:</span>
                            </td>
                            <td>
                              <span>
                                {state.date === ""
                                  ? dateFormat(checkngaydi())
                                  : state.date}
                              </span>
                            </td>
                            <td>
                              <Popover
                                content={
                                  <div>
                                    <Radio.Group
                                      onChange={onChangedate}
                                      value={state.valueDate}
                                    >
                                      {state.listdate === ""
                                        ? ""
                                        : state.listdate.map((ok) => (
                                            <Radio
                                              // style={radioStyle}
                                              key={ok.id}
                                              value={ok.id}
                                            >
                                              <span
                                                onClick={() => {
                                                  adddate(ok.id);
                                                }}
                                              >
                                                {ok.ngay}
                                              </span>
                                              <br />
                                            </Radio>
                                          ))}
                                    </Radio.Group>
                                    <hr />
                                    <div className="text-center">
                                      <strong
                                        className="text-danger"
                                        style={{
                                          cursor: "pointer",
                                        }}
                                        onClick={hide}
                                      >
                                        Close
                                      </strong>
                                    </div>
                                  </div>
                                }
                                title="Chọn ngày khác"
                                trigger="click"
                                visible={state.visible3}
                                onVisibleChange={handleVisibleChange}
                              >
                                Chọn ngày
                              </Popover>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Thời gian:</span>
                            </td>
                            <td>
                              <span>{ok.thoigian} ngày</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Nơi khởi hành: </span>
                            </td>
                            <td>
                              <span>TPHCM</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="price my-3">
                      <span>
                        <strong className="text-danger">
                          {checkKhuyenmai().toLocaleString()}
                        </strong>{" "}
                        vnd
                      </span>
                      <br />
                      <span>Số chỗ còn lại: {songuoiconlai(ok.songuoi)}</span>
                    </div>
                    <Button
                      onClick={showModal}
                      variant="contained"
                      color="primary"
                    >
                      Đặt tour
                    </Button>
                  </div>
                  <Detail id={id} />
                </div>
              </div>
            ))
          )}
        </div>
        <Footer />
        <Modal
          title="Đặt tour"
          visible={state.visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <h4>Thông tin liên lạc</h4>
          <div className="form-group">
            <label htmlFor="">Họ tên</label>
            <input
              type="text"
              className="form-control"
              name="name"
              disabled
              value={name}
              onChange={onchange}
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              disabled
              value={email}
              onChange={onchange}
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              name="sdt"
              disabled
              value={sdt}
              onChange={onchange}
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              name="diachi"
              disabled
              value={diachi}
              onChange={onchange}
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Ngày đi</label>
            <input
              type="text"
              className="form-control"
              name="diachi"
              disabled
              value={state.date === "" ? dateFormat(checkngaydi()) : state.date}
              onChange={onchange}
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
          <h4 className="my-3">Số người</h4>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="">Người lớn</label>
                <input
                  type="number"
                  className="form-control"
                  name="nguoilon"
                  min="1"
                  value={nguoilon}
                  onChange={onchange}
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="">Trẻ em</label>
                <input
                  type="number"
                  className="form-control"
                  name="treem"
                  min="0"
                  value={treem}
                  onChange={onchange}
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="">Em bé</label>
                <input
                  type="number"
                  className="form-control"
                  value={embe}
                  name="embe"
                  min="0"
                  onChange={onchange}
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="">Tổng</label>
                <input
                  type="number"
                  disabled
                  className="form-control"
                  name="tong"
                  value={tong}
                  aria-describedby="helpId"
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <h4 className="my-3">Tổng tiền</h4>
          {tour_ngay.map((ok) => (
            <p key={ok.id}>
              Số tiền cần phải trả:&nbsp;
              <strong>
                {thanhtien(ok.giatreem, ok.giaembe).toLocaleString()}
              </strong>
            </p>
          ))}
        </Modal>
        <Modal
          title="Đặt tour"
          visible={state.visible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
        >
          <h5 className="mb-2">Hình thức thanh toán</h5>
          <Hinhthucthanhtoan callback={callbackfunction} />
          <h5 className="my-2">Điều khoản</h5>
          <div className="dieukhoan">
            <Dieukhoan />
          </div>
          <input
            type="checkbox"
            onChange={onchange}
            className="mt-3"
            name="dieukhoan"
            id="dk"
          />
          <label htmlFor="dk" className="ms-1">
            <strong>Tôi đồng ý với điều khoản ở trên</strong>
          </label>
        </Modal>
      </div>
    </div>
  );
}

export default Tour;
