import { Image, Spin, Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { anhData, updateanh } from "./anhSlice";
function Anh() {
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "link",
    },
    {
      title: "Tour",
      dataIndex: "name",
    },
    {
      title: "Banner",
      dataIndex: "banner",
    },
  ];
  const anhs = useSelector((state) => state.anh.anh.data);
  const loading = useSelector((state) => state.anh.loading);
  const dispatch = useDispatch();
  const actionResult = async () => {
    await dispatch(anhData());
  };

  const handleStatus = (e, id) => {
    if (e === 1) {
      dispatch(updateanh({ status: 0, idsua: id }));
    } else {
      dispatch(updateanh({ status: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  const handleBanner = (e, id) => {
    if (e === 1) {
      dispatch(updateanh({ banner: 0, idsua: id }));
    } else {
      dispatch(updateanh({ banner: 1, idsua: id }));
    }
    setTimeout(() => {
      actionResult();
    }, 500);
  };
  return (
    <div id="admin">
      <div className="heading">
        <h4>Ảnh</h4>
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
            dataSource={anhs.map((ok, index) => ({
              key: index + 1,
              name: <span>{ok.Tour.name}</span>,
              link: <Image src={ok.link} width="200px" height="150px" alt="" />,
              banner: (
                <div className="action">
                  {ok.banner === 1 ? (
                    <span
                      onClick={() => {
                        handleBanner(ok.banner, ok.id);
                      }}
                    >
                      <i className="badge rounded-pill bg-success">Kích hoạt</i>
                    </span>
                  ) : (
                    <span onClick={() => handleBanner(ok.banner, ok.id)}>
                      <i className="badge rounded-pill bg-secondary">Ẩn</i>
                    </span>
                  )}
                </div>
              ),
            }))}
          />
        )}
      </div>
    </div>
  );
}
export default Anh;
