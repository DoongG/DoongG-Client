/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';

export default function Title() {
    return (
        <>
            <_title className="title">
                <_h1>장바구니</_h1>
                <_subTitle className="subTitle">
                    <_h3>배송 안내사항</_h3>
                    <hr />
                    <_ul>
                        <_li>
                            '오늘출발' 상품과 '일반배송' 상품을 함께 구매할 경우
                            , '일반배송' 으로 발송될 수 있습니다. 빨리 받아야할
                            상품이 있는 경우 '오늘출발' 상품과 '일반배송' 상품을
                            나누어 주문해주세요.
                        </_li>
                    </_ul>
                </_subTitle>
            </_title>
        </>
    );
}

const _title = styled.div`
    text-align: left;
`;
const _h1 = styled.h1`
    margin-top: 0%;
    margin-bottom: 4rem;
    font-size: 38px;
`;

const _subTitle = styled.div`
    width: 65%;
`;

const _h3 = styled.h3`
    font-size: 20px;
`;
const _ul = styled.ul`
    padding-left: 20px;
`;

const _li = styled.li`
    font-size: 14px;
    color: #8e8c8a;
`;
