import { Tabs } from "antd";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../footer/Footer";
import Duyettour from "./duyettour/Duyettour";
import Lichsu from "./lichsu/Lichsu";

export default function Thongtin() {
  const { id } = useParams();
  const [state] = useState({ tabPosition: "top" });

  const { TabPane } = Tabs;
  const { tabPosition } = state;
  return (
    <div>
      <div className="breadcrumb mt-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home mr-2"></i>Trang chủ
              </Link>
            </li>
            <li className="breadcrumb-item">Thông tin</li>
          </ol>
        </nav>
      </div>
      <div className="container">
        <div className="row">
          {!id ? null : (
            <Tabs
              defaultActiveKey={+id === 0 ? "1" : "2"}
              tabPosition={tabPosition}
            >
              <TabPane tab="Tour đã đặt" key="1">
                <Lichsu />
              </TabPane>
              <TabPane tab="Duyệt tour" key="2">
                <Duyettour />
              </TabPane>
            </Tabs>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
