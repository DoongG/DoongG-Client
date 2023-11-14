import { useState } from 'react';
import create from 'zustand';
import styled from 'styled-components';
import useShoppingHeaderSelectBarStore from '../store/shoppingHeaderSelectBar';

interface Props {
    isSelected: boolean;
}

const _selectWrapperBox = styled.div`
    display: flex;
    padding: 40px;
`;

const _selectInnerBox = styled.div`
    display: flex;
`;

const _selectButton = styled.button<Props>`
    background-color: inherit;
    border: none;
    font-size: 32px;
    cursor: pointer;
    font-weight: 700;
    color: ${(props) => (props.isSelected ? 'black' : '#c1c1c1')};
`;

const _bar = styled.div`
    font-size: 32px;
    padding: 0px 10px;
    cursor: pointer;
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
