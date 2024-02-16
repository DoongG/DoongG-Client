/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { useRef, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import { GoArrowLeft } from 'react-icons/go';
type Props = {
    category: string;
};

export default function RecommendSlide(props: Props) {
    const { category } = props;
    const swiperRef = useRef<SwiperRef>(null);
    const [page, setPage] = useState(1);
    return (
        <>
            <_recommend className="recommend">
                <_title>비슷한 물품 (8)</_title>
                <div className="swiperWrapper">
                    <_customSwiper
                        ref={swiperRef}
                        spaceBetween={20}
                        slidesPerView={4}
                        slidesPerGroup={4}
                        onSlideChange={(e: any) => {
                            setPage(e.activeIndex / 4 + 1);
                            console.log(e.activeIndex);
                        }}
                    >
                        <_customSwiperSlide>Slide 1</_customSwiperSlide>
                        <_customSwiperSlide>Slide 2</_customSwiperSlide>
                        <_customSwiperSlide>Slide 3</_customSwiperSlide>
                        <_customSwiperSlide>Slide 4</_customSwiperSlide>
                        <_customSwiperSlide>Slide 5</_customSwiperSlide>
                        <_customSwiperSlide>Slide 6</_customSwiperSlide>
                        <_customSwiperSlide>Slide 7</_customSwiperSlide>
                        <_customSwiperSlide>Slide 8</_customSwiperSlide>
                    </_customSwiper>
                    <_pageBox className="pageBox">
                        <_swiperBtn
                            onClick={() =>
                                swiperRef.current?.swiper.slidePrev()
                            }
                        >
                            <GoArrowLeft />
                        </_swiperBtn>
                        <_curPageBox>
                            <span>{page}</span>
                            <span>/2</span>
                        </_curPageBox>
                        <_swiperBtn
                            onClick={() =>
                                swiperRef.current?.swiper.slideNext()
                            }
                        >
                            <GoArrowRight />
                        </_swiperBtn>
                    </_pageBox>
                </div>
            </_recommend>
        </>
    );
}

const _recommend = styled.section`
    width: 1080px;
    margin: 0 auto;
    padding-bottom: 100px;
    position: relative;
    overflow: hidden;
`;

const _title = styled.h3`
    text-align: left;
    margin: 0px;
    margin-bottom: 30px;
`;

const _customSwiper = styled(Swiper)`
    height: 350px;
    .swiper-wrapper {
        transition-timing-function: ease-in-out;
    }
`;

const _customSwiperSlide = styled(SwiperSlide)`
    background-color: #00000036;
    width: 288px;
`;

const _pageBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
`;

const _curPageBox = styled.div`
    width: 90px;
    font-weight: 700;
    &:nth-child(1) {
        color: black;
    }
    *:nth-child(2) {
        color: grey;
    }
`;

const _swiperBtn = styled.button`
    display: flex;
    background: transparent;
    border: none;
    color: grey;
    font-size: 30px;
    :hover {
        color: black;
    }
`;
