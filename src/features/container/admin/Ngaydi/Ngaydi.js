import React, { useEffect, useState } from "react";
import { DatePicker, message, Popconfirm, Space, Spin, Table } from "antd";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  addngaydi,
  ngaydiData,
  removengaydi,
  updatengaydi,
} from "./ngaydiSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./ngaydi.css";
function Ngaydi() {
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "ngay",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const [date, setdate] = useState("");
  function onChange(date, dateStrings) {
    setdate(dateStrings);
  }
  const addDate = () => {
    if (date === "") {
      message.error("Bạn chưa nhập đầy đủ thông tin!");
    } else {
      if (ngaydi.find((x) => x.ngay === date)) {
        message.warning("Thời gian đã tồn tại!");
      } else {
        dispatch(addngaydi({ ngay: date, status: 1 }));
        setTimeout(() => {
          actionResult();
        }, 500);
      }
    }
  };
  const ngaydi = useSelector((state) => state.ngaydi.ngaydi.data);
  const loading = useSelector((state) => state.ngaydi.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(ngaydiData());
  };

  const hangdleDelete = (e) => {
    dispatch(removengaydi(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };

  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatengaydi({ status: 0, idsua: id }));
    } else {
      dispatch(updatengaydi({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  return (
    <div id="admin">
      <div className="content">
        <div className="add">
          <Space direction="vertical">
            <DatePicker className="me-3" id="date" onChange={onChange} />
          </Space>
          <Button variant="outlined" color="primary" onClick={addDate}>
            <i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm ngày đi
          </Button>
        </div>
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={ngaydi.map((ok, index) => ({
              key: index + 1,
              ngay: <span>{ok.ngay}</span>,
              status: (
                <div className="action">
                  {ok.status === 1 ? (
                    <span
                      onClick={() => {
                        handleStatus(ok.status, ok.id);
                      }}
                    >
                      <span className="badge rounded-pill bg-success">
                        Kích hoạt
                      </span>
                    </span>
                  ) : (
                    <span onClick={() => handleStatus(ok.status, ok.id)}>
                      <span className="badge rounded-pill bg-secondary">
                        Ẩn
                      </span>
                    </span>
                  )}
                </div>
              ),
              action: (
                <div className="action">
                  <Popconfirm
                    title="Bạn có muốn xoá？"
                    onConfirm={() => {
                      hangdleDelete(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <button className="ms-2 btn btn-danger">Xóa</button>
                  </Popconfirm>
                </div>
              ),
            }))}
          />
        )}
      </div>
    </div>
  );
}

Ngaydi.propTypes = {};

export default Ngaydi;
