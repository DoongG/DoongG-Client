/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import {
    useMarkerOnOff,
    useVisibleMarker,
} from '../../store/shoppingHeaderSelectBarStore';
import { RoomReviews_t } from 'types/shoppingDetail';
interface Props {
    marker: boolean;
    markerOnOff: boolean;
    clickedReviewHeight: number;
}

const RoomReviewWatch = () => {
    const [markers, setMarkers] = useState<any>();
    const { visibleMarker, setVisibleMarker } = useVisibleMarker();
    // 클릭된 리뷰 박스의 높이
    const [clickedReviewHeight, setClickedReviewHeight] = useState(0);
    const clickedReviewRef = useRef<HTMLDivElement>(null);
    const {
        markerOnOff,
        clickedAddress,
        clickedDate,
        clickedContent,
        setMarkerOnOff,
    } = useMarkerOnOff();
    // 모든 마커 가져오기
    useEffect(() => {
        // 지정된 ID를 가진 유저에 대한 요청
        axios
            .get(`${process.env.REACT_APP_API_KEY}/roomRivew/getAll`)
            .then(function (response) {
                // 성공 핸들링
                setMarkers(response.data);
            })
            .catch(function (error) {
                // 에러 핸들링
            })
            .finally(function () {
                // 항상 실행되는 영역
            });
    }, []);
    // useEffect를 사용하여 _ClickedReview의 높이를 계산하고 업데이트합니다.
    useEffect(() => {
        if (clickedReviewRef.current) {
            setClickedReviewHeight(clickedReviewRef.current.offsetHeight);
        }
    }, [clickedContent]); // markerOnOff가 변경될 때마다 다시 계산

    return (
        <>
            <_RoomReviewWatchWrapper>
                {/* 클릭한 자취방 리뷰 */}
                {markerOnOff && (
                    <_ClickedReview
                        className="ClickedReview"
                        ref={clickedReviewRef}
                    >
                        <_watch className="watch">내가 본 자취방</_watch>
                        <_reviewBoxWrapper className="reviewBoxWrapper">
                            <_reviewBox className="reviewBox">
                                <_addressBox className="addressBox">
                                    <_address className="address">
                                        {clickedAddress}
                                    </_address>
                                </_addressBox>
                                <_date className="date">{clickedDate}</_date>
                                <_content className="content">
                                    내용 : {clickedContent}
                                </_content>
                            </_reviewBox>
                        </_reviewBoxWrapper>
                    </_ClickedReview>
                )}

                {/* 주위 자취방 리뷰 */}
                <_AroundReview
                    marker={markerOnOff}
                    markerOnOff={markerOnOff}
                    clickedReviewHeight={clickedReviewHeight}
                    className="AroundReview"
                >
                    <_watch className="watch">근처 자취방</_watch>
                    {visibleMarker ? (
                        visibleMarker
                            .filter((item: RoomReviews_t) => {
                                return item.address !== clickedAddress;
                            })
                            .map((item: RoomReviews_t) => {
                                return (
                                    <>
                                        <_reviewBoxWrapper className="reviewBoxWrapper">
                                            <_reviewBox className="reviewBox">
                                                <_addressBox className="addressBox">
                                                    <_address className="address">
                                                        {item.address}
                                                    </_address>
                                                </_addressBox>
                                                <_date className="date">
                                                    {
                                                        item.createdAt.split(
                                                            ' ',
                                                        )[0]
                                                    }
                                                </_date>
                                                <_content className="content">
                                                    <_contentP>
                                                        내용 : {item.content}
                                                    </_contentP>
                                                </_content>
                                            </_reviewBox>
                                        </_reviewBoxWrapper>
                                    </>
                                );
                            })
                    ) : (
                        <div>안녕</div>
                    )}
                </_AroundReview>
            </_RoomReviewWatchWrapper>
        </>
    );
};

const _RoomReviewWatchWrapper = styled.div`
    max-height: 100%;
    width: 20%;
    position: relative;
    background-color: white;
    overflow: hidden;
    @media (max-width: 991px) {
        width: 25%;
    }
    @media (max-width: 767px) {
        width: 38%;
    }
`;
const _ClickedReview = styled.div`
    margin-top: 10px;
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    &::before {
        background-color: #343a40;
        content: '';
        position: absolute;
        bottom: -15px;
        left: 50%;
        width: 95%;
        height: 3px;
        margin: 0 auto;
        /* top: 50%; */
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;
const _AroundReview = styled.div<Props>`
    overflow-y: auto;
    padding-bottom: 25px;
    padding-left: 10px;
    padding-right: 10px;
    height: ${(props) =>
        props.markerOnOff === true
            ? `calc(100vh - ${props.clickedReviewHeight + 70}px)`
            : 'calc(100vh - 48px)'};
    margin-top: ${(props) => (props.marker === true ? '25px' : '10px')};
    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgb(28, 57, 61); /* 스크롤바 색상 */
        border-radius: 10px; /* 스크롤바 둥근 테두리 */
    }

    &::-webkit-scrollbar-track {
        background: rgb(255, 202, 29); /*스크롤바 뒷 배경 색상*/
    }
`;

const _reviewBox = styled.div`
    margin-top: 5px;
    padding: 10px 0px;
    @media (max-width: 1200px) {
        margin-top: 0px;
        padding: 8px 0px;
    }
    > div {
        font-size: 13px;
        display: flex;
        justify-content: flex-start;
        @media (max-width: 1200px) {
            font-size: 12px;
        }
        @media (max-width: 575px) {
            font-size: 7px;
        }
    }
`;
const _watch = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    border-radius: 5px;

    font-size: 15px;
    padding: 10px 10px;
    text-align: left;
    background-color: rgb(28, 57, 61);
    border: 2px solid rgb(28, 57, 61);
    color: white;
    @media (max-width: 1200px) {
        padding: 7px 7px;
        font-size: 13px;
    }
    @media (max-width: 575px) {
        font-size: 11px;
    }
`;
const _reviewBoxWrapper = styled.div`
    padding: 10px 10px;
    border-top: 2px solid rgb(255, 202, 29) !important;
    background-color: rgb(28, 57, 61);
    border: 2px solid rgb(28, 57, 61);
    color: black;
    @media (max-width: 1200px) {
        padding: 7px 7px;
    }
    > div {
        border-radius: 5px;
        background-color: white;
        font-size: 13px;
        @media (max-width: 1200px) {
            font-size: 12px;
        }
        @media (max-width: 575px) {
            font-size: 10px;
        }
    }
`;
const _addressBox = styled.div`
    /* padding-bottom: 10px; */
    position: relative;
`;

const _address = styled.div`
    width: 700%;
    padding: 0px 10px;
    text-align: left;
    font-weight: 900;
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    margin: 0px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    @media (max-width: 1200px) {
        font-size: 14px;
    }
    @media (max-width: 575px) {
        font-size: 10px;
    }
`;

const _date = styled.div`
    position: relative;
    padding: 0px 10px;
    padding-bottom: 10px;
    font: grey;
    @media (max-width: 1200px) {
        padding-bottom: 8px;
    }
    &::before {
        background-color: #00000040;
        content: '';
        position: absolute;
        bottom: -3px;
        width: 90%;
        height: 3px;
        @media (max-width: 575px) {
            width: 77%;
        }
    }
`;
const _content = styled.div`
    padding: 0px 10px;
    padding-top: 10px;
`;
const _contentP = styled.p`
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    margin: 0px;

    display: -webkit-box;
    -webkit-line-clamp: 2; // 원하는 라인수
    -webkit-box-orient: vertical;
`;
export { RoomReviewWatch };
