import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import renderHTML from "react-render-html";
import { useParams, useHistory } from "react-router-dom";
function Chitietquocgia() {
  const { id } = useParams();
  const history = useHistory();
  const tour = useSelector((state) =>
    state.tour.tour.data.find((x) => x.id === +id)
  );
  const backPage = () => {
    history.goBack();
  };
  return (
    <div id="admin">
      <button onClick={backPage} className="btn btn-primary">
        Quay lại
      </button>
      <div className="heading">
        <h4>Chi tiết tour</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="ct">
          {!tour ? (
            <div className="spin">
              <Spin className="mt-5" />
            </div>
          ) : (
            <div>
              <p className="mb-4">
                <strong>Tên tour:&emsp;</strong>
                <b>
                  <i>{tour.name}</i>
                </b>
              </p>
              <p className="mb-4">
                <strong>Avatar</strong>
                <br />
                <img
                  width="350px"
                  height="393px"
                  src={tour.avatar}
                  alt={tour.tenanh}
                />
              </p>
              <p className="mb-4">
                <strong>Giá tiền người lớn:&emsp;</strong>
                <b>
                  <i>{tour.gianguoilon}</i>
                </b>
              </p>
              <p className="mb-4">
                <strong> Giá trẻ em:&emsp;</strong>
                <b>
                  <i>{tour.giatreem}</i>
                </b>
              </p>
              <p className="mb-4">
                <strong>Giá em bé:&emsp;</strong>
                <b>
                  <i>{tour.giaembe}</i>
                </b>
              </p>
              <strong className="mb-4">Banner:</strong>
              {tour.Anhs.map((oki) => (
                <div className="text-center mb-3" key={oki}>
                  <img src={oki.link} width="500px" height="400px" alt="" />
                </div>
              ))}
              <strong className="mb-4">Bản đồ:&emsp; </strong>
              <div
                id="map-container-google-1"
                className="z-depth-1-half map-container mb-3"
              >
                {renderHTML(tour.bando)}
              </div>
              <div className="mt-4">
                <strong className="text-justify ">
                  Chi tiết tour:&emsp; {renderHTML(tour.chitiettour)}
                </strong>
              </div>
              <div className="mt-4">
                <strong className="text-justify ">
                  Lưu ý:&emsp; {renderHTML(tour.luuy)}
                </strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chitietquocgia;
