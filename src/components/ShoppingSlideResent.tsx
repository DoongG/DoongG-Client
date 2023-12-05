import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import eyes from '../assets/eyes.png';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
} from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import 'swiper/swiper-bundle.css';
import styled from 'styled-components';
import shopping1 from '../assets/shopping1.jpg';
import shopping2 from '../assets/shopping2.jpg';
import shopping3 from '../assets/shopping3.jpg';
import shopping4 from '../assets/shopping4.jpg';
import shopping5 from '../assets/shopping5.jpg';
import {
    useBuyModalStore,
    useModalStore,
    useProductId,
} from '../store/shoppingHeaderSelectBarStore';
import { ShoppingDetailHeader } from './ShoppingDetailModal';

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
                const res = await axios.get<ApiResponse, any>(
                    'http://3.38.68.222:8080/shop/new',
                );

                setResentProductList(res.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };
        getResentProduct();
    }, []);

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
                    modules={[Navigation, Pagination]}
                    spaceBetween={50} // 이미지 간격
                    slidesPerView={5} // 한번에 보이는 이미지 수
                    slidesPerGroup={5} // 그룹 당 슬라이드 수 설정
                    navigation
                    breakpoints={{
                        // 1300px 이상일 때
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                            slidesPerGroup: 5,
                            //   spaceBetween: 30,
                        },
                        // 1024px 이상일 때
                        991: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                            slidesPerGroup: 4,
                            //   spaceBetween: 10,
                        },
                        // 768px 이상일 때
                        767: {
                            slidesPerView: 3,
                            spaceBetween: 50,
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
                                        <img src={shopping1} alt="이미지1" />
                                        <span>{item.productName}</span>
                                        <_productInfos>
                                            <_perDiv className="perDiv">
                                                {calculateDiscountRate(
                                                    item.price,
                                                    item.discountedPrice,
                                                ).toFixed(0)}
                                                %
                                            </_perDiv>
                                            <_priceDiv className="priceDiv">
                                                <_initPriceDiv className="initPriceDiv">
                                                    {addCommas(item.price)}원
                                                </_initPriceDiv>
                                                <_realPriceDiv className="realPriceDiv">
                                                    {addCommas(
                                                        item.discountedPrice,
                                                    )}
                                                    원
                                                </_realPriceDiv>
                                            </_priceDiv>
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
    width: 95%;
    height: 400px;
    margin: 0 !important;
    padding: 0px 43px;
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
        border-radius: 15px;
        width: 100%;
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
    height: 260px;
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

// 아이콘 커스텀
const _customFontAwesome = styled(FontAwesomeIcon)`
    font-size: 25px;
    margin-right: 7px;
`;

const _swiperWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0px 32px;
    position: relative;
    background-color: white;
    z-index: 3;
    .swiper-wrapper {
        transition-timing-function: linear !important;
        transition-duration: 500ms !important;
    }
    @media (max-width: 575px) {
        padding: 20px 0px 20px;
    }
`;

const _contentWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const _productInfos = styled.div`
    display: flex;
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
    margin-left: 15px;

    @media (max-width: 1200px) {
        font-size: 17px;
    }
    @media (max-width: 767px) {
        font-size: 15px;
    }
`;

const _initPriceDiv = styled.div`
    text-decoration: line-through;
    @media (max-width: 1200px) {
        font-size: 17px;
    }
    @media (max-width: 767px) {
        font-size: 15px;
    }
`;
const _realPriceDiv = styled.div`
    font-weight: 700;

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
