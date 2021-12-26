import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "./banner.css";

function Banner() {
  const anh = useSelector((state) => state.anh.anh.data);
  const [banner, setBanner] = useState();

  useEffect(() => {
    if (!anh) return;
    const newBanner = [];
    for (let i = 0; i < anh.length; i++) {
      if (anh[i].banner === 1) {
        newBanner.push(anh[i]);
      }
    }
    setBanner(newBanner);
  }, [anh]);

  return (
    <div id="banner">
      <i className="fas fa-chevron-down"></i>
      <Swiper
        speed={3000}
        slidesPerView={1}
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 2500,
          waitForTransition: true,
          disableOnInteraction: false,
        }}
        navigation={true}
      >
        {banner &&
          banner.map((item, index) => (
            <SwiperSlide key={index}>
              {
                <div className="banner_image">
                  <img src={item.link} alt={item.tenanh} />
                </div>
              }
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Banner;
