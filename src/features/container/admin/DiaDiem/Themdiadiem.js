import { Button } from "@material-ui/core";
import { message, Select, Spin } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { quocgiaData } from "../Quocgia/quocgiaSlice";
import { adddiadiem, diadiemData, updatediadiem } from "./diadiemSlice";

function Themdiadiem(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const diadiem = useSelector((state) =>
    state.diadiem.diadiem.data.find((x) => x.id === +id)
  );
  useEffect(() => {
    if (id) {
      setState({
        ...state,
        status: diadiem.status,
        name: diadiem.name,
        quocgiaId: diadiem.quocgiaId,
        idsua: id,
      });
    }
  }, []);
  const [state, setState] = useState({
    name: "",
    quocgiaId: "",
    status: 1,
    idsua: "",
  });
  const quocgias = useSelector((state) => state.quocgia.quocgia.data);

  const loading = useSelector((state) => state.quocgia.loading);
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const actionResult = async () => {
    await dispatch(diadiemData());
  };
  const actionQuocgia = async () => {
    await dispatch(quocgiaData());
  };
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || quocgiaId === "") {
      message.error("Xin hãy nhập đầy đủ thông tin!");
    } else {
      if (id) {
        dispatch(updatediadiem(state));
      } else {
        dispatch(adddiadiem(state));
      }
      setTimeout(() => {
        actionResult();
        actionQuocgia();
      }, 700);
      history.push("/admin/diadiem");
    }
  };
  const onId = (e) => {
    setState({
      ...state,
      quocgiaId: e,
    });
  };
  const backPage = () => {
    history.goBack();
  };
  const { name, quocgiaId } = state;
  return (
    <div id="admin">
      <button onClick={backPage} className="btn btn-primary">
        Quay lại
      </button>
      <div className="heading">
        <h4>{id ? "Sửa địa điểm" : "Thêm địa điểm"}</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <form action="" method="post" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlhtmlFor="">Quốc gia</label>
            <br />
            {loading ? (
              <span>
                <Select className="w-25 ml-4"></Select>
                <Spin />
              </span>
            ) : (
              <Select value={quocgiaId} onChange={onId} className="w-25 ml-4">
                {quocgias.map((ok) => (
                  <Option key={ok.id} value={ok.id}>
                    {" "}
                    {ok.name}
                  </Option>
                ))}
              </Select>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="">Địa điểm</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control w-50"
              placeholder=""
              aria-describedby="helpId"
            />
          </div>
          <div className="text-center mtb">
            <Button color="primary" type="submit" variant="contained">
              {id ? "Sửa địa điểm" : "Thêm địa điểm"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Themdiadiem.propTypes = {};

export default Themdiadiem;
