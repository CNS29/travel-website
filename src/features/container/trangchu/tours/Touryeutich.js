import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { validDate, ratingPoint } from "../../../common/commonHandle";

import { Rate, Spin, Tooltip, Button } from "antd";

function Touryeuthich() {
  const binhluans = useSelector((state) => state.binhluan.binhluan.data);
  const tours = useSelector((state) => state.tour.tour.data);
  const [tour, setTour] = useState();

  useEffect(() => {
    if (!(binhluans && tours)) return;
    const tourFavorite = [];
    for (let i = 0; i < tours.length; i++) {
      if (
        tours[i].status === 1 &&
        validDate(tours[i].Ngaydis) &&
        ratingPoint(tours[i].id, binhluans) >= 4
      ) {
        tourFavorite.push(tours[i]);
      }
    }
    setTour(tourFavorite);
  }, [tours, binhluans]);
  console.log(tour);
  return (
    <div className="mt-5 mb-5 tour tour-favor">
      <div className="heading text-center">
        <span>Tour du lịch được yêu thích</span>
      </div>
      <div className="container">
        {!tour ? (
          <div className="text-center py-4">
            <Spin />
          </div>
        ) : (
          <div className="row g-3">
            {tour.map((item) => (
              <div className="col-md-4">
                <div className="tour-favor-item">
                  <img
                    src={item.avatar}
                    className="img-fluid"
                    alt={item.tenanh}
                  />
                  {item.Khuyenmais.length !== 0 &&
                    item.Khuyenmais[0].status === 1 && (
                      <Tooltip
                        placement="right"
                        title={item.Khuyenmais[0].name}
                      >
                        <Button>Giảm {item.Khuyenmais[0].khuyenmai}%</Button>
                      </Tooltip>
                    )}
                  <div className="content_tour">
                    <div className="title_tour text-capitalize">
                      {item.name}
                    </div>
                    <div className="mt-2 d-flex justify-content-between align-items-center">
                      <div className="star">
                        <Rate value={item.rating} disabled />
                      </div>
                    </div>
                  </div>
                </div>
                <Link to={`/tours/${item.id}`} key={item.id}></Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Touryeuthich;
// <Carousel
//   itemClass="pe-3"
//   autoPlay={true}
//   responsive={responsive}
//   draggable={false}
// >
//   {tour.map((item) => (
//     <Link to={`/tours/${ok.id}`} key={ok.id}>
//       <div className="tour-item">
//         {ok.Khuyenmais.length !== 0 && ok.Khuyenmais[0].status === 1 && (
//           <Tooltip placement="right" title={ok.Khuyenmais[0].name}>
//             <div className="ribbon-wrapper">
//               <div className="ribbon-red">
//                 Giảm {ok.Khuyenmais[0].khuyenmai}%
//               </div>
//             </div>
//           </Tooltip>
//         )}
//         <img src={ok.avatar} className="img-fluid" alt="" />
//         <div className="content_tour">
//           <div className="title_tour text-capitalize">{ok.name}</div>
//           <div className="mt-2 d-flex justify-content-between align-items-center">
//             <div className="star">
//               <Rate value={ok.rating} disabled />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   ))}
// </Carousel>
