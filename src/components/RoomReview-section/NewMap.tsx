/* eslint-disable react/jsx-pascal-case */
import { useRef, useState } from 'react';
import {
    useButtonStore,
    useReviewDateStore,
} from 'store/shoppingHeaderSelectBarStore';
import styled from 'styled-components';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';
import DaumPostcode from 'react-daum-postcode';
import useMap from 'hooks/useMap';

interface Props {
    button: boolean;
}

export default function NewMap() {
    // 클릭한 곳의 내용
    const {
        address,
        mylat,
        mylng,
        map,
        marker,
        setAddress,
        setMylat,
        setMylng,
        setMap,
        setMarker,
    } = useReviewDateStore();
    const { button, setButton } = useButtonStore();
    // 주소 찾는 모달 상태
    const [openPostModal, setOpenPostModal] = useState(false);
    // 주소 입력 모달 상태 state
    const [daumAddress, setDaumAddress] = useState('');
    const newMap = useRef(null);
    const handleChangeReview = (write: string) => {
        if (write === '리뷰쓰기') {
            setButton(true);
        } else {
            setButton(false);
        }
    };
    // 주소 검색 함수
    const onSearchAddress = () => {
        // 주소 찾기 버튼 이벤트
        setOpenPostModal(!openPostModal);
    };
    const { placeCurLocation } = useMap(newMap);

    return (
        <>
            <_kakaoMapWrapper ref={newMap} className="newMap">
                <_buttonWrapper className="buttonWrapper">
                    <_buttonWrite
                        button={button}
                        onClick={() => {
                            handleChangeReview('리뷰쓰기');
                        }}
                    >
                        리뷰 달기
                    </_buttonWrite>
                    <_buttonSee
                        button={button}
                        onClick={() => {
                            handleChangeReview('리뷰보기');
                        }}
                    >
                        전체 리뷰 보기
                    </_buttonSee>
                </_buttonWrapper>
                <_searchAddressInputBox className="Hello">
                    <_inputBox className="inputBox" onClick={onSearchAddress}>
                        <input
                            type="text"
                            id="addr"
                            placeholder="주소를 입력해주세요"
                            value={daumAddress}
                        />
                        <_iconBox className="iconBox">
                            <_customIcon />
                        </_iconBox>
                        {openPostModal && (
                            <_DaumPostcode
                                onComplete={() =>
                                    console.log('주소 입력후 지도 위치 변경')
                                } // 값을 선택할 경우 실행되는 이벤트
                                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                            />
                        )}
                    </_inputBox>
                </_searchAddressInputBox>

                <_nowIconBox className="nowIcon" onClick={placeCurLocation}>
                    <FaLocationCrosshairs />
                </_nowIconBox>
            </_kakaoMapWrapper>
        </>
    );
}

const _nowIconBox = styled.div`
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgb(28, 57, 61);
    color: rgb(28, 57, 61);
    top: 170px;
    border: 1px solid #f8f9fa;
    background-color: #f8f9fa;
    font-size: 31px;
    display: flex;
    position: absolute;
    right: 8px;
    z-index: 2;
`;

const _kakaoMapWrapper = styled.div`
    width: 80%;
    height: calc(100vh - 60px);
`;

const _buttonWrapper = styled.div`
    position: absolute;
    z-index: 999;
    bottom: 4px;
    right: 0px;
`;
const _buttonWrite = styled.button<Props>`
    margin-right: 5px;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: 700;
    min-width: 113px;
    border: none;
    background-color: rgb(28, 57, 61);

    color: ${(props) =>
        props.button === true ? 'rgb(255, 202, 29)' : 'white'};
`;
const _buttonSee = styled.button<Props>`
    margin-right: 5px;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: 700;
    min-width: 113px;
    border: none;
    background-color: rgb(28, 57, 61);
    color: ${(props) =>
        props.button === true ? 'white' : 'rgb(255, 202, 29)'};
`;
const _searchAddressInputBox = styled.div`
    box-shadow: 0px 0px 5px rgb(28, 57, 61);
    left: 16px;
    top: 10px;
    position: absolute;
    z-index: 999;
    border: 1px solid rgb(28 57 61 / 38%);
    background-color: white;
    padding: 10px;
`;
const _inputBox = styled.div`
    display: flex;
    align-items: center;
    border: 2px solid rgb(28, 57, 61);
    border-radius: 3px;
    position: relative;

    & > input {
        width: 285px;
        border: none;
        font-size: 13px;
        padding: 0px 10px;
        outline: none;
        @media (max-width: 575px) {
            width: 170px;
        }
    }
`;
const _iconBox = styled.div`
    height: 100%;

    background-color: rgb(28, 57, 61);
`;
const _customIcon = styled(IoIosSearch)`
    margin-right: 5px;
    margin-left: 5px;
    color: white;
`;
const _DaumPostcode = styled(DaumPostcode)`
    position: absolute;
    top: 236px;
    left: 156px;

    width: 335px !important;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 4;
    /* transform: translate(-50%, -50%); */
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
