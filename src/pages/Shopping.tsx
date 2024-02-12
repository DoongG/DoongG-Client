/* eslint-disable react/jsx-pascal-case */
import ShoppingHeaderSelectBar from '../components/shopping-section/mainPage/HeaderSelectBar';
import SlideList from '../components/shopping-section/mainPage/SlideList';
import styled from 'styled-components';
import NewProductList from 'components/shopping-section/mainPage/newProductList';

//shopping
const Shopping = () => {
    return (
        <>
            <_section>
                <div className="wrapper">
                    <ShoppingHeaderSelectBar />
                    <SlideList />
                </div>
            </_section>
            <NewProductList />
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

export { Shopping };
