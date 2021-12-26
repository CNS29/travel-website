import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import { Image, message, Popconfirm, Spin, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import "./tintuc.css";
import { removetintuc, tintucData, updatetintuc } from "./tintucSlice";
function Tintuc() {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const tintucs = useSelector((state) => state.tintuc.tintuc.data);
  const loading = useSelector((state) => state.tintuc.Loading);

  var sort = [];
  if (tintucs) {
    for (let i = 0; i < tintucs.length; i++) {
      sort.unshift(tintucs[i]);
    }
  }
  const actionResult = async () => await dispatch(tintucData());
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "anh",
    },
    {
      title: "Tiêu đề",
      dataIndex: "name",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
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

  const hangdleDelete = (e) => {
    if (users.role === "biên tập viên") {
      message.warning("Bạn không có đủ quyền để thực thi!");
    } else {
      dispatch(removetintuc(e));
      setTimeout(() => {
        actionResult();
      }, 500);
    }
  };
  const users = useSelector((state) => state.infor.infor.data);
  const hangdleEdit = (id) => {
    if (users.role === "biên tập viên") {
      message.warning("Bạn không có đủ quyền để thực thi!");
    } else {
      history.push(`${match.url}/suatintuc/${id}`);
    }
  };
  const handleStatus = (e, id) => {
    if (users.role === "biên tập viên") {
      message.warning("Bạn không có đủ quyền để thực thi!");
    } else {
      if (e === 1) {
        dispatch(updatetintuc({ status: 0, id: id }));
      } else {
        dispatch(updatetintuc({ status: 1, id: id }));
      }
      setTimeout(() => {
        actionResult();
      }, 500);
    }
  };

  return (
    <div id="admin">
      <div className="heading">
        <h4>Quản lý tin tức</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themtintuc`}>
            <Button variant="outlined" color="primary">
              <i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm bài đăng
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
            dataSource={sort.map((ok, index) => ({
              key: index + 1,
              name: (
                <Link to={`${match.url}/chitiettintuc/${ok.id}`}>
                  {ok.name}
                </Link>
              ),
              author: <span>{ok.tacgia}</span>,
              anh: <Image src={ok.anh} width="200px" height="150px" alt="" />,
              status: (
                <div className="action">
                  {ok.status === 1 ? (
                    <span
                      onClick={() => {
                        handleStatus(ok.status, ok.id);
                      }}
                    >
                      <i class="badge rounded-pill bg-success">Kích hoạt</i>
                    </span>
                  ) : (
                    <span onClick={() => handleStatus(ok.status, ok.id)}>
                      <i class="badge rounded-pill bg-secondary">Ẩn</i>
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

Tintuc.propTypes = {};

export default Tintuc;
