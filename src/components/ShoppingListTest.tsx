import styled, { createGlobalStyle } from 'styled-components';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';
import shopping1 from '../assets/shopping1.jpg';
import shopping2 from '../assets/shopping2.jpg';
import shopping3 from '../assets/shopping3.jpg';
import shopping4 from '../assets/shopping4.jpg';
import shopping5 from '../assets/shopping5.jpg';
import listbar from '../assets/listbar.png';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    useBuyModalStore,
    useModalStore,
} from '../store/shoppingHeaderSelectBarStore';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ShoppingDetailHeader } from './ShoppingDetailModal';
import { ShoppingDetailBuy } from './ShoppingDetailBuy';

interface ImgBarProps {
    shouldAnimate?: boolean;
    divHeigth?: any;
    calculateBottomValue?: (itemCount: number) => number;
    itemCount?: number;
    calculatedHeight?: any;
    customBottom?: number;
    shoulduse?: boolean;
    onClickToggleModal?: () => void;
}

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

export default function ShoppingListTest() {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [click, setClick] = useState(false);
    const [staticChange, setStaticChange] = useState(0);
    const [filteredItems, setFilteredItems] = useState<any>([]); //필터링 된 상품 리스트
    const [divHeigth, setDivHeigth] = useState(0); // 상품 목록 Div의 content 높이
    const { isOpenModal, setOpenModal } = useModalStore(); // 모달 창 state
    const { isOpenBuyModal, setIsOpenBuyModal } = useBuyModalStore(); //결제 모달 창 state

    const [allProductList, setAllProductList] = useState<ApiResponse[]>([]);

    // 상품 리스트에서 클릭한 상품의 제목과 카테고리
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [productId, setProductId] = useState(0);

    const categoryDiv = useRef<HTMLDivElement>(null);
    const listWrapper = useRef<HTMLDivElement>(null);
    const imgBar = useRef<HTMLImageElement>(null);
    const [param, setParam] = useSearchParams();

    //상품 클릭시 모달창 open 함수
    const onClickToggleModal = (
        changedCategory: string,
        changedTitle: string,
        changedId: number,
    ) => {
        // 제목, 카테고리 state값 변경
        setTitle(changedTitle);
        setCategory(changedCategory);
        setProductId(changedId);
        setOpenModal(!isOpenModal);
    };

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

    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const res = await axios.get<ApiResponse, any>(
                    'http://localhost:8080/shop/getAll',
                );
                console.log(res.data);
                setAllProductList(res.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };
        getAllProduct();
    }, []);

    useEffect(() => {
        if (allProductList.length || click === true) {
            // 상품 목록 Div가 내려가는 조건
            if (
                shouldAnimate === false &&
                imgBar.current &&
                categoryDiv.current &&
                listWrapper.current
            ) {
                const calculatedHeight = categoryDiv.current.offsetHeight;
                setDivHeigth(calculatedHeight);
                imgBar.current.style.animation = 'slideDown 1s  1 forwards ';
                categoryDiv.current.style.animation = 'listDown 1s 1 forwards ';
                categoryDiv.current.style.bottom = `-${calculatedHeight}px !important`;
                // setShouldAnimate(true);
                // scrollIntoView가 작동하는 시간
                setTimeout(() => {
                    if (listWrapper.current) {
                        listWrapper.current.scrollIntoView({
                            behavior: 'smooth',
                        });
                    }
                }, 300);
            } else if (
                shouldAnimate === true &&
                imgBar.current &&
                categoryDiv.current
            ) {
                // 상품 목록 Div가 올라가는 조건
                imgBar.current.style.animation = 'slideUp 1s 1 forwards ';
                categoryDiv.current.style.animation = 'listUp 1s  1 forwards ';

                setShouldAnimate(false);
                setClick(false);
            }
        }
    }, [allProductList]);

    useEffect(() => {
        setClick(true);
    }, [click]);

    // 현재 ImgBar의 슬라이드 상황
    // True : translateY(0%) -> translateY(40%)
    // false : translateY(40%) -> translateY(0%)
    const handleCategoryClick = async (category: string) => {
        const getResentProduct = async () => {
            try {
                const res = await axios.get<ApiResponse, any>(
                    `http://localhost:8080/shop/getAll/${category}`,
                );
                console.log(res.data);
                setAllProductList(res.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };
        getResentProduct();
        setParam({ name: category });
        setClick(true);
    };

    // "위로 올리기 버튼" 작동 함수 => 무조건 상품 목록Div가 올라가야 함
    const handleCloseClick = () => {
        if (categoryDiv.current && imgBar.current) {
            categoryDiv.current.style.animation = 'listUp 1s  1 forwards ';
            imgBar.current.style.animation = 'slideUp 1s  1 forwards ';
            setShouldAnimate(false);
        }
    };

    return (
        <>
            <_listWrapper className="listWrapper" ref={listWrapper}>
                <_categoryBar className="categoryBar">
                    <_ul>
                        {[
                            '뷰티',
                            '식품',
                            '주방용품',
                            '생활용품',
                            '인테리어',
                            '가전제품',
                            '문구류',
                            '스포츠',
                            '공구류',
                        ].map((category) => (
                            <_li
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </_li>
                        ))}
                        <_before className="before"></_before>
                        <_after className="after"></_after>
                    </_ul>
                </_categoryBar>
            </_listWrapper>
            <_productListWrapper className="productListWrapper">
                <_productListBar className="bar">
                    <_imgBar
                        src={listbar}
                        alt=""
                        shouldAnimate={shouldAnimate}
                        ref={imgBar}
                    />
                </_productListBar>
                <_productListWrapper1 className="productListWrapper">
                    <_categoryDiv
                        className="beautyDiv"
                        ref={categoryDiv}
                        shouldAnimate={shouldAnimate}
                        calculatedHeight={divHeigth}
                        customBottom={staticChange}
                        shoulduse={click}
                    >
                        {allProductList.map((item: ApiResponse) => {
                            return (
                                <>
                                    <_productDivWrapper
                                        className="productDivWrapper"
                                        onClick={() =>
                                            onClickToggleModal(
                                                item.category,
                                                item.productName,
                                                item.productID,
                                            )
                                        }
                                    >
                                        <_productDiv className="productDiv">
                                            <_imgDiv className="imgDiv">
                                                <_img src={shopping1}></_img>
                                            </_imgDiv>
                                            <_infosDiv className="infosDiv">
                                                <_title className="title">
                                                    {item.productName}
                                                </_title>
                                                <_price className="price">
                                                    <_per className="per">
                                                        {calculateDiscountRate(
                                                            item.price,
                                                            item.discountedPrice,
                                                        ).toFixed(0)}
                                                        %
                                                    </_per>
                                                    <_priceDiv>
                                                        <_initPriceDiv className="beforePrice">
                                                            {addCommas(
                                                                item.price,
                                                            )}
                                                        </_initPriceDiv>
                                                        <_realPriceDiv className="afterPrice">
                                                            {addCommas(
                                                                item.discountedPrice,
                                                            )}
                                                        </_realPriceDiv>
                                                    </_priceDiv>
                                                </_price>
                                            </_infosDiv>
                                        </_productDiv>
                                    </_productDivWrapper>
                                </>
                            );
                        })}
                        <_endPoint
                            className="endPoint"
                            onClick={() => handleCloseClick()}
                        >
                            <FontAwesomeIcon icon={faArrowUp} fade />
                            <span>위로 올리기</span>
                        </_endPoint>
                    </_categoryDiv>
                </_productListWrapper1>
            </_productListWrapper>
            {isOpenModal && (
                <ShoppingDetailHeader
                    onClickToggleModal={(title, category, productId) =>
                        console.log(title, category, productId)
                    }
                    category={category}
                    title={title}
                    productId={productId}
                ></ShoppingDetailHeader>
            )}

            {isOpenModal && (
                <_backdrop
                    onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        setOpenModal(false);
                        setIsOpenBuyModal(false);
                        if (onClickToggleModal) {
                            onClickToggleModal(category, title, productId);
                        }
                    }}
                ></_backdrop>
            )}
        </>
    );
}

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
        content: '';
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
        content: '';
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
        content: '';
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
        content: '';
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
    padding-top: 50px;
    background-color: #ffda00;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    bottom: -${(props) => props.calculatedHeight}px;
    position: absolute;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    animation-fill-mode: forwards;
    animation: 'none';

    @keyframes listDown {
        from {
            bottom: 0px;
        }
        to {
            bottom: -${(props) => props.calculatedHeight}px !important;
        }
    }
    @keyframes listUp {
        from {
            bottom: -${(props) => props.calculatedHeight}px !important;
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

const _backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.2);
`;
