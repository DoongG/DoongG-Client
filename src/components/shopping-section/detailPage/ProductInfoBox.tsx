/* eslint-disable react/jsx-pascal-case */
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Product_t } from 'types/shoppingDetail';
import addCommas from 'utils/addCommas';
import calculateDiscountRate from 'utils/calculateDiscountRate';
import CountBtn from './CountBtn';
import CartBtn from './CartBtn';
import { useCalculatedCost } from 'store/shoppingHeaderSelectBarStore';

export default function ProductInfoBox(data: Product_t) {
    const { beforePrice, afterPrice } = useCalculatedCost(); // 수량에 따른 변하는 가격 정보

    return (
        <>
            <_productInfo className="productInfo">
                <_headerWrapper className="HeaderWrapper">
                    <ul>
                        <Link to={'/'}>
                            <li>HOME</li>
                        </Link>
                        <div>{'>'}</div>
                        <Link to={'/shopping'}>
                            <li>SHOP</li>
                        </Link>
                        <div>{'>'}</div>
                        <li>{data.category}</li>
                    </ul>
                </_headerWrapper>
                <div className="wrapper">
                    <_imgBox className="imgBox">
                        <img src={data.productImage} alt={data.productName} />
                    </_imgBox>
                    <_infoBox className="infoBox">
                        <_productName>
                            {data.productName}
                            <span className="view">({data.viewCount})</span>
                        </_productName>
                        <_productDescription className="productDescription">
                            <span>상품 설명 </span>
                            <hr />
                            <p>{data.productDescription}</p>
                        </_productDescription>
                        <_priceBox className="priceBox">
                            <_afterPrice className="afterPrice">
                                {addCommas(afterPrice)}원
                                <_price className="price">
                                    {addCommas(beforePrice)}원
                                </_price>
                            </_afterPrice>

                            <_beforePrice className="beforePrice">
                                <_per className="per">
                                    {calculateDiscountRate(
                                        data.price,
                                        data.discountedPrice,
                                    ).toFixed(0)}
                                    %
                                </_per>
                            </_beforePrice>
                        </_priceBox>
                        <CountBtn {...data} />
                        <_buyBox className="buyBox">
                            <CartBtn />
                            <_buy className="buy">구매하기</_buy>
                        </_buyBox>
                    </_infoBox>
                </div>
            </_productInfo>
        </>
    );
}
// 카테고리 경로
const _headerWrapper = styled.div`
    padding-bottom: 20px;
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
    @media (max-width: 1200px) {
        padding: 40px 30px 20px;
    }
    @media (max-width: 991px) {
        padding: 12px 30px 12px;
        font-size: 12px;
    }
    @media (max-width: 767px) {
        font-size: 10px;
        padding: 12px 0px 12px;
    }
    @media (max-width: 575px) {
        font-size: 8px;
        padding: 6px 0px 6px;
    }
`;

const _productInfo = styled.section`
    padding: 100px 0px 70px;
    & > div {
        display: flex;
        justify-content: space-between;
        width: 1080px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }
`;

const _imgBox = styled.div`
    /* border: 2px solid black; */
    /* aspect-ratio: 16/9; */
    height: 400px;
    width: 400px;
    & > img {
        scale: 0.7;
        aspect-ratio: 1/1;
        width: 100%;
    }
`;

const _infoBox = styled.div`
    width: 550px;
    text-align: left;
`;
const _productName = styled.span`
    font-size: 32px;
    font-weight: 700;
    & > span {
        font-size: 16px;
        margin-left: 5px;
        color: grey;
    }
`;

const _productDescription = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    min-height: 130px;
    & > :nth-child(1) {
        margin-bottom: 5px;
        font-weight: 700;
    }
    & > :nth-child(2) {
        margin: 0;
    }
    & > :nth-child(3) {
        margin: 0;
        margin-top: 15px;
    }
`;

// 가격 박스
const _priceBox = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    text-align: left;
    margin-top: 30px;
    @media (max-width: 991px) {
        margin-top: 5px;
    }
`;

const _beforePrice = styled.div`
    display: flex;
    @media (max-width: 575px) {
        font-size: 14px;
    }
`;
const _per = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: red;
    margin-right: 10px;
`;
const _price = styled.div`
    font-size: 17px;
    text-decoration: line-through;
    color: grey;
    margin-left: 10px;
`;
const _afterPrice = styled.div`
    display: flex;
    align-items: flex-end;
    font-weight: 700;
    font-size: 30px;
    @media (max-width: 1200px) {
        font-size: 25px;
    }
    @media (max-width: 991px) {
        font-size: 20px;
    }
    @media (max-width: 575px) {
        font-size: 15px;
    }
`;

// 장바구니 & 결제 버튼
const _buyBox = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    @media (max-width: 1200px) {
        margin-top: 13px;
    }
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
    @media (max-width: 1200px) {
        min-width: 140px;
        padding: 7px 22px;
    }
    @media (max-width: 575px) {
        min-width: 115px;
        padding: 4px 10px;
        font-size: 12px;
    }
`;
