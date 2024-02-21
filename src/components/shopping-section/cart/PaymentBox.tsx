/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';

export default function PaymentBox() {
    return (
        <>
            <_paymentBox className="payment-box">
                <_innerBox>
                    <_orderPriceBox className="order-price-box">
                        <_totalOrderPriceBox className="total-order-price-box">
                            <span>총 상품금액</span>
                            <span>1,800원</span>
                        </_totalOrderPriceBox>
                        <_totalDeliveryBox className="total-delivery-box">
                            <span>총 배송비</span>
                            <span>+ 2,500원</span>
                        </_totalDeliveryBox>
                    </_orderPriceBox>
                    <_totalPriceBox className="total-price-box">
                        <span>총 결제 예정금액</span>
                        <span>3,600원</span>
                    </_totalPriceBox>
                </_innerBox>
                <_payBtn>
                    <span className="quantity">총 1개</span>|
                    <span>5,900원 주문하기</span>
                </_payBtn>
            </_paymentBox>
        </>
    );
}

const _paymentBox = styled.div`
    width: 28%;
    height: 300px;
    position: sticky;
    top: 0;
    margin: 0 auto;
`;

const _innerBox = styled.div`
    width: 100%;
    border: 1px solid #d2d1d0;
    border-radius: 5px;
    margin-top: 43px;
    padding: 1.5rem;
`;

const _orderPriceBox = styled.div`
    line-height: 2.3;
`;
const _totalOrderPriceBox = styled.div`
    display: flex;
    justify-content: space-between;
`;
const _totalDeliveryBox = styled.div`
    display: flex;
    justify-content: space-between;
`;
const _totalPriceBox = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    border-top: 2px solid black;
    padding-top: 10px;
    font-weight: 700;
    & > :nth-child(1) {
        display: flex;
        align-items: flex-end;
        font-size: 18px;
    }
    & > :nth-child(2) {
        font-size: 32px;
    }
`;
const _payBtn = styled.button`
    margin-top: 30px;
    border-color: #ff5442;
    border-radius: 5px;
    background: #ff5442;
    height: 64px;
    width: 400px;
    border: none;
    color: white;
    font-size: 18px;
    font-weight: 700;
    & > :nth-child(1) {
        margin-right: 10px;
    }
    & > :nth-child(2) {
        margin-left: 10px;
    }
`;
