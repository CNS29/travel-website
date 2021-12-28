import { Spin, Table, Button, Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userroleData } from "../header/userroleSlice";
import { roleData, removerole } from "./roleSlice";
function Role() {
  const match = useRouteMatch();
  const history = useHistory();
  const columns = [
    {
      title: "Quyền",
      dataIndex: "name",
    },

    {
      title: "Số lượng",
      dataIndex: "amount",
    },
    {
      title: "Hành động",
      dataIndex: "action",
    },
  ];
  const roles = useSelector((state) => state.role.role.data);
  const loading = useSelector((state) => state.role.loading);
  const dispatch = useDispatch();

  const actionResult = async () => {
    await dispatch(roleData());
  };
  const actionUserrole = async () => {
    await dispatch(userroleData());
  };
  useEffect(() => {
    actionUserrole();
  }, []);
  const userrole = useSelector((state) => state.userrole.userrole.data);

  const countRole = (id) => {
    let admin = [];
    let quanlytintuc = [];
    let quanlybinhluan = [];
    let quanlytour = [];
    let bientapvien = [];
    let nguoidung = [];
    for (let i = 0; i < userrole.length; i++) {
      if (userrole[i].roleId === 1) {
        admin.push(userrole[i]);
      }
      if (userrole[i].roleId === 2) {
        quanlytintuc.push(userrole[i]);
      }
      if (userrole[i].roleId === 3) {
        quanlybinhluan.push(userrole[i]);
      }
      if (userrole[i].roleId === 4) {
        quanlytour.push(userrole[i]);
      }
      if (userrole[i].roleId === 5) {
        nguoidung.push(userrole[i]);
      }
    }
    switch (id) {
      case 1:
        return admin.length;
      case 2:
        return quanlytintuc.length;
      case 3:
        return quanlybinhluan.length;
      case 4:
        return quanlytour.length;
      case 5:
        return nguoidung.length;
      default:
        return 0;
    }
  };
  const handleDelete = (id, users) => {
    if (users !== 0) {
      message.error("Vẫn còn phân quyền cho người dùng.");
      return;
    }
    dispatch(removerole(id));
    setTimeout(() => {
      actionResult();
    }, 500);
  };

  const handleEdit = (id) => {
    history.push(`${match.url}/suarole/${id}`);
  };

  return (
    <div id="admin">
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themrole`}>
            <Button variant="outlined" color="primary">
              <i className="fas fa-plus"></i>&nbsp;&nbsp; Thêm phân quyền
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
            dataSource={roles.map((ok, index) => ({
              key: index + 1,
              name: <span>{ok.name}</span>,
              amount: (
                <span>
                  <b>{userrole ? countRole(ok.id) : "0"}</b>
                </span>
              ),
              action: (
                <div className="action">
                  <Popconfirm
                    title="Bạn có muốn sửa？"
                    onConfirm={() => {
                      handleEdit(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "green" }} />}
                  >
                    <button className="btn btn-warning">Sửa</button>
                  </Popconfirm>
                  <Popconfirm
                    title="Bạn có muốn xoá？"
                    onConfirm={() => {
                      handleDelete(ok.id, countRole(ok.id));
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

Role.propTypes = {};

export default Role;
