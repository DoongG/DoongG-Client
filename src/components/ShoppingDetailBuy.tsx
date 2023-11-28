import styled from 'styled-components';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useBuyModalStore } from '../store/shoppingHeaderSelectBarStore';
import { useForm } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
import fox from '../assets/fox.jpg';

interface ModalDefaultType {
    onClickbuyModal: () => void;
    cost: number;
    count: number;
}
interface ValidProps {
    valid: boolean;
}

const ShoppingDetailBuy = ({
    onClickbuyModal,
    cost,
    count,
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

    const [nameWatch, restAddressWatch] = watch(['name', 'restAddress']);

    console.log(errors.name, errors.restAddress);

    // DB로 보내는 함수
    const onSubmit = () => {
        console.log();
    };

    // 천 단위 쉼표 추가 함수
    const addCommas = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    return (
        <>
            <_shoppingDetailBuy>
                <_titleBox className="titleBox">
                    <div className="title">결제 확인</div>
                    <_closeModal onClick={closeModal}>
                        <AiOutlineClose />
                    </_closeModal>
                </_titleBox>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                {nameWatch === undefined || nameWatch === '' ? (
                                    ''
                                ) : errors.name ? (
                                    <_inValidIcon></_inValidIcon>
                                ) : (
                                    <_VliadIcon></_VliadIcon>
                                )}
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
                                {restAddressWatch === undefined ||
                                restAddressWatch === '' ? (
                                    ''
                                ) : errors.restAddress ? (
                                    <_inValidIcon></_inValidIcon>
                                ) : (
                                    <_VliadIcon></_VliadIcon>
                                )}
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
                                    <div className="productCost">
                                        {addCommas(cost)}원
                                    </div>
                                    <div className="productCount">
                                        | {addCommas(count)}개
                                    </div>
                                </_producCostBox>
                            </_productContent>
                        </_productBoxWrapper>
                    </_productBox>
                    <_paymentBox className="paymentBox">
                        <_paymentBoxName className="paymentBoxName">
                            결제 금액
                        </_paymentBoxName>
                        <_paymentBoxContentBox className="paymentContentBox">
                            <_productCostBox className="productCostBox">
                                <_productCostTitle className="productCostTitle">
                                    상품금액
                                </_productCostTitle>
                                <_productCost className="productCost">
                                    {addCommas(cost)}원
                                </_productCost>
                            </_productCostBox>
                            <_deliveryCostBox className="deliveryCostBox">
                                <_deliveryCostTitle className="deliveryCostTitle">
                                    배송비
                                </_deliveryCostTitle>
                                <_deliveryCost className="deliveryCost">
                                    0원
                                </_deliveryCost>
                            </_deliveryCostBox>
                            <_totalCostBox className="totalCostBox">
                                <_totalCostTitle className="totalCostTitle">
                                    총 결제금액
                                </_totalCostTitle>
                                <_totalCost className="totalCost">
                                    {addCommas(cost)}원
                                </_totalCost>
                            </_totalCostBox>
                        </_paymentBoxContentBox>
                    </_paymentBox>
                    <_payButtonBox
                        className="payButtonBox"
                        valid={
                            nameWatch &&
                            errors.name === undefined &&
                            restAddressWatch &&
                            errors.restAddress === undefined
                        }
                    >
                        <button type="button">결제하기</button>
                    </_payButtonBox>
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
    height: 88%;
    width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    overflow: auto;
    padding: 20px 20px;
    border: none;
    border-radius: 10px;
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
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const _nameBox = styled.div`
    text-align: left;
    width: 100%;
`;

const _nameLabel = styled.label`
    font-size: 12px;
`;
const _nameInputBox = styled.div`
    position: relative;
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
    width: 400px !important;
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
    position: relative;
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

const _paymentBox = styled.div`
    margin-top: 10px;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
`;

const _paymentBoxName = styled.div`
    font-weight: 700;
    font-size: 12px;
`;

const _paymentBoxContentBox = styled.div`
    margin-top: 10px;
    font-size: 13px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const _productCostBox = styled.div`
    display: flex;
    justify-content: space-between;
`;
const _productCostTitle = styled.div`
    color: grey;
`;
const _productCost = styled.div`
    font-weight: 700;
`;
const _deliveryCostBox = styled.div`
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`;
const _deliveryCostTitle = styled.div`
    color: grey;
`;
const _deliveryCost = styled.div`
    font-weight: 700;
`;
const _totalCostBox = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
`;
const _totalCostTitle = styled.div`
    font-size: 15px;
    font-weight: 700;
`;
const _totalCost = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: red;
`;

const _payButtonBox = styled.div<ValidProps>`
    background-color: #e5e5e5 !important;
    margin-top: 10px;
    border: ${(props) => (props.valid ? '1px solid black' : '1px solid grey')};
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    button {
        border: none;
        color: ${(props) => (props.valid ? 'black' : 'grey')};
        background-color: #e5e5e5;
        width: 100%;
        text-align: center;
        border-radius: 3px;
        font-size: 17px;
        font-weight: 700;
        width: 100%;
        cursor: ${(props) => (props.valid ? 'pointer' : 'not-allowed')};
    }
`;
const _inValidIcon = styled.div`
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 12px;
    bottom: auto;
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5JY29ucyAvIFNldHRpbmdzIC8gSW52YWxpZDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJJY29ucy0vLVNldHRpbmdzLS8tSW52YWxpZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IngtY2lyY2xlLWYiIGZpbGw9IiNEQjQyNDEiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNy4wNzA1NTU2LDE3LjA3IEMxMy4xODE2NjY3LDIwLjk1ODg4ODkgNi44MTgzMzMzMywyMC45NTg4ODg5IDIuOTI5NDQ0NDQsMTcuMDcgQy0wLjk1ODg4ODg4OSwxMy4xODE2NjY3IC0wLjk1ODg4ODg4OSw2LjgxODMzMzMzIDIuOTI5NDQ0NDQsMi45Mjk0NDQ0NCBDNi44MTgzMzMzMywtMC45NTg4ODg4ODkgMTMuMTgxNjY2NywtMC45NTg4ODg4ODkgMTcuMDcsMi45Mjk0NDQ0NCBDMjAuOTU4ODg4OSw2LjgxODMzMzMzIDIwLjk1ODg4ODksMTMuMTgxNjY2NyAxNy4wNzA1NTU2LDE3LjA3IEwxNy4wNzA1NTU2LDE3LjA3IFogTTEzLjg5Mzg4ODksNy42NjM4ODg4OSBMMTIuMzM2MTExMSw2LjEwNjExMTExIEwxMCw4LjQ0Mjc3Nzc4IEw3LjY2Mzg4ODg5LDYuMTA2MTExMTEgTDYuMTA2NjY2NjcsNy42NjM4ODg4OSBMOC40NDI3Nzc3OCwxMCBMNi4xMDY2NjY2NywxMi4zMzYxMTExIEw3LjY2Mzg4ODg5LDEzLjg5Mzg4ODkgTDEwLDExLjU1NzIyMjIgTDEyLjMzNjExMTEsMTMuODkzODg4OSBMMTMuODkzODg4OSwxMi4zMzYxMTExIEwxMS41NTcyMjIyLDEwIEwxMy44OTM4ODg5LDcuNjYzODg4ODkgTDEzLjg5Mzg4ODksNy42NjM4ODg4OSBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)
        no-repeat;
    width: 20px;
    height: 20px;
    margin-top: -10px;
`;
const _VliadIcon = styled.div`
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 12px;
    bottom: auto;
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU1LjIgKDc4MTgxKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5JY29ucyAvIFNldHRpbmdzIC8gVmFsaWQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZyBpZD0iSWNvbnMtLy1TZXR0aW5ncy0vLVZhbGlkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iY2hlY2stY2lyY2xlLWYiIGZpbGw9IiMzQ0FBRkYiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMCwxOS45OTg4ODg5IEM0LjUwMDU1NTU2LDE5Ljk5ODg4ODkgMC4wMDExMTExMTExMSwxNS40OTg4ODg5IDAuMDAxMTExMTExMTEsOS45OTk0NDQ0NCBDMC4wMDExMTExMTExMSw0LjUwMTExMTExIDQuNTAwNTU1NTYsMC4wMDExMTExMTExMSAxMCwwLjAwMTExMTExMTExIEMxNS40OTk0NDQ0LDAuMDAxMTExMTExMTEgMTkuOTk4ODg4OSw0LjUwMTExMTExIDE5Ljk5ODg4ODksOS45OTk0NDQ0NCBDMTkuOTk4ODg4OSwxNS40OTg4ODg5IDE1LjQ5OTQ0NDQsMTkuOTk4ODg4OSAxMCwxOS45OTg4ODg5IEwxMCwxOS45OTg4ODg5IFogTTEzLjM5Nzc3NzgsNi4xMTA1NTU1NiBMOC4xMTk0NDQ0NCwxMS4yOTYxMTExIEw2LjA0NjY2NjY3LDkuMjYgTDQuNDQzODg4ODksMTAuODM0NDQ0NCBMOC4xMTk0NDQ0NCwxNC40NDUgTDkuNzIyMjIyMjIsMTIuODcwNTU1NiBMMTUuMDAwNTU1Niw3LjY4NTU1NTU2IEwxMy4zOTc3Nzc4LDYuMTEwNTU1NTYgTDEzLjM5Nzc3NzgsNi4xMTA1NTU1NiBaIE04LjExOTQ0NDQ0LDExLjI5NjExMTEgTDguMTE5NDQ0NDQsMTEuMjk2MTExMSBMOS43MjIyMjIyMiwxMi44NzA1NTU2IEw4LjExOTQ0NDQ0LDExLjI5NjExMTEgTDguMTE5NDQ0NDQsMTEuMjk2MTExMSBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==)
        no-repeat;
    width: 20px;
    height: 20px;
    margin-top: -10px;
`;
export { ShoppingDetailBuy };
