import React, { useEffect, useState } from "react";
import { Modal, Progress } from "antd";
import { Button } from "@material-ui/core";
import "./doanhthu.css";
import { useDispatch, useSelector } from "react-redux";
import { chitieuData } from "./chitieuSlice";
import { userData } from "../taikhoan/taikhoanSlice";
import chitieuApi from "../../../../api/chitieuApi";

export default function Doanhthu() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState({
    chitieuthang: "",
    chitieungay: "",
    chitieunam: "",
  });
  // const [usd, setusd] = useState(1);
  const usd = 23000;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    chitieuApi.editchitieu({
      idsua: 1,
      chitieungay: state.chitieungay,
      chitieuthang: state.chitieuthang,
      chitieunam: state.chitieunam,
    });
  };

  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(userData());
  };
  const actionChitiet = async () => await dispatch(chitieuData());
  const chitieu = useSelector((state) => state.chitieu.chitieu.data);
  useEffect(() => {
    actionResult();
    if (chitieu) {
      setState({
        ...state,
        chitieungay: chitieu[0].chitieungay,
        chitieuthang: chitieu[0].chitieuthang,
        chitieunam: chitieu[0].chitieunam,
      });
    } else {
      actionChitiet();
    }
  }, [chitieu]);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const SoNguoiDung = useSelector((state) => state.taikhoan.user.data);
  const HoaDon = useSelector((state) => state.hoadon.hoadon.data);
  let HoaDonDate = [];
  if (HoaDon) {
    for (let i = 0; i < HoaDon.length; i++) {
      let date = new Date(HoaDon[i].createdAt);
      HoaDonDate.push({
        id: HoaDon[i].id,
        tongtien: HoaDon[i].thanhtien,
        date:
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
          "-" +
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          "-" +
          date.getFullYear(),
      });
    }
  }
  let ThuNhapHomNay = 0;
  if (HoaDonDate) {
    let date = new Date();
    let dateToday =
      (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
      "-" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    for (let i = 0; i < HoaDonDate.length; i++) {
      if (HoaDonDate[i].date === dateToday) {
        ThuNhapHomNay += HoaDonDate[i].tongtien;
      }
    }
  }
  let ThuNhapThang = 0;
  if (HoaDonDate) {
    let date = new Date();
    let dateMonth =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    for (let i = 0; i < HoaDonDate.length; i++) {
      if (HoaDonDate[i].date.substr(3) === dateMonth) {
        ThuNhapThang += HoaDonDate[i].tongtien;
      }
    }
  }
  let ThuNhapNam = 0;
  if (HoaDonDate) {
    let date = new Date();
    let dateYear = date.getFullYear();
    for (let i = 0; i < HoaDonDate.length; i++) {
      if (+HoaDonDate[i].date.substr(6) === dateYear) {
        ThuNhapNam += HoaDonDate[i].tongtien;
      }
    }
  }
  let TongThuNhap = 0;
  if (HoaDon) {
    for (let i = 0; i < HoaDon.length; i++) {
      TongThuNhap += HoaDon[i].thanhtien;
    }
  }
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  let thunhap = Number((TongThuNhap / usd).toFixed(0));
  const { chitieunam, chitieuthang, chitieungay } = state;
  return (
    <div id="doanhthu">
      <div className="row">
        <div className="col-md-6">
          <div className="doanhthu_item">
            <span>
              <strong>T???ng thu nh???p</strong>
              <p>$ {TongThuNhap ? thunhap.toLocaleString() : 0}</p>
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="doanhthu_item">
            <span>
              <strong>T???ng ng?????i d??ng</strong>
              <p>{SoNguoiDung ? SoNguoiDung.length : 0}</p>
            </span>
          </div>
        </div>
      </div>
      <table class="table table-borderless table-hover">
        <thead>
          <tr>
            <th>Ch??? ti??u</th>
            <th>Ti???n l???i nhu???n</th>
            <th>Ch??? ti??u ?????t ra</th>
            <th>Ch??? ti??u c??n l???i</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>L???i nhu???n ng??y</th>
            <td>{ThuNhapHomNay.toLocaleString()}&nbsp;VN??</td>
            <td>{chitieungay.toLocaleString()}&nbsp;VN??</td>
            <td>{(ThuNhapHomNay - chitieungay).toLocaleString()}&nbsp;VN??</td>
          </tr>
          <tr>
            <th>L???i nhu???n th??ng</th>
            <td>{ThuNhapThang.toLocaleString()}&nbsp;VN??</td>
            <td>{chitieuthang.toLocaleString()}&nbsp;VN??</td>
            <td>{(ThuNhapThang - chitieuthang).toLocaleString()}&nbsp;VN??</td>
          </tr>
          <tr>
            <th>L???i nhu???n n??m</th>
            <td>{ThuNhapNam.toLocaleString()}&nbsp;VN??</td>
            <td>{chitieunam.toLocaleString()}&nbsp;VN??</td>
            <td>{(ThuNhapNam - chitieunam).toLocaleString()}&nbsp;VN??</td>
          </tr>
        </tbody>
      </table>
      <Button
        className="float-right mt-4"
        onClick={showModal}
        variant="outlined"
        color="primary"
      >
        ?????t ch??? ti??u
      </Button>
      <Modal
        title="?????t ch??? ti??u"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="form-group">
          <label>Ch??? ti??u ng??y</label>
          <input
            type="number"
            name="chitieungay"
            value={chitieungay}
            onChange={onChange}
            id=""
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
          />
        </div>

        <div className="form-group">
          <label>Ch??? ti??u th??ng</label>
          <input
            type="number"
            name="chitieuthang"
            value={chitieuthang}
            onChange={onChange}
            id=""
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
          />
        </div>
        <div className="form-group">
          <label>Ch??? ti??u n??m</label>
          <input
            type="number"
            name="chitieunam"
            value={chitieunam}
            onChange={onChange}
            id=""
            className="form-control"
            placeholder=""
            aria-describedby="helpId"
          />
        </div>
      </Modal>
    </div>
  );
}

{
  /* <div className="row my-3">
<div className="col-md">
  <div className="float-left mr-2">
    <div className="icon">
      <i className="fas fa-dollar-sign"></i>
    </div>
  </div>
  <div className="monney">
    <span>T???ng thu nh???p</span>
    <br />
    <span>
      <strong>$ {TongThuNhap ? thunhap.toLocaleString() : 0}</strong>
    </span>
  </div>
</div>
<div className="col-md">
  <div className="float-left mr-2">
    <div className="icon">
      <i className="fas fa-users"></i>
    </div>
  </div>
  <div className="monney">
    <span>T???ng ng?????i d??ng</span>
    <br />
    <span>
      <strong>{SoNguoiDung ? SoNguoiDung.length : 0}</strong>
    </span>
  </div>
</div>
</div> */
}
