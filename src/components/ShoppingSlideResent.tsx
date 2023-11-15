import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import "swiper/swiper-bundle.css";
import styled from "styled-components";
import shopping1 from "../assets/shopping1.jpg";
import shopping2 from "../assets/shopping2.jpg";
import shopping3 from "../assets/shopping3.jpg";
import shopping4 from "../assets/shopping4.jpg";
import shopping5 from "../assets/shopping5.jpg";

// Swiper Custom
const _customSwiper = styled(Swiper)`
  width: 90%;
  height: 350px;
  margin: 0 !important;
  padding: 0px 50px;
  // 슬라이드 버튼
  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 110px;
  }
  .swiper-button-next {
    right: 0px;
  }
  .swiper-button-prev {
    left: 0px;
  }
  img {
    border-radius: 15px;
    width: 100%;
    height: 95%;
  }
  span {
    display: -webkit-box;
    text-align: left;
    -webkit-line-clamp: 2; /* 표시할 줄 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 10px;
    white-space: pre-line; /* 공백 유지 */
    min-height: 42px;
  }
`;
// SwiperSlide Custom
const _customSwiperSlide = styled(SwiperSlide)`
  height: 220px;
`;

const _favoriteDiv = styled.div`
  display: flex;
  position: absolute;
  top: 15px;
  left: 15px;
  p {
    margin: 0;
  }
`;

// 아이콘 커스텀
const _customFontAwesome = styled(FontAwesomeIcon)`
  font-size: 25px;
  margin-right: 7px;
`;

const _swiperWrapper = styled.div`
  padding: 20px 80px 32px;
  position: relative;
  .swiper-wrapper {
    transition-timing-function: linear !important;
    transition-duration: 500ms !important;
  }
`;

const _contentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const _productInfos = styled.div`
  display: flex;
  margin-top: 10px;
`;

const _perDiv = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: red;
`;
const _priceDiv = styled.div`
  margin-left: 15px;
  margin-top: 5px;
`;

const _initPriceDiv = styled.div`
  text-decoration: line-through;
`;
const _realPriceDiv = styled.div`
  font-weight: 700;
  margin-top: 5px;
`;

export default function ShoppingSlideResent() {
  return (
    <>
      <_swiperWrapper className="swiperWrppaer">
        <_customSwiper
          modules={[Navigation, Pagination]}
          spaceBetween={50} // 이미지 간격
          slidesPerView={5} // 한번에 보이는 이미지 수
          slidesPerGroup={1} // 그룹 당 슬라이드 수 설정
          navigation
        >
          <_customSwiperSlide className="swiperslide">
            <_contentWrapper className="contentWrapper">
              <_favoriteDiv className="favoriteDiv">
                <_customFontAwesome icon={faHeart} />
                <p>97</p>
              </_favoriteDiv>
              <img src={shopping1} alt="이미지1" />
              <span>부침개 논란 종결 해물파전/김치전 반반 너무너무너무너무 맛있어요요요요요요</span>
              <_productInfos>
                <_perDiv className="perDiv">14%</_perDiv>
                <_priceDiv className="priceDiv">
                  <_initPriceDiv className="initPriceDiv">10,000원</_initPriceDiv>
                  <_realPriceDiv className="realPriceDiv">8,600원</_realPriceDiv>
                </_priceDiv>
              </_productInfos>
            </_contentWrapper>
          </_customSwiperSlide>
          <_customSwiperSlide>
            <_contentWrapper className="contentWrapper">
              <_favoriteDiv className="favoriteDiv">
                <_customFontAwesome icon={faHeart} />
                <p>97</p>
              </_favoriteDiv>
              <img src={shopping2} alt="이미지1" />
              <span>부침개 논란 종결 해물파전/김치전 반반</span>
              <_productInfos>
                <_perDiv className="perDiv">14%</_perDiv>
                <_priceDiv className="priceDiv">
                  <_initPriceDiv className="initPriceDiv">10,000원</_initPriceDiv>
                  <_realPriceDiv className="realPriceDiv">8,600원</_realPriceDiv>
                </_priceDiv>
              </_productInfos>
            </_contentWrapper>
          </_customSwiperSlide>
          <_customSwiperSlide>
            <_contentWrapper className="contentWrapper">
              <img src={shopping3} alt="이미지1" />
              <span>부침개 논란 종결 해물파전</span>
              <_productInfos>
                <_perDiv className="perDiv">14%</_perDiv>
                <_priceDiv className="priceDiv">
                  <_initPriceDiv className="initPriceDiv">10,000원</_initPriceDiv>
                  <_realPriceDiv className="realPriceDiv">8,600원</_realPriceDiv>
                </_priceDiv>
              </_productInfos>
            </_contentWrapper>
          </_customSwiperSlide>
          <_customSwiperSlide>
            <_contentWrapper className="contentWrapper">
              <img src={shopping4} alt="이미지1" />
              <span>부침개 논란 종결 해물파전/김치전 반반</span>
              <_productInfos>
                <_perDiv className="perDiv">14%</_perDiv>
                <_priceDiv className="priceDiv">
                  <_initPriceDiv className="initPriceDiv">10,000원</_initPriceDiv>
                  <_realPriceDiv className="realPriceDiv">8,600원</_realPriceDiv>
                </_priceDiv>
              </_productInfos>
            </_contentWrapper>
          </_customSwiperSlide>
          <_customSwiperSlide>
            <_contentWrapper className="contentWrapper">
              <img src={shopping5} alt="이미지1" />
              <span>부침개 논란 종결</span>
              <_productInfos>
                <_perDiv className="perDiv">14%</_perDiv>
                <_priceDiv className="priceDiv">
                  <_initPriceDiv className="initPriceDiv">10,000원</_initPriceDiv>
                  <_realPriceDiv className="realPriceDiv">8,600원</_realPriceDiv>
                </_priceDiv>
              </_productInfos>
            </_contentWrapper>
          </_customSwiperSlide>
          <_customSwiperSlide>
            <_contentWrapper className="contentWrapper">
              <img src={shopping1} alt="이미지1" />
              <span>부침개 논란 종결 해물파전/김치전 반반</span>
              <_productInfos>
                <_perDiv className="perDiv">14%</_perDiv>
                <_priceDiv className="priceDiv">
                  <_initPriceDiv className="initPriceDiv">10,000원</_initPriceDiv>
                  <_realPriceDiv className="realPriceDiv">8,600원</_realPriceDiv>
                </_priceDiv>
              </_productInfos>
            </_contentWrapper>
          </_customSwiperSlide>
        </_customSwiper>
      </_swiperWrapper>
    </>
  );
}
