import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import {
  Modal,
  Popconfirm,
  Spin,
  Table,
  Checkbox,
  Row,
  Col,
  Radio,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import tourkhuyenmaiApi from "../../../../api/tourKhuyenmaiApi";
import { tourData } from "../Tour/tourSlice";
import {
  khuyenmaiData,
  removekhuyenmai,
  updatekhuyenmai,
} from "./khuyenmaiSlice";
function Khuyenmai() {
  const match = useRouteMatch();
  const columns = [
    {
      title: "Tên khuyến mãi",
      dataIndex: "name",
    },
    {
      title: "Khuyến mãi",
      dataIndex: "khuyenmai",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Hành động",
      dataIndex: "action",
    },
  ];
  const khuyenmais = useSelector((state) => state.khuyenmai.khuyenmai.data);
  const loading = useSelector((state) => state.khuyenmai.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(khuyenmaiData());
  };
  const actionTour = async () => {
    await dispatch(tourData());
  };
  useEffect(() => {
    actionResult();
  }, []);
  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removekhuyenmai(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.push(`${match.url}/suakhuyenmai/${id}`);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatekhuyenmai({ status: 0, idsua: id }));
    } else {
      dispatch(updatekhuyenmai({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
      actionTour();
    }, 500);
  };

  return (
    <div id="admin">
      <div className="heading">
        <h4>Khuyễn mãi</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themkhuyenmai`}>
            <Button variant="outlined" color="primary">
              <i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm khuyến mãi
            </Button>
          </Link>
        </div>
        <div className="add"></div>
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={khuyenmais.map((ok, index) => ({
              key: index + 1,
              name: <span>{ok.name}</span>,
              khuyenmai: <span>{ok.khuyenmai}%</span>,
              status: (
                <div className="action">
                  {ok.status === 1 ? (
                    <span
                      onClick={() => {
                        handleStatus(ok.status, ok.id);
                      }}
                    >
                      <i className="badge rounded-pill bg-success">Kích hoạt</i>
                    </span>
                  ) : (
                    <span onClick={() => handleStatus(ok.status, ok.id)}>
                      <i className="badge rounded-pill bg-secondary">Ẩn</i>
                    </span>
                  )}
                </div>
              ),
              action: (
                <div className="action">
                  <Popconfirm
                    title="Bạn có muốn sửa？"
                    onConfirm={() => {
                      hangdleEdit(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                  >
                    <button className="btn btn-warning">Sửa</button>
                  </Popconfirm>
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

export default Khuyenmai;
