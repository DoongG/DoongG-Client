import React from 'react';
import styled from 'styled-components';
import {
    AiOutlineClose,
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
} from 'react-icons/ai';

interface OrderHistoryModalProps {
    onClickToggleModal: () => void;
    orderHistoryData: {
        orderId: number;
        productName: string;
        productImg: string;
        productDiscountPrice: number;
    }[];
}

function OrderHistoryModal({
    onClickToggleModal,
    orderHistoryData,
}: OrderHistoryModalProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const modalClose = () => {
        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };

    const handleArrowClick = (direction: 'left' | 'right') => {
        const newIndex =
            direction === 'left'
                ? Math.max(currentIndex - 1, 0)
                : Math.min(currentIndex + 1, orderHistoryData.length - 4);
        setCurrentIndex(newIndex);
    };

    console.log(orderHistoryData);

    return (
        <ModalContainer>
            <DialogBox>
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>
                <_Title>주문내역</_Title>
                <CarouselContainer>
                    <ArrowButton onClick={() => handleArrowClick('left')}>
                        <AiOutlineArrowLeft />
                    </ArrowButton>
                    <ItemsContainer>
                        {orderHistoryData
                            .slice(currentIndex, currentIndex + 4)
                            .map((item) => (
                                <ProductInfo key={item.orderId}>
                                    <ProductImage
                                        src={item.productImg}
                                        alt={item.productName}
                                    />
                                    <ProductName>
                                        {item.productName}
                                    </ProductName>
                                    <ProductPrice>
                                        {item.productDiscountPrice}원
                                    </ProductPrice>
                                </ProductInfo>
                            ))}
                    </ItemsContainer>
                    <ArrowButton onClick={() => handleArrowClick('right')}>
                        <AiOutlineArrowRight />
                    </ArrowButton>
                </CarouselContainer>
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
const ItemsContainer = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ArrowButton = styled.div`
    display: flex;
    font-size: 20px;
    margin: 0 10px;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const ProductName = styled.div`
    margin-top: 10px;
    font-weight: bold;
`;

const ProductImage = styled.img`
    max-width: 120px;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const ProductPrice = styled.div`
    margin-top: 5px;
    font-weight: bold;
`;

// Carousel Container
const CarouselContainer = styled.div`
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    &::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }
`;

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
    height: 400px;
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
