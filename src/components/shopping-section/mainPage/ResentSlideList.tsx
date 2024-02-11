/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import eyes from 'assets/eyes.png';
import 'swiper/swiper-bundle.css';
import styled from 'styled-components';

import {
    useBuyModalStore,
    useModalStore,
    useProductId,
    useSwiperDomStore,
    useSwiperPageStore,
} from '../../../store/shoppingHeaderSelectBarStore';
import { ShoppingDetailHeader } from '../detailPage/ShoppingDetailModal';

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

export default function ShoppingSlideResent() {
    const [resentProductList, setResentProductList] = useState<ApiResponse[]>(
        [],
    );
    const { isOpenModal, setOpenModal } = useModalStore(); // 모달 창 state
    const { isOpenBuyModal, setIsOpenBuyModal } = useBuyModalStore(); //결제 모달 창 state
    const { swiperDom, setSwiperDom } = useSwiperDomStore();
    // 남아 있는 슬라이드 수
    const { swiperPage, setSwiperPage } = useSwiperPageStore();

    // swiper DOM 체크
    const swiperRef = useRef<SwiperRef>(null);

    // 상품 리스트에서 클릭한 상품의 제목과 카테고리
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    // const [productId, setProductId] = useState(0);
    const { productId, setProductId } = useProductId();

    // 천 단위 쉼표 추가 함수
    const addCommas = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

    useEffect(() => {
        const getResentProduct = async () => {
            try {
                const res = await axios.get<ApiResponse[]>(
                    `${process.env.REACT_APP_API_KEY}/shop/new`,
                );

                setResentProductList(res.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };
        getResentProduct();
    }, []);

    useEffect(() => {
        if (swiperRef) {
            setSwiperDom(swiperRef.current);
        }
    }, [swiperRef]);

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

    return (
        <>
            <_swiperWrapper className="swiperWrppaer">
                <_customSwiper
                    ref={swiperRef}
                    spaceBetween={10} // 이미지 간격
                    slidesPerView={3} // 한번에 보이는 이미지 수
                    slidesPerGroup={3} // 그룹 당 슬라이드 수 설정
                    onSlideChange={(e: any) => {
                        setSwiperPage(e.activeIndex / 3 + 1);
                    }}
                    breakpoints={{
                        // 1300px 이상일 때
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                            slidesPerGroup: 3,
                        },
                        // 1024px 이상일 때
                        991: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                            slidesPerGroup: 3,
                        },
                        // 768px 이상일 때
                        767: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                            slidesPerGroup: 3,
                        },
                        575: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                            slidesPerGroup: 2,
                        },
                        375: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                            slidesPerGroup: 2,
                        },
                    }}
                >
                    {resentProductList.map((item: ApiResponse) => {
                        return (
                            <>
                                <_customSwiperSlide
                                    key={item.productID}
                                    className="swiperslide"
                                >
                                    <_contentWrapper
                                        className="contentWrapper"
                                        onClick={() =>
                                            onClickToggleModal(
                                                item.category,
                                                item.productName,
                                                item.productID,
                                            )
                                        }
                                    >
                                        <_favoriteDiv className="favoriteDiv">
                                            <img src={eyes} alt="" />
                                            <p>{item.viewCount}</p>
                                        </_favoriteDiv>
                                        <img
                                            src={item.productImage}
                                            alt="이미지1"
                                        />
                                        <span>{item.productName}</span>
                                        <_productInfos>
                                            <_priceDiv className="priceDiv">
                                                <_realPriceDiv className="realPriceDiv">
                                                    {addCommas(
                                                        item.discountedPrice,
                                                    )}
                                                    원
                                                </_realPriceDiv>
                                            </_priceDiv>
                                            <_perDiv className="perDiv">
                                                {calculateDiscountRate(
                                                    item.price,
                                                    item.discountedPrice,
                                                ).toFixed(0)}
                                                %
                                            </_perDiv>
                                        </_productInfos>
                                    </_contentWrapper>
                                </_customSwiperSlide>
                            </>
                        );
                    })}
                </_customSwiper>
            </_swiperWrapper>
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

// Swiper Custom
const _customSwiper = styled(Swiper)`
    height: 400px;
    margin: 0 !important;
    // 슬라이드 버튼
    .swiper-button-prev,
    .swiper-button-next {
        position: absolute;
        top: 145px;
        @media (max-width: 1200px) {
            top: 125px;
        }
    }
    .swiper-button-next {
        right: 0px;
        color: rgb(28, 57, 61);
        @media (max-width: 575px) {
            right: 5px;
        }
        &::after {
            @media (max-width: 1200px) {
                font-size: 35px;
            }
            @media (max-width: 575px) {
                font-size: 25px;
            }
        }
    }
    .swiper-button-prev {
        left: 0px;
        color: rgb(28, 57, 61);
        @media (max-width: 575px) {
            left: 5px;
        }
        &::after {
            @media (max-width: 1200px) {
                font-size: 35px;
            }
            @media (max-width: 575px) {
                font-size: 25px;
            }
        }
    }
    img {
        height: 100%;
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
        @media (max-width: 1200px) {
            font-size: 14px;
        }
        @media (max-width: 765px) {
            font-size: 12px;
        }
    }
    @media (max-width: 1200px) {
        height: 330px;
    }
    @media (max-width: 765px) {
        width: 80%;
        height: 285px;
    }
    @media (max-width: 575px) {
        width: 100%;
        height: 265px;
    }
`;
// SwiperSlide Custom
const _customSwiperSlide = styled(SwiperSlide)`
    width: 288px;
    @media (max-width: 1200px) {
        height: 180px;
    }
    @media (max-width: 767px) {
        height: 170px;
    }
    @media (max-width: 575px) {
        height: 145px;
    }
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

const _swiperWrapper = styled.div`
    float: right;
    display: flex;
    justify-content: center;
    width: 885px;
    padding: 20px 0px 32px;
    position: relative;
    z-index: 3;
    .swiper-wrapper {
        transition: all 0.3s ease-in-out;
    }
    .swiper-slide {
        width: 288px !important;
    }
    @media (max-width: 575px) {
        padding: 20px 0px 20px;
    }
`;

const _contentWrapper = styled.div`
    height: 288px;
`;

const _productInfos = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    @media (max-width: 575px) {
        margin-top: 0px;
    }
`;

const _perDiv = styled.div`
    font-weight: 700;
    font-size: 20px;
    color: red;
    @media (max-width: 1200px) {
        font-size: 17px;
    }
    @media (max-width: 767px) {
        font-size: 15px;
    }
`;
const _priceDiv = styled.div`
    margin-right: 10px;
    @media (max-width: 1200px) {
        font-size: 17px;
    }
    @media (max-width: 767px) {
        font-size: 15px;
    }
`;

const _realPriceDiv = styled.div`
    font-weight: 900;
    font-size: 20px;
    @media (max-width: 1200px) {
        font-size: 17px;
    }
    @media (max-width: 767px) {
        font-size: 15px;
    }
`;

const _backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.2);
`;
