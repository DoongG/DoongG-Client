import ShoppingHeaderSelectBar from '../components/ShoppingHeaderSelectBar';
import ShoppingSlideResent from '../components/ShoppingSlideResent';
import ShoppingSlideHot from '../components/ShoppingSlideHot';
import { useShoppingHeaderSelectBarStore } from '../store/shoppingHeaderSelectBarStore';
import ShoppingList from '../components/ShoppingList';
import ShoppingListTest from '../components/ShoppingListTest';
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
