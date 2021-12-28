import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Spin } from "antd";
import renderHTML from "react-render-html";
function Chitiettintuc() {
  const { id } = useParams();
  const history = useHistory();
  const loading = useSelector((state) => state.tintuc.loading);
  const tintuc = useSelector((state) =>
    state.tintuc.tintuc.data.find((x) => x.id === +id)
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
        <h4>Chi tiết tin tức</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="ct">
          {loading ? (
            <div className="spin">
              <Spin className="mt-5" />
            </div>
          ) : (
            <div>
              <p>Ảnh bìa:</p>
              <div className="text-center mb-5">
                <img width="500px" height="400px" src={tintuc.anh} alt="" />
              </div>
              <p>
                <p>
                  Tên tin tức:&emsp;
                  <i>{tintuc.name}</i>
                </p>
                Tên tác giả:&emsp;
                <i>{tintuc.tacgia}</i>
              </p>
              <p>
                Ngày đăng:&emsp;
                <i>{tintuc.createdAt}</i>
              </p>
              <p>
                Facebook:&emsp; <i>{tintuc.facebook}</i>
              </p>
              <p>
                Twitch:&emsp; <i>{tintuc.twitch}</i>
              </p>
              <p>
                Instagram:&emsp; <i>{tintuc.instagram}</i>
              </p>
              <p>Tóm tắt:&emsp;</p>
              <div className="container">
                <p>{tintuc.tomtat}</p>
              </div>
              <p>Nội dung:</p>
              <div className="container">
                <p>{renderHTML(tintuc.content)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chitiettintuc;
