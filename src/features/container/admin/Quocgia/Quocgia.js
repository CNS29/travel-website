import React, { useState } from "react";
import { Popconfirm, Spin, Table, Modal } from "antd";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { quocgiaData, removequocgia } from "./quocgiaSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { diadiemData } from "../DiaDiem/diadiemSlice";
function Quocgia() {
  const match = useRouteMatch();

  const columns = [
    {
      title: "Tên quốc gia",
      dataIndex: "name",
    },
    {
      title: "Hành động",
      dataIndex: "action",
    },
  ];

  const quocgia = useSelector((state) => state.quocgia.quocgia.data);
  const loading = useSelector((state) => state.quocgia.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(quocgiaData());
  };
  const actionDiadiem = async () => {
    await dispatch(diadiemData());
  };

  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removequocgia(e));
    setTimeout(() => {
      actionResult();
      actionDiadiem();
    }, 500);
  };

  const hangdleEdit = (id) => {
    history.push(`${match.url}/suaquocgia/${id}`);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailNation, setDetailNation] = useState();

  const showModal = (data) => {
    setIsModalVisible(true);
    setDetailNation(data);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div id="admin">
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themquocgia`}>
            <Button variant="outlined" color="primary">
              <i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm quốc gia
            </Button>
          </Link>
        </div>
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={quocgia.map((ok, index) => ({
              key: index + 1,
              name: <p>{ok.name}</p>,
              action: (
                <div className="action">
                  <Popconfirm
                    title="Bạn có muốn sửa？"
                    onConfirm={() => {
                      hangdleEdit(ok.id);
                    }}
                  >
                    <button className="btn btn-warning text-light">Sửa</button>
                  </Popconfirm>
                  <Popconfirm
                    title="Bạn có muốn xoá？"
                    onConfirm={() => {
                      hangdleDelete(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <button className="mx-3 btn btn-danger">Xóa</button>
                  </Popconfirm>
                  <button
                    onClick={() => showModal(ok)}
                    className="btn btn-info text-light"
                  >
                    Xem chi tiết
                  </button>
                </div>
              ),
            }))}
          />
        )}
      </div>
      <Modal
        title={detailNation ? detailNation.name : ""}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {detailNation && (
          <div>
            <p>Các địa điểm: </p>
            {detailNation.Diadiems.map((oki) => (
              <p>+&emsp;{oki.name}</p>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Quocgia;
