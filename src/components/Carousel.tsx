import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import styled from "styled-components";
import ramen from "../assets/ramen1.jpg";

const _customSwiper = styled(Swiper)`
  width: 90%;
  height: 300px;
  .swiper-button-prev,
  .swiper-button-next {
    /* position: fixed; */
    /* top: 240px; */
  }
  .swiper-button-next {
    /* right: 40px; */
  }
  .swiper-button-prev {
    /* left: 40px; */
  }
`;
const _swiperWrapper = styled.div`
  padding: 10px 80px 32px;
  position: relative;
  .swiper-wrapper {
    transition-timing-function: linear !important;
    transition-duration: 500ms !important;
  }
`;

const _card = styled.img`
  border-radius: 20px;
  width: 150px;
  height: 150px;
`;

const _cardTitle = styled.p`
  width: 150px;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const _cardLike = styled.div`
  position: absolute;
  margin-top: -200px;
  margin-left: -100px;
  font-size: 25px;
  color: red;
`;

export default function ShoppingSlide() {
  const [specificBoard, setSpecificBoard] = useState("");
  const tempdb = [
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
  ];
  return (
    <>
      <_swiperWrapper className="swiperWrppaer">
        <_customSwiper
          modules={[Navigation, Pagination]}
          //   spaceBetween={5}
          slidesPerView={5}
          slidesPerGroup={1} // 그룹 당 슬라이드 수 설정
          navigation
          breakpoints={{
            // 1300px 이상일 때
            1300: {
              slidesPerView: 5,
              //   spaceBetween: 30,
            },
            // 1024px 이상일 때
            1024: {
              slidesPerView: 4,
              //   spaceBetween: 10,
            },
            // 768px 이상일 때
            750: {
              slidesPerView: 3,
            },
            375: {
              slidesPerView: 2,
            },
          }}
        >
          {tempdb.map((x) => {
            return (
              <SwiperSlide
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <_cardLike>♥{x.likes}</_cardLike>
                <_card src={x.url} />
                <_cardTitle>{x.title}</_cardTitle>
              </SwiperSlide>
            );
          })}
        </_customSwiper>
      </_swiperWrapper>
    </>
  );
}
