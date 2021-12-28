import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import { Popconfirm, Spin, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { loaitourData, removeloaitour, updateloaitour } from "./loaitourSlice";
function Loaitour(props) {
  const match = useRouteMatch();

  const columns = [
    {
      title: "Loại tour",
      dataIndex: "name",
    },
    {
      title: "Hành động",
      dataIndex: "action",
    },
  ];
  const loaitours = useSelector((state) => state.loaitour.loaitour.data);
  const loading = useSelector((state) => state.loaitour.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(loaitourData());
  };

  const history = useHistory();
  const hangdleDelete = (e) => {
    dispatch(removeloaitour(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.push(`${match.url}/sualoaitour/${id}`);
  };

  return (
    <div id="admin">
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themloaitour`}>
            <Button variant="outlined" color="primary">
              <i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm loại tour
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
            dataSource={loaitours.map((ok, index) => ({
              key: index + 1,
              name: <span>{ok.name}</span>,
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

export default Loaitour;
