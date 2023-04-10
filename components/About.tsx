import React from "react";
import { AboutCard } from "./AboutCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

export const About = () => {
  let arr = [1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 11, 2, 3];
  return (
    <div>
      <div className="p-2 text-center bg-secondary text-white">
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
        <p>
          Resize the browser window to see that this page is responsive by the
          way.
        </p>
      </div>
      <h2 className="text-center">Our Team</h2>
      <div className="d-flex gap-3 about-card-padding">
        <Swiper
          // loop={true}
          slidesPerView="auto"
          spaceBetween={2}
          centeredSlides={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              centeredSlides: true,
            },
            376: {
              centeredSlides: false,
            },
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {arr.map((e, i) => {
            return (
              <SwiperSlide key={i}>
                <AboutCard />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
