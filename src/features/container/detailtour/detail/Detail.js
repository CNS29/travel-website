import React from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import Danhgia from "../danhgia/Danhgia";
import Chitiettour from "../chitiettour/Chitiettour";
import Dichvudikem from "../dichvudikem/Dichvudikem";
import Luuy from "../luuy/Luuy";
import Maps from "./../map/Maps";
import Chitietgia from "../gia/Chitietgia";
import "./detail.css";
function Detail(props) {
  const { TabPane } = Tabs;
  return (
    <div className="mb-5 ">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Chi tiết tour" key="1">
          <Chitiettour id={props.id} />
        </TabPane>
        <TabPane tab="Giá" key="2">
          <Chitietgia id={props.id} />
        </TabPane>
        <TabPane tab="Dịch vụ đi kèm" key="3">
          <Dichvudikem id={props.id} />
        </TabPane>
        <TabPane tab="Lưu ý" key="4">
          <Luuy id={props.id} />
        </TabPane>
        <TabPane tab="Bản đồ" key="5">
          <div className="container">
            <Maps id={props.id} />
          </div>
        </TabPane>
        <TabPane tab="Đánh giá khách hàng" key="6">
          <Danhgia id={props.id} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Detail;
