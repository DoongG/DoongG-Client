import React from 'react';
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

const _customSwiper = styled(Swiper)`
    width: 100%;
    height: 300px;
    .swiper-button-prev,
    .swiper-button-next {
        position: fixed;
        top: 240px;
    }
    .swiper-button-next {
        right: 20px;
    }
    .swiper-button-prev {
        left: 20px;
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

const _card = styled.img`
    width: 100px;
    height: 100px;
    border: 1px solid black;
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

export default function ShoppingSlide() {
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
    ];
    return (
        <>
            <_swiperWrapper className="swiperWrppaer">
                <_customSwiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={5}
                    slidesPerGroup={1} // 그룹 당 슬라이드 수 설정
                    navigation
                    breakpoints={{
                        // 1300px 이상일 때
                        1300: {
                            slidesPerView: 6,
                            spaceBetween: 30,
                        },
                        // 1024px 이상일 때
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        // 768px 이상일 때
                        750: {
                            slidesPerView: 4,
                        },
                        375: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {tempdb.map((x) => {
                        return (
                            <SwiperSlide
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <_card src={x.url} />
                                <_cardTitle>{x.title}</_cardTitle>
                            </SwiperSlide>
                        );
                    })}
                </_customSwiper>
            </_swiperWrapper>
        </>
    );
}
