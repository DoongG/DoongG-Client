import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import styled from 'styled-components';
import { BoardStore } from '../../store/storeT';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Mascot from '../../assets/Mascot-removebg-preview.png';
import { useLocation } from 'react-router';
import { imageDataType } from '../Type/Type';
import { eachDataType } from '../Type/Type';

export default function HotSlide() {
    let location = useLocation();
    const [carouselData, setCarouselData] = useState<eachDataType[]>([]);
    const { setDetailModalOn, setOnePageData, onePageData, signal } =
        BoardStore();

    // 캐러셀에 로드할 데이터들 요청하는 함수
    const getCarouselItems = async () => {
        let res;
        if (location.pathname.includes('search')) {
            res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_KEY}/boards/topLiked/${
                    location.pathname.split('/')[3]
                }`,
            });
        } else {
            res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_KEY}/boards/topLiked/${
                    location.pathname.split('/')[2]
                }`,
            });
        }
        if (res) {
            setCarouselData(res.data);
        }
    };

    // 썸네일 고르는 로직 함수
    const thumbnailPicker = (imageArr: imageDataType[]) => {
        if (imageArr) {
            for (let i = 0; i < imageArr.length; i++) {
                if (imageArr[i].imageType == 'thumbnail') {
                    return imageArr[i].url;
                }
            }
        }
        return Mascot;
    };

    // 게시글 데이터 하나 요청하는 함수
    const getOnePage = async (postId: string | number) => {
        let res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
        });
        setOnePageData([res.data]);
        setDetailModalOn(true);
    };

    // 조회수 1추가
    const plusView = async (postId: string | number) => {
        let res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/increaseViews/${postId}`,
        });
        getOnePage(postId);
    };

    // 글이 수정되거나 했을 때 캐러셀 데이터 새로 불러오는 이펙트
    useEffect(() => {
        getCarouselItems();
    }, [signal]);

    return (
        <>
            <_swiperWrapper>
                <_customSwiper
                    modules={[Navigation, Pagination]}
                    //   spaceBetween={5}
                    slidesPerView={5}
                    slidesPerGroup={1} // 그룹 당 슬라이드 수 설정
                    navigation
                    breakpoints={{
                        1300: {
                            slidesPerView: 5,
                            //   spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        600: {
                            slidesPerView: 2,
                        },
                        375: {
                            slidesPerView: 1,
                        },
                        100: {
                            slidesPerView: 1,
                        },
                    }}
                >
                    {carouselData &&
                        carouselData.map((eachData: eachDataType) => {
                            return (
                                <_cusomSwiperSlide>
                                    <_cardWrapper
                                        onClick={(e) => {
                                            plusView(eachData.postId);
                                        }}
                                    >
                                        <_cardLike>
                                            <FontAwesomeIcon icon={faHeart} />
                                            {eachData.likeCount}
                                        </_cardLike>
                                        <_card
                                            src={thumbnailPicker(
                                                eachData.postImages,
                                            )}
                                        />
                                        <_cardTitle>
                                            {eachData.title}
                                        </_cardTitle>
                                    </_cardWrapper>
                                </_cusomSwiperSlide>
                            );
                        })}
                </_customSwiper>
            </_swiperWrapper>
        </>
    );
}

const _customSwiper = styled(Swiper)`
    width: 90%;
    height: 300px;
    .swiper-button-prev,
    .swiper-button-next {
        /* position: fixed; */
        /* top: 240px; */
    }
    .swiper-button-next {
        /* right: 40px; */
    }
    .swiper-button-prev {
        /* left: 40px; */
    }
`;
const _swiperWrapper = styled.div`
    padding: 10px 80px 32px;
    position: relative;
    .swiper-wrapper {
        transition-timing-function: linear !important;
        transition-duration: 500ms !important;
    }
`;

const _cusomSwiperSlide = styled(SwiperSlide)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const _card = styled.img`
    border-radius: 20px;
    width: 150px;
    height: 150px;
`;

const _cardTitle = styled.p`
    width: 150px;
    overflow: hidden;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const _cardLike = styled.div`
    position: absolute;
    margin-left: 10px;
    font-size: 25px;
    color: red;
`;

const _cardWrapper = styled.div`
    cursor: pointer;
    position: relative;
`;
