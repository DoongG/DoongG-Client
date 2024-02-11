/* eslint-disable react/jsx-pascal-case */
import ShoppingHeaderSelectBar from '../components/shopping-section/mainPage/HeaderSelectBar';
import ShoppingSlideResent from '../components/shopping-section/mainPage/ResentSlideList';
import ShoppingSlideHot from '../components/shopping-section/mainPage/HotSlideList';
import { useShoppingHeaderSelectBarStore } from '../store/shoppingHeaderSelectBarStore';
import ShoppingListTest from '../components/shopping-section/mainPage/ProductList';
import styled from 'styled-components';

//shopping
const Shopping = () => {
    const { selectButton } = useShoppingHeaderSelectBarStore();
    return (
        <>
            <_section>
                <div className="wrapper">
                    <ShoppingHeaderSelectBar />
                    {selectButton === '최근' ? (
                        <ShoppingSlideResent />
                    ) : (
                        <ShoppingSlideHot />
                    )}
                </div>
            </_section>

            <_hr></_hr>
            <ShoppingListTest />
        </>
    );
};
const _section = styled.section`
    background: #fff8fa;
    padding: 30px 0px;
    > div {
        width: 1200px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }
`;

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

export { Shopping };
