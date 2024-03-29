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

import { Fragment, useState } from 'react';
import axios from 'axios';
import addCommas from 'utils/addCommas';
import calculateDiscountRate from 'utils/calculateDiscountRate';
import { useInfiniteQuery } from 'react-query';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import { useQueryClient } from 'react-query';
import { Produdct_list_t } from 'types/shoppingDetail';
import ScrollToTopBtn from '../detailPage/ScrollToTopBtn';
import { Link } from 'react-router-dom';

export default function NewProductList() {
    const [category, setCategory] = useState('뷰티'); // 카테고리 초기값
    const queryClient = useQueryClient();

    // 카테고리 클릭 이벤트
    const handleClickCategory = (e: React.MouseEvent<HTMLElement>) => {
        if (e.currentTarget.lastChild?.textContent) {
            const categoryName = e.currentTarget.lastChild?.textContent;
            queryClient.removeQueries({ queryKey: 'product' }); // 이전 카테고리 캐시를 삭제
            setCategory(categoryName);
        }
    };

    // 카테고리별 상품 가져오는 Axios 함수
    const getAllProduct = async (category: string, page: number) => {
        const res = await axios.get(
            `${process.env.REACT_APP_API_KEY}/shop/getAll/${category}?page=${page}`,
        );
        return res.data as Produdct_list_t[];
    };

    //무한 스크롤(react-query)
    const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['product', category],
        queryFn: ({ pageParam = 0 }) => getAllProduct(category, pageParam),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 12 && allPages.length + 1; // 마지막 페이지의 데이터가 12개 시 현재 페이지 + 1
        },
        select: (data) => ({
            pages: data?.pages.flatMap((page) => page),
            pageParams: data.pageParams,
        }),
    });

    // intersectionObserver
    const { setTarget } = useIntersectionObserver({
        hasNextPage,
        fetchNextPage,
    });

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
                        {data && data.pages.length > 0 ? (
                            data.pages.map((item: Produdct_list_t) => {
                                return (
                                    <_Link to={`/shopping/${item.productID}`}>
                                        <Fragment key={item.productID}>
                                            <_productDiv className="productDiv">
                                                <_imgDiv className="imgDiv">
                                                    <_img
                                                        src={item.productImage}
                                                        alt={item.productName}
                                                    ></_img>
                                                    <_favoriteDiv className="favoriteDiv">
                                                        <img
                                                            src={eyes}
                                                            alt=""
                                                        />
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
                                        </Fragment>
                                    </_Link>
                                );
                            })
                        ) : (
                            <_emptyBox className="emptyBox">
                                상품이 없습니다.
                                <br />
                                다른 카테고리를 선택해주세요.
                            </_emptyBox>
                        )}
                    </_contentBox>
                </div>
                <div
                    ref={setTarget}
                    id="observer"
                    style={{ height: '10px' }}
                ></div>
                <ScrollToTopBtn />
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
    & > li:hover {
        border: 2px solid rgb(28, 57, 61);
    }
    & li {
        border: 2px solid white;
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
    justify-content: cneter;
`;
const _Link = styled(Link)`
    width: 23%;
    margin: 40px 10px 0px 10px;
    border-radius: 10px;
    background-color: white;
    color: black;
    text-decoration: none;
`;

const _productDiv = styled.div`
    &:hover {
        box-shadow: 0px -1px 5px black;
    }
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
    padding-left: 10px;
    padding-bottom: 10px;
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

const _realPriceDiv = styled.div`
    font-size: 20px;
    font-weight: 900;
`;

const _emptyBox = styled.div`
    font-size: 20px;
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.7;
`;
