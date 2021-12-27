import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../trangchu/footer/Footer";
import { useSelector } from "react-redux";
import renderHTML from "react-render-html";

function Tintucdetail() {
  localStorage.setItem("menu", "nothome");
  const { id } = useParams();
  const tintucs = useSelector((state) => state.tintuc.tintuc.data);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const tintuc = [];
  if (tintucs) {
    for (let i = 0; i < tintucs.length; i++) {
      if (tintucs[i].id === +id) {
        tintuc.push(tintucs[i]);
      }
    }
  }
  const formatdate = (e) => {
    if (e) {
      var ngay = e.substr(8, 2);
      var thang = e.substr(5, 2);
      var nam = e.substr(0, 4);
      var gio = e.substr(11, 2);
      var phut = e.substr(14, 2);
      return ngay + "/" + thang + "/" + nam + " " + gio + ":" + phut;
    }
  };
  return (
    <div id="new-detail" className="margin_header">
      <div className="container">
        <div className="breadcrumb">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="fas fa-home mr-2"></i>Trang chủ
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/news">Tin tức</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {tintucs ? tintucs.find((x) => x.id === +id).name : ""}
              </li>
            </ol>
          </nav>
        </div>
        <div className="content-new">
          <div className="container bg-white">
            <div className="row mt-5 mb-5">
              {tintuc.map((ok) => (
                <div className="col-md-12" key={ok.id}>
                  <div className="name-new mb-4">
                    <h2>{ok.name}</h2>
                  </div>
                  <div className="content">
                    {renderHTML(ok.content)}
                    <div className="text-right">
                      <p>
                        <i>
                          <strong>Tác giả: {ok.tacgia}</strong>
                        </i>
                      </p>
                      <p>
                        <i>
                          <strong>Ngày đăng: {formatdate(ok.createdAt)}</strong>
                        </i>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Tintucdetail;
