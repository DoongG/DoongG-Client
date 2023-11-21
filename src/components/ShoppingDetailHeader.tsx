import styled from "styled-components";
import { useParams } from "react-router-dom";
import fox from "../assets/fox.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import eyes from "../assets/eyes.png";
import { useState } from "react";
import { Link } from "react-router-dom";

// 카테고리 경로
const _headerWrapper = styled.div`
  padding: 40px 80px 20px;
  color: #9c9a9a;
  font-size: 13px;
  a {
    text-decoration: none;
    color: #9c9a9a;
    cursor: default;
  }
  ul {
    cursor: default;
    display: flex;
    padding: 0px;
    margin: 0px;
    list-style: none;
  }
  div {
    padding: 0px 10px;
  }
`;

// 상품 이미지박스
const _productInfoBox = styled.div`
  padding: 0px 80px;
  display: flex;

  img {
    width: 100%;
    height: 100%;
  }
`;

const _imgBox = styled.div`
  flex: 1;
`;

const _productInfos = styled.div`
  cursor: default;
  flex: 1;
  padding-left: 40px;
  position: relative;
`;

const _category = styled.div`
  color: #9c9a9a;
  text-align: left;
`;

const _title = styled.div`
  font-weight: 700;
  font-size: 36px;
  text-align: left;
`;

// 아이콘 커스텀
const _customFontAwesome = styled(FontAwesomeIcon)`
  font-size: 20px;
  margin-right: 5px;
`;

const _heartAndViewBox = styled.div`
  font-size: 15px;
  padding-top: 10px;
  display: flex;
  align-items: center;
`;
const _heartBox = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const _viewBox = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 5px;
    width: 20px;
  }
`;

// 가격 박스
const _priceBox = styled.div`
  text-align: left;
  margin-top: 30px;
`;

const _beforePrice = styled.div`
  display: flex;
`;
const _per = styled.div`
  margin-right: 10px;
`;
const _price = styled.div`
  text-decoration: line-through;
  color: grey;
`;
const _afterPrice = styled.div`
  font-weight: 500;
  font-size: 30px;
`;

const _countBox = styled.div`
  margin-top: 50px;
  display: flex;
`;
const _minus = styled.button`
  padding: 10px 13px;
  border: 1px solid #8080801f;
  background-color: #8080801f;
`;

const _count = styled.button`
  padding: 10px 18px;
  border: 1px solid #8080801f;
  background-color: #f9f9f9;
`;
const _plus = styled.button`
  padding: 10px 13px;
  border: 1px solid #8080801f;
  background-color: #8080801f;
`;

const _buyBox = styled.div`
  position: absolute;
  margin-top: 50px;
  display: flex;
  bottom: 0px;
`;
const _cart = styled.button`
  color: white;
  font-weight: 700;
  font-size: 14px;
  min-width: 190px;
  padding: 15px 50px;
  border: 1px solid #8080801f;
  background-color: #3128288f;
  border-radius: 10px;
  margin-right: 10px;
`;
const _buy = styled.button`
  color: white;
  font-weight: 700;
  font-size: 14px;
  min-width: 190px;
  padding: 15px 50px;
  border: 1px solid #8080801f;
  background-color: #3128288f;
  border-radius: 10px;
  margin-right: 10px;
`;

const ShoppingDetailHeader = () => {
  // useParams에 제대로된 타입을 넘겨줌
  const { category, title } = useParams() as { category: string; title: string };

  const decodedTitle = decodeURIComponent(title);

  // 천 단위 쉼표 추가 함수
  const addCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 수량과 가격 상태
  const [count, setCount] = useState(1);
  const [beforePrice, setbeforePrice] = useState(10000);
  const [afterPrice, setAfterPrice] = useState(8000);

  // 마이너스 버튼
  const handleMinusClick = () => {
    if (count > 1) {
      setCount(count - 1);
      setAfterPrice(afterPrice - 8000);
      setbeforePrice(beforePrice - 10000);
    }
  };

  // 플러스 버튼
  const handlePlusClick = () => {
    setCount(count + 1);
    setAfterPrice(afterPrice + 8000);
    setbeforePrice(beforePrice + 10000);
  };
  return (
    <>
      <_headerWrapper className="HeaderWrapper">
        <ul>
          <Link to={"/"}>
            <li>HOME</li>
          </Link>
          <div>{">"}</div>
          <Link to={"/shopping"}>
            <li>SHOP</li>
          </Link>
          <div>{">"}</div>
          <li>{decodedTitle}</li>
        </ul>
      </_headerWrapper>
      <_productInfoBox className="productInfoBox">
        <_imgBox className="imgBox">
          <img src={fox} alt="" />
        </_imgBox>
        <_productInfos className="productInfos">
          <_category className="category">{category}</_category>
          <_title className="title">{decodedTitle}</_title>
          <_heartAndViewBox className="heartAndViewBox">
            <_heartBox className="heartBox">
              <_customFontAwesome icon={faHeart} />
              <div className="heart">11</div>
            </_heartBox>
            <_viewBox className="viewBox">
              <img src={eyes} alt="" />
              <div className="view">214</div>
            </_viewBox>
          </_heartAndViewBox>
          <_priceBox className="priceBox">
            <_beforePrice className="beforePrice">
              <_per className="per">27%</_per>
              <_price className="price">{addCommas(beforePrice)}원</_price>
            </_beforePrice>
            <_afterPrice className="afterPrice">{addCommas(afterPrice)}원</_afterPrice>
          </_priceBox>
          <_countBox className="countBox">
            <_minus className="minus" onClick={handleMinusClick}>
              <FontAwesomeIcon icon={faMinus} />
            </_minus>
            <_count>{count}</_count>
            <_plus className="plus" onClick={handlePlusClick}>
              <FontAwesomeIcon icon={faPlus} />
            </_plus>
          </_countBox>
          <_buyBox className="buyBox">
            <_cart className="cart">장바구니 담기</_cart>
            <_buy className="buy">구매하기</_buy>
          </_buyBox>
        </_productInfos>
      </_productInfoBox>
    </>
  );
};

export { ShoppingDetailHeader };
