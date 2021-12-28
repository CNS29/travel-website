import React, { useEffect, useState } from "react";
import "./listtintuc.css";
import { Link } from "react-router-dom";
import { Pagination, Spin } from "antd";
import { useSelector } from "react-redux";
import Footer from "../../trangchu/footer/Footer";

export default function Listtintuc() {
  const tintucs = useSelector((state) => state.tintuc.tintuc.data);
  const [page, setPage] = useState(1);
  const [postPage, setPostPage] = useState(6);
  const [tintuc, setTintuc] = useState(null);

  useEffect(() => {
    function getNews() {
      if (!tintucs) return;
      const news = [];
      tintucs.forEach((item) => {
        item.status === 1 && news.push(item);
      });
      setTintuc(news);
    }
    getNews();
    window.scrollTo(0, 0);
  }, [tintucs]);

  const formatdate = (e) => {
    if (!e) return;
    let ngay = e.substr(8, 2);
    let thang = e.substr(5, 2);
    let nam = e.substr(0, 4);
    let gio = e.substr(11, 2);
    let phut = e.substr(14, 2);
    let giay = e.substr(17, 2);
    return `${ngay}/${thang}/${nam} - ${gio}:${phut}:${giay}`;
  };

  const getCurrentPage = (page) => setPage(page);

  let start = (page - 1) * postPage;
  let end = postPage + start;
  return (
    <div id="listtintuc" className="margin_header">
      <div className="container content-new">
        <div className="breadcrumb">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="fas fa-home mr-2"></i>Trang chủ
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Tin tức
              </li>
            </ol>
          </nav>
        </div>
        <div className="title-new mb-5">
          <h2 className="title_name">Tin tức du lịch </h2>
          <h5>Cập nhật các thông tin về tin tức mới nhất</h5>
        </div>
        <div className="box-new ">
          <div className="w-new">
            <div className="row justify-content-center">
              {tintuc ? (
                tintuc.slice(start, end).map((ok) => (
                  <div className="col-md-4 mb-3" key={ok.id}>
                    <Link to={`/detailnews/${ok.id}`}>
                      <div className="news_wrapper">
                        <div className="img-new">
                          <img src={ok.anh} />
                        </div>
                        <div className="title-desc p-3 mt-2">
                          <h4>{ok.name}</h4>
                          <p className="text-justify limit-text">{ok.tomtat}</p>
                          <span>
                            <i className="far fa-clock"></i>{" "}
                            {formatdate(ok.createdAt)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="spin">
                  <Spin className="mt-5" />
                </div>
              )}
              {tintuc && (
                <div className="col-12 my-5 text-center">
                  <Pagination
                    current={page}
                    onChange={getCurrentPage}
                    pageSize={postPage}
                    total={tintuc.length}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
