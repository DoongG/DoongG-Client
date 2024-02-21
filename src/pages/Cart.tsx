/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';

import Title from 'components/shopping-section/cart/Title';
import Form from 'components/shopping-section/cart/Form';
import PaymentBox from 'components/shopping-section/cart/PaymentBox';

export default function Cart() {
    return (
        <>
            <_wrapper className="wrapper">
                <Title />
                <Form />
            </_wrapper>
        </>
    );
}
const _wrapper = styled.div`
    width: 1250px;
    margin: 0 auto;
    position: relative;
    padding: 70px 0px 70px;
`;
