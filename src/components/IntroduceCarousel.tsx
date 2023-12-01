import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { IntroduceHotdeal } from './IntroduceHotdeal';
import { IntroduceBoard } from './IntroduceBoard';
import { IntroduceRoomReviews } from './IntroduceRoomReviews';

const Background = styled.div`
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;

    .Left {
        top: 50%;
        left: 3%;
        transform: translate(-50%, -50%);
        color: rgba(235, 235, 235, 0.3);
        &:hover {
            color: rgba(235, 235, 235, 0.5);
        }
    }
    .Right {
        top: 50%;
        left: 97%;
        transform: translate(-50%, -50%);
        color: rgba(235, 235, 235, 0.3);
        &:hover {
            color: rgba(235, 235, 235, 0.5);
        }
    }
`;

const SlideBtn = styled.div`
    z-index: 100;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImgContainer = styled.div`
    display: flex;
    overflow: hidden;
`;

const ImgBox = styled.div`
    width: 100%;
    height: 400px;
    overflow: hidden;
    img {
        width: 100%;
        height: 400px;
    }
`;

const bgArr = [
    { component: <IntroduceHotdeal />, key: 1 },
    { component: <IntroduceBoard />, key: 2 },
    { component: <IntroduceRoomReviews />, key: 3 },
];

interface IUseInterval {
    (callback: () => void, interval: number): void;
}

const useInterval: IUseInterval = (callback, interval) => {
    const savedCallback = useRef<(() => void) | null>(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }
        if (interval !== null && interval !== 10000000) {
            let id = setInterval(tick, interval);
            return () => clearInterval(id);
        }
    }, [interval]);
};

const _Main = styled.div`
    height: 300px;
    width: 100%;
`;

function IntroduceCarousel() {
    const [slideIndex, setSlideIndex] = useState(1);
    const [slideInterval, setSlideInterval] = useState(8000);

    const slideRef = useRef<HTMLDivElement>(null);

    const BG_NUM = bgArr.length;
    const beforeSlide = bgArr[BG_NUM - 1];
    const afterSlide = bgArr[0];

    let slideArr = [beforeSlide, ...bgArr, afterSlide];
    const SLIDE_NUM = slideArr.length;

    useInterval(() => setSlideIndex((prev) => prev + 1), slideInterval);

    const InfiniteSlideHandler = (flytoIndex: number) => {
        setTimeout(() => {
            if (slideRef.current) {
                slideRef.current.style.transition = '';
            }
            setSlideIndex(flytoIndex);
            setTimeout(() => {
                if (slideRef.current) {
                    slideRef.current.style.transition = 'all 500ms ease-in-out';
                }
            }, 100);
        }, 500);
    };

    if (slideIndex === SLIDE_NUM - 1) {
        InfiniteSlideHandler(1);
    }

    if (slideIndex === 0) {
        InfiniteSlideHandler(BG_NUM);
    }

    const intervalHandler = () => {
        if (slideIndex === SLIDE_NUM - 1) {
            setSlideInterval(500);
        } else {
            setSlideInterval(6000);
        }
    };

    const slideHandler = (direction: number) => {
        setSlideIndex((prev) => prev + direction);
    };

    const stopAutoSlide = () => {
        setSlideInterval(10000000);
    };

    return (
        <_Main>
            <Background>
                <SlideBtn
                    className="Left"
                    onMouseEnter={stopAutoSlide}
                    onMouseLeave={intervalHandler}
                    onClick={() => slideHandler(-1)}
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="4x" />
                </SlideBtn>
                <ImgContainer
                    ref={slideRef}
                    style={{
                        width: `${100 * SLIDE_NUM}vw`,
                        transition: 'all 500ms ease-in-out',
                        transform: `translateX(${
                            -1 * ((100 / slideArr.length) * slideIndex)
                        }%)`,
                    }}
                >
                    {slideArr.map((item, index) => (
                        <ImgBox key={index}>{item.component}</ImgBox>
                    ))}
                </ImgContainer>
                <SlideBtn
                    className="Right"
                    onMouseEnter={stopAutoSlide}
                    onMouseLeave={intervalHandler}
                    onClick={() => slideHandler(+1)}
                >
                    <FontAwesomeIcon icon={faChevronRight} size="4x" />
                </SlideBtn>
            </Background>
        </_Main>
    );
}

export { IntroduceCarousel };
