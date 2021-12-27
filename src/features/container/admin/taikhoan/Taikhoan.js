import React, { useEffect, useState } from "react";
import { Image, Modal, Popconfirm, Spin, Table } from "antd";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateuser, userData } from "./taikhoanSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import mainAvatar from "../../../images/avatar.jpg";
import { Radio } from "antd";
import taikhoanApi from "../../../../api/taikhoanApi";
import userroleApi from "../../../../api/userroleApi";
function Taikhoan() {
  const match = useRouteMatch();

  const columns = [
    {
      title: "tên",
      dataIndex: "name",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "ảnh",
      dataIndex: "avatar",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Quyền",
      dataIndex: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const users = useSelector((state) => state.taikhoan.user.data);
  const loading = useSelector((state) => state.taikhoan.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(userData());
  };
  useEffect(() => {
    actionResult();
  }, []);
  const [userId, setUseId] = useState();
  const hangdleUpdate = (e) => {
    setUseId(e);
    setIsModalVisible(true);
  };
  const roles = useSelector((state) => state.role.role.data);
  const handleOk = async () => {
    var inforadmin = await taikhoanApi.getOneAdmin(userId).then((ok) => {
      return ok;
    });
    await userroleApi.edituserrole({ idsua: inforadmin.id, roleId: value });
    actionResult();
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChangeRadio = (e) => {
    setValue(e.target.value);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updateuser({ status: 0, idsua: id }));
    } else {
      dispatch(updateuser({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const chuhoa = (e) => {
    return e.charAt(0).toUpperCase() + e.slice(1);
  };
  const [value, setValue] = useState(6);
  return (
    <div id="admin">
      <div className="heading">
        <h4>Quản lý tài khoản</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={users.map((ok, index) => ({
              key: index + 1,
              name: (
                <Link to={`${match.url}/chitiettaikhoan/${ok.id}`}>
                  {ok.name}
                </Link>
              ),
              email: <span>{ok.email}</span>,
              avatar: ok.avatar ? (
                <Image width="100px" height="120px" src={ok.avatar} alt="" />
              ) : (
                <Image width="100px" height="120px" src={mainAvatar} alt="" />
              ),
              status: (
                <div className="action">
                  {ok.status === 1 ? (
                    <span
                      onClick={() => {
                        handleStatus(ok.status, ok.id);
                      }}
                    >
                      <i className="far fa-thumbs-up text-primary"></i>
                    </span>
                  ) : (
                    <span onClick={() => handleStatus(ok.status, ok.id)}>
                      <i className="far fa-thumbs-down "></i>
                    </span>
                  )}
                </div>
              ),
              role:
                ok.Roles.name === "admin" ? (
                  <span className="text-danger">
                    <b>{chuhoa(ok.Roles[0].name)}</b>
                  </span>
                ) : (
                  <span className="text-success">
                    <b>{chuhoa(ok.Roles[0].name)}</b>
                  </span>
                ),
              action: (
                <div className="action">
                  <Popconfirm
                    title="Bạn muốn cấp quyền truy cập cho tài khoản này？"
                    onConfirm={() => {
                      hangdleUpdate(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <i className="fas fa-user-lock text-warning"></i>
                  </Popconfirm>
                </div>
              ),
            }))}
          />
        )}
        <Modal
          title="Cấp quyền truy cập hệ thống"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Radio.Group onChange={onChangeRadio} value={value}>
            {!roles
              ? ""
              : roles.map((ok) => (
                  <Radio style={radioStyle} key={ok.id} value={ok.id}>
                    <span>
                      {ok.name === "user" ? "Người dùng" : chuhoa(ok.name)}
                    </span>
                  </Radio>
                ))}
          </Radio.Group>
        </Modal>
      </div>
    </div>
  );
}

Taikhoan.propTypes = {};

export default Taikhoan;
