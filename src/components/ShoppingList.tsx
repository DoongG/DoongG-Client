import styled from "styled-components";
import shopping1 from "../assets/shopping1.jpg";
import shopping2 from "../assets/shopping2.jpg";
import shopping3 from "../assets/shopping3.jpg";
import shopping4 from "../assets/shopping4.jpg";
import shopping5 from "../assets/shopping5.jpg";
import React, { useEffect, useRef, useState } from "react";

const tempdb = [
  {
    title: "부침개 논라 종결 해물파전/김치전 반반ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },

  {
    title: "식품 시작이이이이아다다다다다다다ㅏ다다",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "foods",
  },
];

const _productListWrapper = styled.div`
  padding-right: 170px;
  padding-left: 50px;
  position: relative;
`;

const _categoryDiv = styled.div`
  padding-top: 70px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const _productDivWrapper = styled.div`
  height: 350px;
  width: 25%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const _productDiv = styled.div`
  width: 95%;
`;
const _imgDiv = styled.div`
  height: 70%;
`;
const _img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const _infosDiv = styled.div`
  margin-top: 5px;
  text-align: left;
`;

const _price = styled.div`
  display: flex;
`;
const _per = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: red;
`;
const _priceDiv = styled.div`
  margin-left: 15px;
  margin-top: 5px;
`;

const _title = styled.div`
  min-height: 43px;
`;

const _initPriceDiv = styled.div`
  text-decoration: line-through;
`;
const _realPriceDiv = styled.div`
  font-weight: 700;
  margin-top: 5px;
`;

const _categoryBar = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  margin-right: 35px;
  right: 0px;
`;

const _ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid black;
  border-radius: 15px;
  :last-child {
    border-bottom: none;
  }
  li {
    border-bottom: 1px solid black;
  }
`;
const _li = styled.li`
  padding: 10px 0px;
`;

export default function ShoppingList() {
  const floatingBar = useRef<HTMLDivElement>(null);
  const productListWrapper = useRef<HTMLDivElement>(null);
  const beauty = useRef<HTMLDivElement>(null);
  const food = useRef<HTMLDivElement>(null);

  // 스크롤 이벤트 감지
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  //스크롤 위치에 따라 floatingBar의 top을 조절
  const handleScroll = () => {
    if (productListWrapper.current && floatingBar.current) {
      // viewport에 따른 productListWrapper의 높이값(스크롤에 따라 변함)
      const productListWrapperRect = productListWrapper.current.getBoundingClientRect().top;
      // productListWrapper의 고정된 높이값
      const hap = productListWrapper.current.getBoundingClientRect().top + window.pageYOffset;
      // 현재 스크롤의 높이
      const scrollY = window.scrollY;
      if (productListWrapperRect <= 0) {
        floatingBar.current.style.top = `${scrollY - hap + 150}px`;
        floatingBar.current.style.transition = "all 0.4s ease-in-out";
      } else {
        floatingBar.current.style.top = "100px";
      }
    }
  };

  const scrollGoto = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const category = e.currentTarget.className.split(" ").pop();

    let targetRef = null;
    switch (category) {
      case "beauty":
        targetRef = beauty;
        break;
      case "food":
        targetRef = food;
        break;
      // 필요한 경우 다른 카테고리에 대한 케이스 추가

      default:
        break;
    }

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <_productListWrapper ref={productListWrapper} className="productListWrapper">
        <_categoryDiv ref={beauty} className="beautyDiv">
          {tempdb
            .filter((item) => {
              return item.category === "shopping";
            })
            .map((item) => {
              return (
                <>
                  <_productDivWrapper className="productDivWrapper">
                    <_productDiv className="productDiv">
                      <_imgDiv className="imgDiv">
                        <_img src={item.img}></_img>
                      </_imgDiv>
                      <_infosDiv className="infosDiv">
                        <_title className="title">{item.title}</_title>
                        <_price className="price">
                          <_per className="per">14%</_per>
                          <_priceDiv>
                            <_initPriceDiv className="beforePrice">{item.realCost}</_initPriceDiv>
                            <_realPriceDiv className="afterPrice">{item.discountCost}</_realPriceDiv>
                          </_priceDiv>
                        </_price>
                      </_infosDiv>
                    </_productDiv>
                  </_productDivWrapper>
                </>
              );
            })}
        </_categoryDiv>
        <_categoryDiv ref={food} className="foodsDiv">
          {tempdb
            .filter((item) => {
              return item.category === "foods";
            })
            .map((item) => {
              return (
                <>
                  <_productDivWrapper className="productDivWrapper">
                    <_productDiv className="productDiv">
                      <_imgDiv className="imgDiv">
                        <_img src={item.img}></_img>
                      </_imgDiv>
                      <_infosDiv className="infosDiv">
                        <_title className="title">{item.title}</_title>
                        <_price className="price">
                          <_per className="per">14%</_per>
                          <_priceDiv>
                            <_initPriceDiv className="beforePrice">{item.realCost}</_initPriceDiv>
                            <_realPriceDiv className="afterPrice">{item.discountCost}</_realPriceDiv>
                          </_priceDiv>
                        </_price>
                      </_infosDiv>
                    </_productDiv>
                  </_productDivWrapper>
                </>
              );
            })}
        </_categoryDiv>
        <_categoryBar ref={floatingBar} className="categoryBar">
          <_ul>
            <_li className="beauty" onClick={scrollGoto}>
              뷰티
            </_li>
            <_li className="food" onClick={scrollGoto}>
              식품
            </_li>
            <_li>생활용품</_li>
            <_li>인테리어</_li>
            <_li>가전제품</_li>
            <_li>문구류</_li>
            <_li>스포츠</_li>
            <_li>공구류</_li>
          </_ul>
        </_categoryBar>
      </_productListWrapper>
    </>
  );
}
