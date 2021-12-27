import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./tintuc.css";
function Tintuc() {
  const tintucs = useSelector((state) => state.tintuc.tintuc.data);
  const tintuc = [];
  if (tintucs) {
    var sort = [];
    for (let i = 0; i < tintucs.length; i++) {
      if (tintucs[i].status === 1) {
        sort.unshift(tintucs[i]);
      }
    }
    for (let i = 0; i < 6; i++) {
      tintuc.push(sort[i]);
    }
  }
  return (
    <div id="news">
      <div className="container">
        <h1 className="tour_title">Tin tức du lịch</h1>
        <p className="tour_sub-title">
          Cập nhật các tin tức mới nhất về các tour du lịch trong nước và ngoài.
        </p>
        <div className="row g-3 mb-4">
          {tintuc.map((ok) => (
            <div className="col-sm-4" key={ok.id}>
              <Link to={`/detail-new/${ok.id}`}>
                <div className="news-box">
                  <img src={ok.anh} alt={ok.tenanh} />
                  <div className="news_desc">
                    <div className="heading">
                      <strong>{ok.name}</strong>
                    </div>
                    <div className="content-news">
                      <p className="text-justify text-news">{ok.tomtat}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Tintuc;
