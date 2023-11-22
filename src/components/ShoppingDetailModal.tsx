import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import fox from "../assets/fox.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import eyes from "../assets/eyes.png";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useModalStore } from "../store/shoppingHeaderSelectBarStore";
import { ShoppingDetailSelectBar } from "./ShoppingDetailSelectBar";

// 가장 밖 div
const _ShoppingDetailModal = styled.div<ModalProps>`
  height: 90%;
  width: 92%;
  position: fixed;
  top: 50%;
  left: 50%;
  overflow: scroll;
  background-color: white;
  padding: 20px 110px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
  animation: ${(props) =>
    props.isModal
      ? "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
      : "scale-out-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both"};
  @keyframes scale-in-center {
    0% {
      -webkit-transform: scale(0);
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }

  @keyframes scale-out-center {
    0% {
      -webkit-transform: scale(1);
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(0);
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
  }
`;

const _closeModal = styled.div`
  position: absolute;
  right: 30px;
  top: 25px;
`;

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
  /* height: 53%; */
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
  width: 100%;
  margin-top: 20px;
  display: flex;
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

interface ShoppingDetailModalProps {
  category: string;
  title: string;
  onClickToggleModal: (title: string, category: string) => void;
}
interface ModalProps {
  isModal: boolean;
}

const ShoppingDetailHeader: React.FC<ShoppingDetailModalProps> = ({ category, title, onClickToggleModal }) => {
  // 모달 상태
  const { isOpenModal, setOpenModal } = useModalStore();
  // const [isOpenModal, setOpenModal] = useState(false);
  // 수량과 가격 상태
  const [count, setCount] = useState(1);
  const [beforePrice, setbeforePrice] = useState(10000);
  const [afterPrice, setAfterPrice] = useState(8000);

  const shoppingDetailHeader = useRef<HTMLDivElement>(null);

  console.log(isOpenModal);
  useEffect(() => {
    // isOpenModal 값이 변경될 때마다 애니메이션 클래스를 동적으로 추가 또는 제거
    if (isOpenModal) {
      shoppingDetailHeader.current!.style.animation =
        "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
    } else {
      shoppingDetailHeader.current!.style.animation =
        "scale-out-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both";
    }
  }, [isOpenModal]);

  // 모달 생기면 뒷 배경 스크롤 막는 함수
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  // title에 제대로된 타입을 넘겨줌
  const decodedTitle = decodeURIComponent(title as string);

  // 천 단위 쉼표 추가 함수
  const addCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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

  // 모달 닫는 함수
  const closeModal = () => {
    console.log("모달 닫기");

    setTimeout(() => {
      isOpenModal && setOpenModal(!isOpenModal);
    }, 200);

    // setOpenModal(bool);
    console.log(isOpenModal);
  };

  // useEffect(() => {
  //   if (isOpenModal === true) {
  //     shoppingDetailHeader.current!.style.animation =
  //       "scale-in-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both";
  //   } else {
  //     shoppingDetailHeader.current!.style.animation =
  //       "scale-out-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both";
  //   }
  // }, [isOpenModal]);

  return (
    <>
      <_ShoppingDetailModal ref={shoppingDetailHeader} isModal={isOpenModal}>
        <_closeModal onClick={closeModal}>
          <AiOutlineClose />
        </_closeModal>
        <_headerWrapper className="HeaderWrapper">
          <ul>
            <Link to={"/"}>
              <li>HOME</li>
            </Link>
            <div>{">"}</div>

            <li onClick={() => window.location.reload()}>SHOP</li>

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
        <ShoppingDetailSelectBar></ShoppingDetailSelectBar>
      </_ShoppingDetailModal>
    </>
  );
};

export { ShoppingDetailHeader };
