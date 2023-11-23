import styled from 'styled-components';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useBuyModalStore } from '../store/shoppingHeaderSelectBarStore';
import { useForm } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
import fox from '../assets/fox.jpg';

interface ModalDefaultType {
    onClickbuyModal: () => void;
}

const ShoppingDetailBuy = ({
    onClickbuyModal,
    children,
}: PropsWithChildren<ModalDefaultType>) => {
    const { isOpenBuyModal, setIsOpenBuyModal } = useBuyModalStore();
    // 주소 찾는 모달 상태
    const [openPostModal, setOpenPostModal] = useState(false);

    // 우편 번호
    const [postNumber, setPostNumber] = useState('');
    // 도로명 주소
    const [postAddress, setPostAddress] = useState('');

    // 주소 찾기 버튼 이벤트
    const handleOpenPost = () => {
        setOpenPostModal(!openPostModal);
    };

    // 카카오 주소 입력
    const onCompletePost = (data: any) => {
        setOpenPostModal(false);
        setPostNumber(data.zonecode);
        setPostAddress(data.address);
    };

    // 결제 모달 닫는 함수
    const closeModal = () => {
        console.log('모달 닫기');

        setTimeout(() => {
            isOpenBuyModal && setIsOpenBuyModal(!isOpenBuyModal);
        }, 200);

        // setOpenModal(bool);
        console.log(isOpenBuyModal);
    };

    // react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        watch,
    } = useForm({ mode: 'onChange' });

    const [nameWatch, restAddress] = watch(['name', 'restAddress']);

    const onSubmit = () => {};

    return (
        <>
            <_shoppingDetailBuy>
                <_titleBox className="titleBox">
                    <div className="title">결제 확인</div>
                    <_closeModal onClick={closeModal}>
                        <AiOutlineClose />
                    </_closeModal>
                </_titleBox>
                <form>
                    <_contentBox className="contentBox">
                        <_nameBox className="nameBox">
                            <_nameLabel htmlFor="name">주문자명</_nameLabel>
                            <_nameInputBox className="nameInputBox">
                                <_nameInput
                                    type="text"
                                    placeholder="주문자명을 입력하세요"
                                    {...register('name', {
                                        required: true,
                                        minLength: {
                                            message:
                                                '최소 2글자 이상 작성해주세요',
                                            value: 2,
                                        },
                                    })}
                                />
                            </_nameInputBox>
                        </_nameBox>
                        <_addressBox className="addressBox">
                            <_addressLabel htmlFor="address">
                                배송지
                            </_addressLabel>
                            <_addressDaumBox className="addressDaumBox">
                                <_addressInput type="text" value={postNumber} />
                                <button type="button" onClick={handleOpenPost}>
                                    주소 검색
                                </button>
                            </_addressDaumBox>
                            <_addressDetailBox className="addressDetailBox">
                                <_addressInputDetail
                                    type="text"
                                    value={postAddress}
                                    placeholder="주소"
                                />
                            </_addressDetailBox>
                            <_restAddressBox className="restAddressBox">
                                <_restAddressInput
                                    type="text"
                                    placeholder="나머지 주소 입력"
                                    {...register('restAddress', {
                                        required: true,
                                        minLength: {
                                            message:
                                                '최소 2글자 이상 작성해주세요',
                                            value: 2,
                                        },
                                    })}
                                />
                            </_restAddressBox>
                        </_addressBox>
                    </_contentBox>
                    <_productBox className="productBox">
                        <_productBoxName className="productBoxName">
                            주문상품
                        </_productBoxName>
                        <_productBoxWrapper className="productBoxWrapper">
                            <_productImgBox className="productImgBox">
                                <_productImg
                                    className="productImg"
                                    src={fox}
                                    alt=""
                                />
                            </_productImgBox>
                            <_productContent className="productContent">
                                <_productTitle className="productTitle">
                                    사막여우
                                </_productTitle>
                                <_producCostBox className="productCostBox">
                                    <div className="productCost">8,700원</div>
                                    <div className="productCount">| 1개</div>
                                </_producCostBox>
                            </_productContent>
                        </_productBoxWrapper>
                    </_productBox>
                </form>
            </_shoppingDetailBuy>
            {openPostModal && (
                <_DaumPostcode
                    onComplete={onCompletePost} // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                />
            )}
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
    right: 10px;
    top: 10px;
`;

const _shoppingDetailBuy = styled.div`
    height: 90%;
    width: 40%;
    position: fixed;
    top: 50%;
    left: 50%;
    overflow: auto;
    padding: 20px 20px;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: #f5f5f5;
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
    div {
        background-color: white;
    }
`;

const _backdrop = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    backdrop-filter: blur(10px);
    top: 0;
    left: 0px;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.2);
`;

const _titleBox = styled.div`
    margin-top: 10px;
    position: relative;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid grey;
`;

const _contentBox = styled.div`
    margin-top: 10px;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
`;

const _nameBox = styled.div`
    text-align: left;
    width: 100%;
`;

const _nameLabel = styled.label`
    font-size: 12px;
`;
const _nameInputBox = styled.div`
    margin-top: 5px;
    border-bottom: 1px solid grey;
    display: flex;
    width: 100%;
`;
const _nameInput = styled.input`
    font-size: 13px;
    border: none;
    padding: 5px 7px;
    width: 100%;
    outline: none;
`;

const _addressBox = styled.div`
    text-align: left;
    width: 100%;
    margin-top: 10px;
`;

const _addressLabel = styled.label`
    font-size: 12px;
`;

const _addressDaumBox = styled.div`
    margin-top: 5px;
    border-bottom: 1px solid grey;
    display: flex;
    width: 100%;
    button {
        width: 15%;
        font-size: 9px;
    }
`;
const _addressInput = styled.input`
    font-size: 13px;
    border: none;
    padding: 5px 7px;
    width: 100%;
    outline: none;
`;

const _DaumPostcode = styled(DaumPostcode)`
    position: fixed;
    top: 50%;
    left: 50%;
    height: 90% !important;
    width: 40% !important;
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

const _addressDetailBox = styled.div`
    margin-top: 5px;
    border-bottom: 1px solid grey;
    display: flex;
    width: 100%;
`;

const _addressInputDetail = styled.input`
    font-size: 13px;
    border: none;
    padding: 5px 7px;
    width: 100%;
    outline: none;
`;

const _restAddressBox = styled.div`
    margin-top: 5px;
    border-bottom: 1px solid grey;
    display: flex;
    width: 100%;
`;

const _restAddressInput = styled.input`
    font-size: 13px;
    border: none;
    padding: 5px 7px;
    width: 100%;
    outline: none;
`;

const _productBox = styled.div`
    margin-top: 10px;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
`;
const _productBoxName = styled.div`
    font-size: 12px;
`;
const _productBoxWrapper = styled.div`
    margin-top: 10px;
    display: flex;
`;
const _productImgBox = styled.div`
    width: 60px;
    height: 60px;
`;
const _productImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;
const _productContent = styled.div`
    display: flex;
    text-align: left;
    font-weight: 600;
    padding-left: 10px;
    font-size: 12px;
    flex-direction: column;
    justify-content: space-evenly;
`;
const _productTitle = styled.div``;
const _producCostBox = styled.div`
    display: flex;
`;

const _productCost = styled.div``;
const _prodictCount = styled.div``;
export { ShoppingDetailBuy };
