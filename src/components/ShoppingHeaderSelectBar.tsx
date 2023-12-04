import { useState } from 'react';
import create from 'zustand';
import styled from 'styled-components';
import { useShoppingHeaderSelectBarStore } from '../store/shoppingHeaderSelectBarStore';

interface Props {
    isSelected: boolean;
}

const _selectWrapperBox = styled.div`
    background-color: white;
    display: flex;
    padding: 20px 55px;
    position: relative;
    z-index: 3;
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    @media (max-width: 575px) {
        padding: 17px 25px;
    }
`;

const _selectInnerBox = styled.div`
    display: flex;
`;

const _selectButton = styled.button<Props>`
    background-color: inherit;
    border: none;
    font-size: 24px;
    cursor: pointer;

    color: ${(props) => (props.isSelected ? 'rgb(255, 202, 29)' : '#c1c1c1')};
    @media (max-width: 767px) {
        font-size: 18px;
    }
    @media (max-width: 575px) {
        min-width: 150px;
    }
`;

const _bar = styled.div`
    font-size: 24px;
    padding: 0px 10px;
    cursor: pointer;
    color: rgb(28, 57, 61);
    @media (max-width: 767px) {
        font-size: 18px;
    }
`;

export default function ShoppingHeaderSelectBar() {
    const { selectButton, setSelectButton } = useShoppingHeaderSelectBarStore();

    const handleButtonClick = (button: string) => {
        setSelectButton(button);
    };

    return (
        <>
            <_selectWrapperBox className="selectWrapperBox">
                <_selectInnerBox className="selectInnerBox">
                    <_selectButton
                        isSelected={selectButton === '최근'}
                        onClick={() => handleButtonClick('최근')}
                    >
                        최근 올라온 상품
                    </_selectButton>
                    <_bar>|</_bar>
                    <_selectButton
                        isSelected={selectButton === '인기'}
                        onClick={() => handleButtonClick('인기')}
                    >
                        인기 상품
                    </_selectButton>
                </_selectInnerBox>
            </_selectWrapperBox>
        </>
    );
}
