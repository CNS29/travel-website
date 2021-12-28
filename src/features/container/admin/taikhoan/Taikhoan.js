import React, { useEffect, useState } from "react";
import { Image, Modal, Popconfirm, Spin, Table } from "antd";
import { Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "./taikhoanSlice";
import noImg from "../../../images/noImg.png";
import { Radio } from "antd";
import taikhoanApi from "../../../../api/taikhoanApi";
import userroleApi from "../../../../api/userroleApi";
function Taikhoan() {
  const match = useRouteMatch();

  const columns = [
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    // {
    //   title: "Tình trạng",
    //   dataIndex: "status",
    // },
    {
      title: "Quyền",
      dataIndex: "role",
    },
    {
      title: "Hành động",
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
    let inforadmin = await taikhoanApi.getOneAdmin(userId).then((ok) => {
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
  // const handleStatus = (e, id) => {
  //   if (e === 1) {
  //     dispatch(updateuser({ status: 0, id: id }));
  //   } else {
  //     dispatch(updateuser({ status: 1, id: id }));
  //   }
  //   setTimeout(() => {
  //     actionResult();
  //   }, 500);
  // };
  const chuhoa = (e) => {
    return e.charAt(0).toUpperCase() + e.slice(1);
  };
  const [value, setValue] = useState(6);
  return (
    <div id="admin">
      <div className="content">
        {loading ? (
          <div className="spin">
            <Spin className="mt-5" />
          </div>
        ) : (
          <Table
            columns={columns}
            pagination={{ pageSize: 4 }}
            dataSource={users.map((ok, index) => ({
              key: index + 1,
              name: (
                <Link to={`${match.url}/chitiettaikhoan/${ok.id}`}>
                  {ok.name}
                </Link>
              ),
              email: <span>{ok.email}</span>,
              avatar: ok.avatar ? (
                <Image src={ok.avatar} alt={ok.tenanh} />
              ) : (
                <Image src={noImg} alt="avatar" />
              ),
              // status: (
              //   <div className="action">
              //     {ok.status === 1 ? (
              //       <span
              //         onClick={() => {
              //           handleStatus(ok.status, ok.id);
              //         }}
              //       >
              //         <span className="badge rounded-pill bg-success">
              //           Kích hoạt
              //         </span>
              //       </span>
              //     ) : (
              //       <span onClick={() => handleStatus(ok.status, ok.id)}>
              //         <span className="badge rounded-pill bg-secondary">
              //           Ẩn
              //         </span>
              //       </span>
              //     )}
              //   </div>
              // ),
              role:
                ok.Roles[0].name === "admin" ? (
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
                    title="Phân quyền truy cập cho tài khoản"
                    onConfirm={() => {
                      hangdleUpdate(ok.id);
                    }}
                  >
                    <button className="btn btn-warning text-light">
                      Cấp quyền
                    </button>
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
