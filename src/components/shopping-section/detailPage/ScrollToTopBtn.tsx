/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTopBtn() {
    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 0) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };
        window.addEventListener('scroll', handleShowButton);
        return () => {
            window.removeEventListener('scroll', handleShowButton);
        };
    }, []);
    return (
        <>
            <_scrollTopBtn
                className="scroll-top-btn"
                onClick={scrollToTop}
                showButton={showButton}
            >
                <FaArrowUp />
            </_scrollTopBtn>
        </>
    );
}

const _scrollTopBtn = styled.button<{ showButton: boolean }>`
    width: inherit;
    font-size: 40px;
    position: fixed;
    bottom: 25px;
    right: 25px;
    background: none;
    border: none;
    color: rgb(28, 57, 61);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s ease-out;
    opacity: ${(props) => (props.showButton === true ? '1' : '0')};
`;
