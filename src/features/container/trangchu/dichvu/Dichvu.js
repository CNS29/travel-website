import React from "react";
import { useSelector } from "react-redux";
import "./dichvu.css";
import "../../../../fixed.css";
function Dichvu() {
  const dichvus = useSelector((state) => state.dichvus.dichvu.data);
  var dichvu = [];
  if (dichvus) {
    for (let i = 0; i < dichvus.length; i++) {
      if (dichvus[i].status === 1 && dichvus[i].loadhome === 1) {
        dichvu.push(dichvus[i]);
      }
    }
  }
  return (
    <div id="dichvu">
      <div className="mb-5 tour">
        <div className="heading text-center pt-5">
          <span>Các dịch vụ nổi bật</span>
          <p className="mt-3 mb-4">
            Các dịch vụ mà công ty sẽ cung cấp trong quá trình khách hàng sử
            dụng tour.
          </p>
        </div>
        <div className="container">
          <div className="row justify-content-center pb-5 text-center">
            {dichvu.length !== 0 &&
              dichvu.map((ok) => (
                <div className="col-md-4" key={ok.id}>
                  <div className="icon">
                    <span className={ok.icon}></span>
                  </div>
                  <div className="content-dv">
                    <strong>{ok.name}</strong>
                    <p>{ok.mota}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Dichvu.propTypes = {};

export default Dichvu;
