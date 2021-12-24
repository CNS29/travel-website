import React, { useEffect, useState } from "react";
import { Select, Pagination } from "antd";
import Search from "antd/lib/input/Search";
import { Link } from "react-router-dom";
import Footer from "../trangchu/footer/Footer";
import "./listtour.css";
import { useSelector } from "react-redux";

export default function Listtour() {
  const binhluans = useSelector((state) => state.binhluans.binhluan.data);
  const tours = useSelector((state) => state.tours.tour.data);
  const typeTours = useSelector((state) => state.loaitours.loaitour.data);
  const [dataTours, setDataTours] = useState({
    tourIn: [],
    tourOut: [],
  });
  const [state, setState] = useState({
    check: "trong",
    statetrongnuoc: "",
    statenuocngoai: "",
    rateSearch: -1,
    inputSearch: "",
    tagSearch: -1,
  });

  const [page, setPage] = useState(1);
  const [postPage, setPostPage] = useState(6);

  const formatDate = (e) => {
    if (!e) return;
    let [day, month, year] = e.split("/");
    return `${year}-${month}-${day}`;
  };

  // 1/ YYYY-MM-DD: 2020-11-09 >= 2020-10-11 true
  // 2/ DD-MM-YYYY: 09-11-2020 >= 11-10-2020 false
  // So sánh từ trái sang nên định dạng kiểu 1.
  const validDate = (e) => {
    if (!e) return;
    let ngayMax = formatDate(e[0].ngay);
    for (let i = 0; i < e.length; i++) {
      if (ngayMax <= formatDate(e[i].ngay)) {
        ngayMax = formatDate(e[i].ngay);
      }
    }
    return ngayMax;
  };

  const tinhdiem = (id) => {
    var binhluanload = [];
    if (binhluans) {
      for (let i = 0; i < binhluans.length; i++) {
        if (binhluans[i].status === +1 && binhluans[i].tourId === id) {
          binhluanload.push(binhluans[i]);
        }
      }
    }
    var tong = 0;
    if (binhluans) {
      for (let i = 0; i < binhluanload.length; i++) {
        tong += binhluanload[i].star;
      }
    }
    var diem = Math.round((tong / +binhluanload.length) * 10) / 10;
    if (isNaN(diem)) {
      diem = 0;
    }
    return diem;
  };

  function getCurrentDay() {
    let date = new Date();
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 > 10 ? date.getMonth() + 1 : "0" + date.getMonth();
    let day = date.getDate() > 10 ? date.getDate() : "0" + date.getDate();
    return `${year}-${month}-${day}`;
  }

  function getCurrentPage(page) {
    setPage(page);
  }

  useEffect(() => {
    function checkValidTour() {
      if (!tours) return;
      let tourtrongnuoc = [];
      let tournuocngoai = [];
      for (let i = 0; i < tours.length; i++) {
        if (
          tours[i].status !== 1 ||
          validDate(tours[i].Ngaydis) <= getCurrentDay()
        ) {
          continue;
        }
        if (tours[i].vitri === 1) {
          tourtrongnuoc.push(tours[i]);
        }
        if (tours[i].vitri === 2) {
          tournuocngoai.push(tours[i]);
        }
      }
      setDataTours({
        tourIn: tourtrongnuoc,
        tourOut: tournuocngoai,
      });
      setState({
        ...state,
        statetrongnuoc: tourtrongnuoc,
        statenuocngoai: tournuocngoai,
      });
    }
    checkValidTour();
    window.scrollTo(0, 0);
  }, [tours]);

  const handleChange = (value) => {
    setState({
      ...state,
      check: value,
      rateSearch: -1,
      inputSearch: "",
      tagSearch: -1,
    });
  };

  const search = (value) => {
    let str = value.replace(/\s+/g, " ").trim().toLowerCase();
    const { rateSearch, tagSearch } = state;
    if (str === "" && tagSearch === -1 && rateSearch === -1) {
      resetData();
      return;
    }
    filterTour(str, rateSearch, tagSearch);
  };

  const resetData = () => {
    setState({
      ...state,
      rateSearch: -1,
      inputSearch: "",
      tagSearch: -1,
      statetrongnuoc: dataTours.tourIn,
      statenuocngoai: dataTours.tourOut,
    });
    return;
  };

  const findLoaiTour = (arr, id) => {
    if (arr.length === 0 || +id === -1) return true;
    return arr.find((item) => item.id === +id);
  };
  const findRateTour = (id, rate) => {
    if (+rate === -1) return true;
    return Math.floor(tinhdiem(id)) === rate;
  };

  const filterTour = (searchInput, rate, tagId) => {
    let arr = [];
    if (state.check === "trong") {
      dataTours.tourIn.forEach((item) => {
        item.name.toLowerCase().search(searchInput) !== -1 &&
          findRateTour(item.id, rate) &&
          findLoaiTour(item.Loaitours, tagId) &&
          arr.push(item);
      });
    } else {
      dataTours.tourOut.forEach((item) => {
        item.name.toLowerCase().search(searchInput) !== -1 &&
          findRateTour(item.id, rate) &&
          findLoaiTour(item.Loaitours, tagId) &&
          arr.push(item);
      });
    }

    setState({
      ...state,
      inputSearch: searchInput,
      rateSearch: rate,
      tagSearch: tagId,
      [state.check === "trong" ? "statetrongnuoc" : "statenuocngoai"]: arr,
    });
  };

  const checkStar = (value) => {
    const { inputSearch, tagSearch } = state;
    if (inputSearch === "" && tagSearch === -1 && +value === -1) {
      resetData();
      return;
    }
    filterTour(inputSearch, +value, tagSearch);
  };

  const filterTypeTour = (value) => {
    const { inputSearch, rateSearch } = state;
    if (inputSearch === "" && rateSearch === -1 && +value === -1) {
      resetData();
      return;
    }
    filterTour(inputSearch, rateSearch, +value);
  };

  const tinhkhuyenmai = (money, km) => {
    return (money - money * (km / 100)).toLocaleString() + "VNĐ";
  };

  let start = (page - 1) * postPage;
  let end = postPage + start;

  return (
    <div id="list-tour">
      <div className="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="fas fa-home mr-2"></i>Trang chủ
              </Link>
            </li>
            <li className="breadcrumb-item active">Tour du lịch</li>
          </ol>
        </nav>
      </div>
      <div className="title-new mb-5">
        <h2 className="title_name">Tour Du Lịch</h2>
        <h5>Trải nghiệm chuyến đi</h5>
      </div>
      <div className="container">
        <div className="row gy-4 mb-4 bg-white rounded">
          <div className="col-md-3">
            <h4 className="pt-4 text-center text-uppercase">Chọn lọc</h4>
            <hr />
            <Search placeholder="Tìm kiếm tour" onSearch={search} enterButton />
            <Select
              className="w-100 mt-4"
              defaultValue="trong"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Select.Option value="trong">Tour trong nước</Select.Option>
              <Select.Option value="ngoai">Tour nước ngoài</Select.Option>
            </Select>
            <Select
              className="w-100 mt-4"
              style={{ width: 120 }}
              onChange={checkStar}
              value={`${state.rateSearch}`}
            >
              <Select.Option value="-1">Chọn theo đánh giá</Select.Option>
              <Select.Option value="0">0 sao</Select.Option>
              <Select.Option value="1">1 sao</Select.Option>
              <Select.Option value="2">2 sao</Select.Option>
              <Select.Option value="3">3 sao</Select.Option>
              <Select.Option value="4">4 sao</Select.Option>
              <Select.Option value="5">5 sao</Select.Option>
            </Select>
            <hr />
            <div className="mt-4">
              <button
                type="button"
                className={`btn btn-outline-primary btn-sm mb-2 me-2 ${
                  state.tagSearch === -1 && "active"
                }`}
                onClick={() => filterTypeTour(-1)}
              >
                Tất cả
              </button>
              {typeTours
                ? typeTours.map((item, index) => {
                    return (
                      <button
                        key={index}
                        type="button"
                        className={`btn btn-outline-primary btn-sm mb-2 me-2 ${
                          state.tagSearch === item.id && "active"
                        }`}
                        onClick={() => filterTypeTour(item.id)}
                      >
                        {item.name}
                      </button>
                    );
                  })
                : null}
            </div>
          </div>
          <div className="col-md-9">
            <div className="box-tour">
              <div className="container">
                <div className="row g-3">
                  {state.check === "trong"
                    ? state.statetrongnuoc &&
                      state.statetrongnuoc
                        .slice(start, end)
                        .map((ok, index) => (
                          <div className="col-lg-4 col-md-6 col-12" key={index}>
                            <Link to={`/tours/${ok.id}`} className="link-tours">
                              <div className="img rounded">
                                <img
                                  src={ok.avatar}
                                  className="img-fluid"
                                  alt=""
                                />
                                <div className="content-tour">
                                  <div className="title-tour">{ok.name}</div>
                                  <div className="mt-2">
                                    <div className="money d-flex justify-content-between mt-3">
                                      <div>
                                        Giá:&nbsp;&nbsp;
                                        {ok.Khuyenmais[0] &&
                                          tinhkhuyenmai(
                                            ok.gianguoilon,
                                            ok.Khuyenmais[0].khuyenmai
                                          )}
                                        <span
                                          className={`${
                                            ok.Khuyenmais[0]
                                              ? "money-discount"
                                              : ""
                                          }`}
                                        >
                                          {ok.gianguoilon.toLocaleString()}
                                          VNĐ
                                        </span>
                                      </div>
                                      <p>{ok.thoigian} Ngày</p>
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between mt-3">
                                    <div className="star">
                                      Đánh giá:&nbsp;
                                      <i className="fas fa-star"></i>
                                      {tinhdiem(ok.id)}
                                    </div>
                                    <div className="persion">
                                      Số người:&nbsp;{ok.songuoi}
                                    </div>
                                  </div>
                                  <div className="mt-3">
                                    {ok.Loaitours.map((ok, index) => (
                                      <p
                                        key={index}
                                        className="badge bg-primary m-1"
                                      >
                                        {ok.name}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {ok.Khuyenmais[0] ? (
                                <div className="tag-discount">
                                  Giảm giá
                                  <div className="anotation">
                                    {ok.Khuyenmais[0] && ok.Khuyenmais[0].name}
                                  </div>
                                </div>
                              ) : null}
                            </Link>
                          </div>
                        ))
                    : state.statenuocngoai &&
                      state.statenuocngoai
                        .slice(start, end)
                        .map((ok, index) => (
                          <div className="col-lg-4 col-md-6 col-12" key={index}>
                            <Link to={`/tours/${ok.id}`} className="link-tours">
                              <div className="img rounded">
                                <img
                                  src={ok.avatar}
                                  className="img-fluid"
                                  alt=""
                                />
                                <div className="content-tour">
                                  <div className="title-tour">{ok.name}</div>
                                  <div className="mt-2">
                                    <div className="money d-flex justify-content-between mt-3">
                                      Giá:
                                      <div>
                                        {ok.Khuyenmais[0] &&
                                          tinhkhuyenmai(
                                            ok.gianguoilon,
                                            ok.Khuyenmais[0].khuyenmai
                                          )}
                                      </div>
                                      <div
                                        className={`${
                                          ok.Khuyenmais[0]
                                            ? "money-discount"
                                            : ""
                                        }`}
                                      >
                                        {ok.gianguoilon.toLocaleString()} VNĐ
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex justify-content-between mt-3">
                                    <div className="star">
                                      Đánh giá:&nbsp;
                                      <i className="fas fa-star"></i>
                                      {tinhdiem(ok.id)}
                                    </div>
                                    <div className="persion">
                                      Số người:&nbsp;{ok.songuoi}
                                    </div>
                                  </div>
                                  <div className="mt-3">
                                    {ok.Loaitours.map((ok, index) => (
                                      <p
                                        key={index}
                                        className="badge bg-primary m-1"
                                      >
                                        {ok.name}
                                      </p>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              {ok.Khuyenmais[0] ? (
                                <div className="tag-discount">
                                  Giảm giá
                                  <div className="anotation">
                                    {ok.Khuyenmais[0] && ok.Khuyenmais[0].name}
                                  </div>
                                </div>
                              ) : null}
                            </Link>
                          </div>
                        ))}
                  <div className="col-12 mt-5 text-center">
                    <Pagination
                      current={page}
                      onChange={getCurrentPage}
                      pageSize={postPage}
                      total={
                        state.check === "trong"
                          ? state.statetrongnuoc.length
                          : state.statenuocngoai.length
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
