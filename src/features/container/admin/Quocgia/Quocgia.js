import React from "react";
import { Popconfirm, Spin, Table } from "antd";
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
      title: "tên quốc gia",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  const quocgia = useSelector((state) => state.quocgia.quocgia.data);
  const loading = useSelector((state) => state.quocgia.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(quocgiaData());
  };
  const actionDiadiem = async () => {
    await dispatch(diadiemData());
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

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
  return (
    <div id="admin">
      <div className="heading">
        <h4>Quốc gia</h4>
        <div className="hr"></div>
      </div>
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
              name: (
                <Link to={`${match.url}/chitietquocgia/${ok.id}`}>
                  {ok.name}
                </Link>
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
                    <Link>
                      <button className="btn btn-warning">Sửa</button>
                    </Link>
                  </Popconfirm>
                  <Popconfirm
                    title="Bạn có muốn xoá？"
                    onConfirm={() => {
                      hangdleDelete(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Link>
                      <button className="ms-2 btn btn-danger">Xóa</button>
                    </Link>
                  </Popconfirm>
                </div>
              ),
            }))}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}

export default Quocgia;
