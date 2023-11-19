import styled from "styled-components";
import { Link } from "react-router-dom";

import shopping1 from "../assets/shopping1.jpg";
import shopping2 from "../assets/shopping2.jpg";
import shopping3 from "../assets/shopping3.jpg";
import shopping4 from "../assets/shopping4.jpg";
import shopping5 from "../assets/shopping5.jpg";
import listbar from "../assets/listbar.png";
import React, { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const tempdb = [
  {
    title: "사막 여우",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "뷰티",
  },

  {
    title: "식품 시작이이이이아다다다다다다다ㅏ다다",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "식품",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "식품",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "식품",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "식품",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "식품",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "식품",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping2,
    category: "식품",
  },
];

const _listWrapper = styled.div`
  display: flex;
  background-color: white;
  padding: 0px 80px;
  justify-content: center;
`;

const _categoryBar = styled.div`
  cursor: pointer;
  display: flex;
  margin-top: 10px;
`;

const _ul = styled.ul`
  position: relative;
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid black;
  border-radius: 15px;
  justify-content: space-evenly;
  padding: 0px 70px;
  li {
    margin: 10px;
    min-width: 74px;
  }
`;
const _li = styled.li`
  padding: 10px 10px;
`;

const _before = styled.div`
  background-color: black;
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  top: 20px;
  right: 25px;

  &::after {
    content: "";
    width: 5px;
    height: 80px;
    background-color: black;
    position: absolute;
    z-index: 1;
    left: 50%;
    transform: translate(-50%, 0%);
  }
`;
const _after = styled.div`
  background-color: black;
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 40px;
  top: 20px;
  left: 25px;
  &::after {
    content: "";
    width: 5px;
    height: 80px;
    background-color: black;
    position: absolute;
    z-index: 1;

    left: 50%;
    transform: translate(-50%, 0%);
  }
`;

const _productListWrapper = styled.div`
  position: relative;
  /* width: 100%; */
  padding: 0px 80px;
  padding-top: 16px;

  background-color: white;
  &::before {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    top: 40px;
    left: 50px;
    content: "";
    width: 30px;
    height: 46px;
    position: absolute;
    box-shadow: 0px 0px 5px 4px rgb(0 0 0 / 66%);
  }
  &::after {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    top: 40px;
    right: 50px;
    content: "";
    width: 30px;
    height: 46px;
    position: absolute;
    box-shadow: 0px 0px 5px 4px rgb(0 0 0 / 66%);
  }
`;

const _productListBar = styled.div`
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 1;
  box-shadow: 0px -5px 3px 0px rgb(0 0 0 / 66%);
  background-color: #b3a492;
  height: 100px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
`;

const _productDivWrapper = styled.div`
  height: 350px;
  width: 25%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  a {
    width: 95%;
    display: flex;
    text-decoration: none;
    color: black;
    justify-content: center;
  }
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
const _productListWrapper1 = styled.div`
  background-color: #ffda00;
  /* overflow: hidden; */
  z-index: -1;
  position: relative;
  display: flex;
  min-height: 100%; /* 추가된 부분 */
`;

const _imgBar = styled.img<ImgBarProps>`
  width: 100%;
  transform-origin: center bottom;
  animation: none;
  position: absolute;
  @keyframes slideUp {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(40%);
    }
  }
  @keyframes slideDown {
    from {
      transform: translateY(40%);
    }
    to {
      transform: translateY(0%);
    }
  }
`;

const _categoryDiv = styled.div<ImgBarProps>`
  padding-bottom: 120px;
  background-color: #ffda00;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  bottom: 0px;
  position: absolute;
  padding-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  animation-fill-mode: forwards;
  animation: ${(props) => (props.shouldAnimate ? "listDown 1s linear 1 forwards" : "none")};

  @keyframes listDown {
    from {
      bottom: 0px;
    }
    to {
      bottom: -1200px;
    }
  }
  @keyframes listUp {
    from {
      bottom: -1200px;
    }
    to {
      bottom: 0px;
    }
  }
`;
const _endPoint = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  bottom: 0px;
  left: 50%;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

interface ImgBarProps {
  shouldAnimate: boolean;
  divHeigth?: any;
  calculateBottomValue?: (itemCount: number) => number;
  itemCount?: number;
}
export default function ShoppingListTest() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const [filteredItems, setFilteredItems] = useState(tempdb); //필터링 된 상품 리스트
  const [divHeigth, setDivHeigth]: any = useState(); // 상품 목록 Div의 content 높이

  const categoryDiv = useRef<HTMLDivElement>(null);
  const listWrapper = useRef<HTMLDivElement>(null);
  const imgBar = useRef<HTMLImageElement>(null);

  // 현재 ImgBar의 슬라이드 상황
  // True : translateY(0%) -> translateY(40%)
  // false : translateY(40%) -> translateY(0%)
  const handleCategoryClick = async (category: string) => {
    setSelectedCategory(category);

    // 선택한 카테고리를 기반으로 아이템 필터링
    setFilteredItems(tempdb.filter((item) => item.category === category));

    // 상품 목록 Div가 내려가는 조건
    if (shouldAnimate === false && imgBar.current && categoryDiv.current && listWrapper.current) {
      imgBar.current.style.animation = "slideUp 1s linear 1 forwards ";
      categoryDiv.current.style.animation = "listDown 1s linear 1 forwards ";
      const calculatedHeight = categoryDiv.current.offsetHeight;
      setDivHeigth(calculatedHeight);
      console.log(calculatedHeight);
      // scrollIntoView가 작동하는 시간
      setTimeout(() => {
        if (listWrapper.current) {
          listWrapper.current.scrollIntoView({ behavior: "smooth" });
          setShouldAnimate(true);
        }
      }, 300);
    } else if (shouldAnimate === true && imgBar.current && categoryDiv.current) {
      // 상품 목록 Div가 올라가는 조건
      categoryDiv.current.style.animation = "listUp 1s linear 1 forwards ";
      imgBar.current.style.animation = "slideDown 1s linear 1 forwards ";

      setShouldAnimate(false);
    }
  };

  // "위로 올리기 버튼" 작동 함수 => 무조건 상품 목록Div가 올라가야 함
  const handleCloseClick = () => {
    if (categoryDiv.current && imgBar.current) {
      categoryDiv.current.style.animation = "listUp 1s linear 1 forwards ";
      imgBar.current.style.animation = "slideDown 1s linear 1 forwards ";
      setShouldAnimate(false);
    }
  };

  return (
    <>
      <_listWrapper className="listWrapper" ref={listWrapper}>
        <_categoryBar className="categoryBar">
          <_ul>
            {["뷰티", "식품", "주방용품", "생활용품", "인테리어", "가전제품", "문구류", "스포츠", "공구류"].map(
              (category) => (
                <_li key={category} onClick={() => handleCategoryClick(category)}>
                  {category}
                </_li>
              )
            )}
            <_before className="before"></_before>
            <_after className="after"></_after>
          </_ul>
        </_categoryBar>
      </_listWrapper>
      <_productListWrapper className="productListWrapper">
        <_productListBar className="bar">
          <_imgBar src={listbar} alt="" shouldAnimate={shouldAnimate} ref={imgBar} />
        </_productListBar>
        <_productListWrapper1 className="productListWrapper">
          <_categoryDiv className="beautyDiv" ref={categoryDiv} shouldAnimate={shouldAnimate}>
            {filteredItems.map((item) => {
              return (
                <>
                  <_productDivWrapper className="productDivWrapper">
                    {/* encodeURLComponent로 주소 중간에 "/"가 있는것을 알아서 피해감 */}
                    <Link to={`/shopping/${item.category}/${encodeURIComponent(item.title)}`}>
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
                    </Link>
                  </_productDivWrapper>
                </>
              );
            })}
            <_endPoint className="endPoint" onClick={() => handleCloseClick()}>
              <FontAwesomeIcon icon={faArrowUp} fade />
              <span>위로 올리기</span>
            </_endPoint>
          </_categoryDiv>
        </_productListWrapper1>
      </_productListWrapper>
    </>
  );
}
