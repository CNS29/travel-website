import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button } from "@material-ui/core";
import { Image, Popconfirm, Spin, Table, Radio, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { ngaydiData } from "../Ngaydi/ngaydiSlice";
import { removetour, updatetour } from "./tourSlice";
import { tourData } from "./tourSlice";
import tourkhuyenmaiApi from "../../../../api/tourKhuyenmaiApi";
import { khuyenmaiData } from "../Khuyenmai/khuyenmaiSlice";
function Tour() {
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const tours = useSelector((state) => state.tour.tour.data);
  const khuyenmais = useSelector((state) => state.khuyenmai.khuyenmai.data);
  var tour = [];
  if (tours) {
    var sort = [];
    for (let i = 0; i < tours.length; i++) {
      sort.unshift(tours[i]);
    }
    tour = sort;
  }
  const loading = useSelector((state) => state.tour.Loading);
  const history = useHistory();
  const actionResult = async () => await dispatch(tourData());
  const actionngaydi = async () => await dispatch(ngaydiData());
  useEffect(() => {
    actionResult();
    actionngaydi();
    actionKhuyenMai();
  }, []);

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "anh",
    },
    {
      title: "Tên Tour",
      dataIndex: "name",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
    },
    {
      title: "Khuyến mãi",
      dataIndex: "khuyenmai",
    },
    {
      title: "Hành động",
      dataIndex: "action",
    },
  ];

  const hangdleDelete = (e) => {
    dispatch(removetour(e));
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const hangdleEdit = (id) => {
    history.push(`${match.url}/suatour/${id}`);
  };
  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updatetour({ status: 0, idsua: id }));
    } else {
      dispatch(updatetour({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };

  const [khuyenmaiId, setKhuyenmaId] = useState();
  const [tourId, setTourId] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id) => {
    setTourId(id);
    setIsModalVisible(true);
  };

  const onChangeRadio = (e) => {
    setKhuyenmaId(e.target.value);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = async () => {
    if (khuyenmaiId === "0") {
      await tourkhuyenmaiApi.deletetourkhuyenmai(tourId);
      message.success("Huỷ khuyến mãi thành công!");
    } else {
      let data = [];
      if (tourId) {
        await tourkhuyenmaiApi.deletetourkhuyenmai(tourId);
        data.push({ khuyenmaiId: khuyenmaiId, tourId: tourId });
      }
      await tourkhuyenmaiApi.posttourkhuyenmai(data);
    }
    setTimeout(() => {
      actionResult();
    }, 500);
    setIsModalVisible(false);
  };

  const actionKhuyenMai = () => {
    dispatch(khuyenmaiData());
  };

  return (
    <div id="admin">
      <div className="content">
        <div className="add">
          <Link to={`${match.url}/themtour`}>
            <Button variant="outlined" color="primary">
              <i className="fas fa-plus"></i>&nbsp;&nbsp; Tạo Tour
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
            pagination={{ pageSize: 4 }}
            dataSource={tour.map((ok, index) => ({
              key: index + 1,
              name: (
                <Link to={`${match.url}/chitiettour/${ok.id}`}>{ok.name}</Link>
              ),
              anh: <Image src={ok.avatar} alt={ok.tenanh} />,
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
                    title="Bạn có muốn sửa？"
                    onConfirm={() => {
                      hangdleEdit(ok.id);
                    }}
                    icon={<QuestionCircleOutlined style={{ color: "green" }} />}
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
                    <button className="ms-2 btn btn-danger">Xóa</button>
                  </Popconfirm>
                </div>
              ),
              khuyenmai: (
                <button
                  onClick={() => showModal(ok.id)}
                  type="button"
                  className="btn btn-primary"
                >
                  {ok.Khuyenmais[0]
                    ? ok.Khuyenmais[0].name
                    : "Không có khuyến mãi"}
                </button>
              ),
            }))}
          />
        )}
      </div>
      <Modal
        title="Thêm khuyến mãi"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div>
                <h5 className="text-center">Chọn khuyến mãi</h5>
                <Radio.Group onChange={onChangeRadio}>
                  <Radio style={{ width: "100%" }} value="0">
                    Huỷ khuyến mãi
                  </Radio>
                  {khuyenmais &&
                    khuyenmais.map(
                      (ok) =>
                        ok.status === 1 && (
                          <Radio style={{ width: "100%" }} value={ok.id}>
                            {ok.name}
                          </Radio>
                        )
                    )}
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Tour;
