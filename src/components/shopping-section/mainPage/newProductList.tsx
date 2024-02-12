/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import eyes from 'assets/eyes.png';

// select-tab 이미지
import { PiCookingPot } from 'react-icons/pi';
import { GrCut } from 'react-icons/gr';
import { PiBowlFoodLight } from 'react-icons/pi';
import { TfiPaintRoller } from 'react-icons/tfi';
import { PiTelevisionThin } from 'react-icons/pi';
import { PiSoccerBallThin } from 'react-icons/pi';
import { VscSymbolProperty } from 'react-icons/vsc';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface ApiResponse {
    discountedPrice: number;
    price: number;
    productID: number;
    productImage: string;
    productName: string;
    stock: number;
    viewCount: number;
    category: string;
}

export default function NewProductList() {
    const [allProductList, setAllProductList] = useState<ApiResponse[]>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState('뷰티');

    // 할인률 구하는 함수
    function calculateDiscountRate(
        originalPrice: number,
        discountedPrice: number,
    ) {
        // 원래 가격과 할인된 가격을 이용하여 할인률을 계산합니다.
        const discountAmount = originalPrice - discountedPrice;
        const discountRate = (discountAmount / originalPrice) * 100;

        return discountRate;
    }

    // 천 단위 쉼표 추가 함수
    const addCommas = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // 상품 get요청
    useEffect(() => {
        const getAllProduct = async (category: string) => {
            try {
                const res = await axios.get<ApiResponse, any>(
                    `${process.env.REACT_APP_API_KEY}/shop/getAll/${category}`,
                );
                setAllProductList(res.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };
        getAllProduct(category);
    }, [category]);

    // 카테고리 클릭 이벤트
    const handleClickCategory = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.lastChild?.textContent) {
            const categoryName = e.currentTarget.lastChild?.textContent;
            setCategory(categoryName);
        }
    };

    return (
        <>
            <_productList className="productList">
                <div className="wrapper">
                    <_title>
                        지금 가장 많이 이용하는 <span>인기상품</span>
                    </_title>
                    <_selectTab className="selectTab">
                        <_ul>
                            <li onClick={handleClickCategory}>
                                <GrCut />
                                <span>뷰티</span>
                            </li>
                            <li onClick={handleClickCategory}>
                                <PiBowlFoodLight />
                                <span>식품</span>
                            </li>
                            <li onClick={handleClickCategory}>
                                <PiCookingPot />
                                <span>주방용품</span>
                            </li>
                            <li onClick={handleClickCategory}>
                                <TfiPaintRoller />
                                <span>인테리어</span>
                            </li>
                            <li onClick={handleClickCategory}>
                                <PiTelevisionThin />
                                <span>가전제품</span>
                            </li>
                            <li onClick={handleClickCategory}>
                                <PiSoccerBallThin />
                                <span>스포츠</span>
                            </li>
                            <li onClick={handleClickCategory}>
                                <VscSymbolProperty />
                                <span>공구류</span>
                            </li>
                        </_ul>
                    </_selectTab>
                    <_contentBox className="contentBox">
                        {allProductList.map((item: ApiResponse) => {
                            return (
                                <>
                                    <_productDiv className="productDiv">
                                        <_imgDiv className="imgDiv">
                                            <_img
                                                src={item.productImage}
                                            ></_img>
                                            <_favoriteDiv className="favoriteDiv">
                                                <img src={eyes} alt="" />
                                                <p>{item.viewCount}</p>
                                            </_favoriteDiv>
                                        </_imgDiv>
                                        <_infosDiv className="infosDiv">
                                            <_name className="title">
                                                {item.productName}
                                            </_name>
                                            <_price className="price">
                                                <_priceDiv>
                                                    <_realPriceDiv className="afterPrice">
                                                        {addCommas(
                                                            item.discountedPrice,
                                                        )}
                                                    </_realPriceDiv>
                                                </_priceDiv>
                                                <_per className="per">
                                                    {calculateDiscountRate(
                                                        item.price,
                                                        item.discountedPrice,
                                                    ).toFixed(0)}
                                                    %
                                                </_per>
                                            </_price>
                                        </_infosDiv>
                                    </_productDiv>
                                </>
                            );
                        })}
                        <div id="observer" style={{ height: '10px' }}></div>
                    </_contentBox>
                </div>
            </_productList>
        </>
    );
}

const _productList = styled.section`
    padding: 80px 0px;
    & > div {
        width: 1200px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }
`;

const _title = styled.p`
    text-align: left;
    font-weight: 400;
    font-size: 32px;
    margin-bottom: 30px;
    & > span {
        font-weight: 900;
    }
`;

const _selectTab = styled.div`
    width: 1040px;
    margin: 0 auto;
`;

const _ul = styled.ul`
    display: flex;
    margin: 0;
    padding: 0px;
    list-style: none;
    justify-content: space-between;
    & > :hover {
        border: 2px solid rgb(28, 57, 61);
    }
    & li {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 140px;
        height: 140px;
        background: #f9f9f9;
        padding-bottom: 30px;
    }
    & li svg {
        font-size: 65px;
    }
    & > li span {
        position: absolute;
        bottom: 0px;
        font-size: 17px;
        margin-bottom: 15px;
    }
`;

// 상품 박스 css
const _contentBox = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const _productDiv = styled.div`
    width: 25%;
    margin-top: 40px;

    border-radius: 10px;
    background-color: white;
`;
const _imgDiv = styled.div`
    width: 288px;
    height: 288px;
    position: relative;
    @media (max-width: 767px) {
        height: 60%;
    }
`;
const _img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    scale: 0.7;
`;
const _favoriteDiv = styled.div`
    display: flex;
    position: absolute;
    top: 15px;
    left: 15px;
    align-items: center;
    img {
        margin-right: 5px;
        width: 20px;
        @media (max-width: 1200px) {
            height: 17px;
        }
    }
    p {
        margin: 0;
        font-weight: 700;
        @media (max-width: 1200px) {
            font-size: 14px;
        }
        @media (max-width: 767px) {
            font-size: 12px;
        }
    }
`;

const _infosDiv = styled.div`
    margin-top: 10px;
    text-align: left;
`;

const _name = styled.div`
    font-weight: 900;
    min-height: 43px;
`;

const _price = styled.div`
    display: flex;
`;
const _per = styled.div`
    font-weight: 700;
    font-size: 20px;
    color: red;
    @media (max-width: 1200px) {
        font-size: 16px;
    }
    @media (max-width: 991px) {
        font-size: 13px;
    }
    @media (max-width: 767px) {
        font-size: 11px;
    }
`;
const _priceDiv = styled.div`
    margin-right: 10px;
    @media (max-width: 1200px) {
        font-size: 14px;
    }
    @media (max-width: 991px) {
        font-size: 13px;
    }
    @media (max-width: 767px) {
        font-size: 11px;
    }
`;

const _initPriceDiv = styled.div`
    text-decoration: line-through;
`;
const _realPriceDiv = styled.div`
    font-size: 20px;
    font-weight: 900;
`;
