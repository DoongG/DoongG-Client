import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

interface OrderHistoryModalProps {
    onClickToggleModal: () => void;
    orderHistoryData: {
        orderId: number;
        productName: string;
        productImage: string;
        productDiscountPrice: number;
    }[];
}

function OrderHistoryModal({
    onClickToggleModal,
    orderHistoryData,
}: OrderHistoryModalProps) {
    const modalClose = () => {
        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };

    return (
        <ModalContainer>
            <DialogBox>
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>
                <_Title>주문내역</_Title>
                {orderHistoryData.map((item) => (
                    <OrderItem key={item.orderId}>
                        <ItemImage
                            src={item.productImage}
                            alt={item.productName}
                        />
                        <ItemDetails>
                            <ItemName>{item.productName}</ItemName>
                            <DiscountedPrice>
                                {item.productDiscountPrice}
                            </DiscountedPrice>
                        </ItemDetails>
                    </OrderItem>
                ))}
            </DialogBox>
            <Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (onClickToggleModal) {
                        onClickToggleModal();
                    }
                }}
            />
        </ModalContainer>
    );
}

// Additional styled components for rendering each order item
const OrderItem = styled.div`
    display: flex;
    margin: 10px 0;
`;

const ItemImage = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

const ItemDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const DiscountedPrice = styled.div`
    font-size: 14px;
    color: green;
`;
// 모달 닫기 부분
const _ModalClose = styled.div`
    font-size: 20px;
    margin-left: auto;
    &:hover {
        cursor: pointer;
    }
`;
// 모달 Title부분
const _Title = styled.div`
    @font-face {
        font-family: 'MBC1961GulimM';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/MBC1961GulimM.woff2')
            format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'MBC1961GulimM';
    font-size: 30px;
    margin-top: -20px;
`;

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10003 !important;
`;

const DialogBox = styled.dialog`
    width: 800px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 10003 !important;
`;

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 10002 !important;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { OrderHistoryModal };
