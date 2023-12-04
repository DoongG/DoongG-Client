import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import character from '../assets/Mascot-removebg-preview.png';

interface PageProps {
    currentPage: number;
}

const slideLeft = keyframes`
  from {
    transform: translateX(0);
    opacity: 0;
  }
  to {
    transform: translateX(-30%);
    opacity: 1;
  }
`;

const slideRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 0;
  }
  to {
    transform: translateX(40%);
    opacity: 1;
  }
`;

const _MainSection = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    background-color: rgb(28, 57, 61);
    position: relative;
    overflow: auto;
`;

const _Character1 = styled.img`
    width: 400px;
    height: 400px;
    position: absolute;
    bottom: 20%;
    right: 0;
    animation: ${slideLeft} 4s forwards;
`;

const _ExplainTotal = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    font-size: 60px;
    color: white;
    position: absolute;
    left: 0;
    top: 15%;
    text-align: left;
    animation: ${slideRight} 4s forwards;
`;

const _Explain = styled.div`
    font-size: 60px;
    margin-bottom: -20px;
`;

const _PageNum = styled.ul`
    position: absolute;
    color: white;
    font-size: 20px;
    right: 10%;
    top: 10%;
    &:hover {
        cursor: pointer;
    }
    li.selected {
        color: rgb(255, 202, 29);
    }
`;

const _Page1 = styled.div<PageProps>`
    height: 100%;
    display: ${({ currentPage }) => (currentPage === 1 ? 'block' : 'none')};
`;
const _Page2 = styled.div<PageProps>`
    height: 100%;
    display: ${({ currentPage }) => (currentPage === 2 ? 'block' : 'none')};
`;
const _Page3 = styled.div<PageProps>`
    height: 100%;
    display: ${({ currentPage }) => (currentPage === 3 ? 'block' : 'none')};
`;
const _Page4 = styled.div<PageProps>`
    height: 100%;
    display: ${({ currentPage }) => (currentPage === 4 ? 'block' : 'none')};
`;

const IntroduceHotdeal1 = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            const scrollPosition = container.scrollTop;
            const pageHeight = container.clientHeight;
            const newPage = Math.floor(scrollPosition / pageHeight) + 1;

            if (newPage !== currentPage && newPage >= 1) {
                setCurrentPage(newPage);
            }
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const handleScroll = () => {
                // 스크롤 이벤트 핸들러 로직
                const scrollPosition = container.scrollTop;
                const pageHeight = container.clientHeight;
                const newPage = Math.floor(scrollPosition / pageHeight) + 1;

                if (newPage !== currentPage && newPage >= 1) {
                    setCurrentPage(newPage);
                }
            };

            container.addEventListener('scroll', handleScroll);

            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    return (
        <_MainSection ref={containerRef}>
            <_Page1 currentPage={currentPage}>
                <_ExplainTotal>
                    <_Explain>
                        <span style={{ color: 'rgb(255, 202, 29)' }}>
                            알깽이
                        </span>
                        와
                    </_Explain>
                    <_Explain>함께하는</_Explain>
                    <_Explain>자취생 LIFE</_Explain>
                </_ExplainTotal>
                <_Character1 src={character} />
            </_Page1>
            <_Page2 currentPage={currentPage}>
                <_ExplainTotal>
                    <_Explain>
                        <span style={{ color: 'rgb(255, 202, 29)' }}>
                            알깽이
                        </span>
                        와
                    </_Explain>
                    <_Explain>저렴한 가격으로</_Explain>
                    <_Explain>구매</_Explain>
                </_ExplainTotal>
                <_Character1 src={character} />
            </_Page2>
            <_Page3 currentPage={currentPage}>
                <_ExplainTotal>
                    <_Explain>
                        <span style={{ color: 'rgb(255, 202, 29)' }}>
                            알깽이
                        </span>
                        와
                    </_Explain>
                    <_Explain>자취 라이프 꿀팁</_Explain>
                    <_Explain>공유</_Explain>
                </_ExplainTotal>
                <_Character1 src={character} />
            </_Page3>
            <_Page4 currentPage={currentPage}>
                <_ExplainTotal>
                    <_Explain>
                        <span style={{ color: 'rgb(255, 202, 29)' }}>
                            알깽이
                        </span>
                        가
                    </_Explain>
                    <_Explain>알려주는 지역별</_Explain>
                    <_Explain>자취방 리뷰</_Explain>
                </_ExplainTotal>
                <_Character1 src={character} />
            </_Page4>
            <_PageNum>
                <li
                    onClick={() => handlePageClick(1)}
                    className={currentPage === 1 ? 'selected' : ''}
                ></li>
                <li
                    onClick={() => handlePageClick(2)}
                    className={currentPage === 2 ? 'selected' : ''}
                ></li>
                <li
                    onClick={() => handlePageClick(3)}
                    className={currentPage === 3 ? 'selected' : ''}
                ></li>
                <li
                    onClick={() => handlePageClick(4)}
                    className={currentPage === 4 ? 'selected' : ''}
                ></li>
                <li></li>
            </_PageNum>
        </_MainSection>
    );
};

export { IntroduceHotdeal1 };
