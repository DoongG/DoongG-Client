import styled from 'styled-components';
import React, { PropsWithChildren, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useBuyModalStore } from '../store/shoppingHeaderSelectBarStore';
interface ModalDefaultType {
    onClickbuyModal: () => void;
}

const ShoppingDetailBuy = ({
    onClickbuyModal,
    children,
}: PropsWithChildren<ModalDefaultType>) => {
    const { isOpenBuyModal, setIsOpenBuyModal } = useBuyModalStore();

    // 모달 생기면 뒷 배경 스크롤 막는 함수
    //     useEffect(() => {
    //         document.body.style.cssText = `
    // position: fixed;
    // top: -${window.scrollY}px;
    // overflow-y: scroll;
    // width: 100%;`;
    //         return () => {
    //             const scrollY = document.body.style.top;
    //             document.body.style.cssText = '';
    //             window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    //         };
    //     }, []);

    // 모달 닫는 함수
    const closeModal = () => {
        console.log('모달 닫기');

        setTimeout(() => {
            isOpenBuyModal && setIsOpenBuyModal(!isOpenBuyModal);
        }, 200);

        // setOpenModal(bool);
        console.log(isOpenBuyModal);
    };

    return (
        <>
            <_shoppingDetailBuy>
                hello
                <_closeModal onClick={closeModal}>
                    <AiOutlineClose />
                </_closeModal>
            </_shoppingDetailBuy>
            <_backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();

                    if (onClickbuyModal) {
                        onClickbuyModal();
                    }
                }}
            />
        </>
    );
};

const _closeModal = styled.div`
    position: absolute;
    right: 30px;
    top: 30px;
`;

const _shoppingDetailBuy = styled.div`
    height: 90%;
    width: 82%;
    position: fixed;
    top: 50%;
    left: 50%;
    overflow: scroll;
    background-color: white;
    padding: 20px 110px;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 4;
    transform: translate(-50%, -50%);
    animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    @keyframes scale-in-center {
        0% {
            -webkit-transform: scale(0);
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: scale(1);
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;

const _backdrop = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0px;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { ShoppingDetailBuy };
