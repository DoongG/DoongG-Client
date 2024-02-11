import ShoppingHeaderSelectBar from '../components/shopping-section/mainPage/HeaderSelectBar';
import ShoppingSlideResent from '../components/shopping-section/mainPage/ResentSlideList';
import ShoppingSlideHot from '../components/shopping-section/mainPage/HotSlideList';
import { useShoppingHeaderSelectBarStore } from '../store/shoppingHeaderSelectBarStore';
import ShoppingListTest from '../components/shopping-section/mainPage/ProductList';
import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';

const _hr = styled.hr`
    margin: 0;
    padding: 1px;
    background-color: rgb(28, 57, 61);
    border-bottom: none;
    z-index: 3;
    position: relative;
    width: 100%;
    opacity: 1;
`;

//shopping
const Shopping = () => {
    const { selectButton, setSelectButton } = useShoppingHeaderSelectBarStore();
    return (
        <>
            <ShoppingHeaderSelectBar />
            {selectButton === '최근' ? (
                <ShoppingSlideResent />
            ) : (
                <ShoppingSlideHot />
            )}
            <_hr></_hr>
            <ShoppingListTest />
        </>
    );
};

export { Shopping };
