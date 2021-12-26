import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
function Chitietquocgia() {
  const { id } = useParams();
  const history = useHistory();
  const quocgia = useSelector((state) => {
    if (state.quocgia.quocgia.data) {
      return state.quocgia.quocgia.data.find((x) => x.id === +id);
    }
  });
  const backPage = () => {
    history.goBack();
  };
  return (
    <div id="admin">
      <button onClick={backPage} className="btn btn-primary">
        Quay lại
      </button>
      <div className="heading">
        <h4>Chi tiết quốc gia</h4>
        <div className="hr"></div>
      </div>
      <div className="content">
        <div className="ct">
          {quocgia === "ko" ? (
            <div className="spin">
              <Spin />
            </div>
          ) : (
            <div>
              <p>
                Tên quốc gia:&emsp;{" "}
                <b>
                  <i>{quocgia.name}</i>
                </b>
              </p>
              <p>Các địa điểm: </p>
              {quocgia.Diadiems.map((oki) => (
                <div>
                  <strong>- &emsp;{oki.name}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Chitietquocgia.propTypes = {};

export default Chitietquocgia;
