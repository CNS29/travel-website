import React from "react";
import { useSelector } from "react-redux";
import { Link, Link as Linkrt } from "react-router-dom";
import "./tintuc.css";
function Tintuc() {
  const tintucs = useSelector((state) => state.tintucs.tintuc.data);
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
  // const tomtat1 = (e) => {
  //   var chu = "";
  //   for (let i = 0; i < e.length; i++) {
  //     if (chu.length < 225) {
  //       chu += e[i];
  //     }
  //   }
  //   chu = chu + "...";
  //   return chu;
  // };
  // // const tomtat2 = (e) => {
  // //   var chu = "";
  // //   for (let i = 0; i < e.length; i++) {
  // //     if (chu.length < 140) {
  // //       chu += e[i];
  // //     }
  // //   }
  // //   chu = chu + "...";
  // //   return chu;
  // // };
  return (
    <div id="news">
      <div className="heading text-center">
        <span>
          <Link to="/listtintuc">Tin tức du lịch</Link>
        </span>
        <p className="mt-3 mb-4">
          Cập nhật các tin tức mới nhất về các tour du lịch trong nước và ngoài
          nước một cách nhanh chóng.
        </p>
      </div>
      <div className="container">
        <div className="xem-them">
          <Linkrt to="/news">Xem Thêm</Linkrt>
        </div>
        <div className="row g-3 mb-4">
          {tintuc.map((ok) => (
            <div className="col-sm-4" key={ok.id}>
              <Linkrt to={`/detail-new/${ok.id}`}>
                <div className="news-box">
                  <img src={ok.anh} alt="" />
                  <div className="news_desc">
                    <div className="heading">
                      <strong>{ok.name}</strong>
                    </div>
                    <div className="content-news">
                      <p className="text-justify text-news">{ok.tomtat}</p>
                    </div>
                  </div>
                </div>
              </Linkrt>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Tintuc.propTypes = {};

export default Tintuc;
