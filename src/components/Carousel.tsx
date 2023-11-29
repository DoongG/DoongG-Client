import React, { useState } from 'react';
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
    position: relative;
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
    margin-top: -180px;
    margin-left: -80px;
    font-size: 25px;
    color: red;
`;

export default function ShoppingSlide() {
    let location = useLocation();
    const [specificBoard, setSpecificBoard] = useState('');
    const tempdb = [
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            url: ramen,
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
    ];

    const getCarouselItems = async () => {
        //   let res = await axios({
        //     method: 'get',
        //     url: `http://localhost:8080/boards/${
        //         location.pathname.split('/')[2]
        //     }?page=1&order=${whichType}`,
        // });
    };

    const { carousel, setCarousel } = BoardStore();
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
                    {carousel.map((x: any) => {
                        return (
                            <_cusomSwiperSlide>
                                <_cardLike>
                                    <FontAwesomeIcon icon={faHeart} />
                                    {x.likes}
                                </_cardLike>
                                <_card src={x.url} />
                                <_cardTitle>{x.title}</_cardTitle>
                            </_cusomSwiperSlide>
                        );
                    })}
                </_customSwiper>
            </_swiperWrapper>
        </>
    );
}
