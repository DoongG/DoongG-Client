import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import styled from 'styled-components';
import ramen from '../assets/ramen1.jpg';
import { BoardStore } from '../store/storeT';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Mascot from '../assets/Mascot-removebg-preview.png';
import { useLocation, useParams } from 'react-router';

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

export default function ShoppingSlide() {
    let location = useLocation();
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [specificBoard, setSpecificBoard] = useState('');
    const [carouselData, setCarouselData] = useState<any>([]);
    const [prevDouble, setPrevDouble] = useState(true);
    const [nextDouble, setNextDouble] = useState(true);
    const { setDetailModalOn, setOnePageData, onePageData, signal } =
        BoardStore();

    const getCarouselItems = async () => {
        console.log(location.pathname);
        let res;
        if (location.pathname.includes('search')) {
            res = await axios({
                method: 'get',
                url: `http://localhost:8080/boards/topLiked/${
                    location.pathname.split('/')[3]
                }`,
            });
        } else {
            res = await axios({
                method: 'get',
                url: `http://localhost:8080/boards/topLiked/${
                    location.pathname.split('/')[2]
                }`,
            });
        }
        if (res) {
            console.log(res.data);
            setCarouselData(res.data);
        }
    };

    const thumbnailPicker = (imageArr: any) => {
        if (imageArr) {
            for (let i = 0; i < imageArr.length; i++) {
                if (imageArr[i].imageType == 'thumbnail') {
                    return imageArr[i].url;
                }
            }
        }
        return Mascot;
    };

    const getOnePage = async (postId: any) => {
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards/posts/${postId}`,
        });
        setOnePageData([res.data]);
    };

    const plusView = async (postId: any) => {
        let res = await axios({
            method: 'post',
            url: `http://localhost:8080/boards/posts/increaseViews/${postId}`,
        });
        getOnePage(postId);
    };

    useEffect(() => {
        if (onePageData.length > 0) {
            setDetailModalOn(true);
        }
    }, [onePageData]);

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
                        // 1300px 이상일 때
                        1300: {
                            slidesPerView: 5,
                            //   spaceBetween: 30,
                        },
                        // 1024px 이상일 때
                        1024: {
                            slidesPerView: 4,
                            //   spaceBetween: 10,
                        },
                        // 768px 이상일 때
                        750: {
                            slidesPerView: 3,
                        },
                        375: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    {carouselData &&
                        carouselData.map((x: any) => {
                            return (
                                <_cusomSwiperSlide>
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            position: 'relative',
                                        }}
                                        onClick={(e) => {
                                            plusView(x.postId);
                                        }}
                                    >
                                        <_cardLike>
                                            <FontAwesomeIcon icon={faHeart} />
                                            {x.likeCount}
                                        </_cardLike>
                                        <_card
                                            src={thumbnailPicker(x.postImages)}
                                        />
                                        <_cardTitle>{x.title}</_cardTitle>
                                    </div>
                                </_cusomSwiperSlide>
                            );
                        })}
                </_customSwiper>
            </_swiperWrapper>
        </>
    );
}
