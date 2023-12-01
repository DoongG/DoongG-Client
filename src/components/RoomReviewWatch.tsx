import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useStore } from 'zustand';
import {
    useMarkerOnOff,
    useVisibleMarker,
} from '../store/shoppingHeaderSelectBarStore';
interface Props {
    marker: boolean;
    markerOnOff: boolean;
}
interface VisibleMarker {
    address: string;
    content: string;
    createdAt: string;
    id: number;
    latitude: string | number;
    longitude: string | number;
}

const RoomReviewWatch = () => {
    const [markers, setMarkers] = useState<any>();
    const { visibleMarker, setVisibleMarker } = useVisibleMarker();
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
            .get('http://localhost:8080/roomRivew/getAll')
            .then(function (response) {
                // 성공 핸들링
                setMarkers(response.data);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log(error);
            })
            .finally(function () {
                // 항상 실행되는 영역
            });
    }, []);
    return (
        <>
            <_RoomReviewWatchWrapper>
                {/* 클릭한 자취방 리뷰 */}
                {markerOnOff && (
                    <_ClickedReview className="ClickedReview">
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
                    className="AroundReview"
                >
                    <_watch className="watch">근처 자취방</_watch>
                    {visibleMarker &&
                        visibleMarker
                            .filter((item: VisibleMarker) => {
                                return item.address !== clickedAddress;
                            })
                            .map((item: VisibleMarker) => {
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
                                                    내용 : {item.content}
                                                </_content>
                                            </_reviewBox>
                                        </_reviewBoxWrapper>
                                    </>
                                );
                            })}
                </_AroundReview>
            </_RoomReviewWatchWrapper>
        </>
    );
};

const _RoomReviewWatchWrapper = styled.div`
    max-height: 100%;
    width: 20%;
    position: relative;
    background-color: #daddb1;
    overflow: hidden;
`;
const _ClickedReview = styled.div`
    margin-top: 10px;
    position: relative;
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
    height: ${(props) =>
        props.markerOnOff === true
            ? 'calc(100vh - 227px)'
            : 'calc(100vh - 60px)'};
    margin-top: ${(props) => (props.marker === true ? '25px' : '10px')};
`;
const _reviewBox = styled.div`
    margin-top: 5px;
    padding: 10px 0px;
    > div {
        font-size: 13px;
        display: flex;
        justify-content: flex-start;
    }
`;
const _watch = styled.div`
    font-weight: 700;
    font-size: 15px;
    padding: 0px 10px;
    text-align: left;
`;
const _reviewBoxWrapper = styled.div`
    padding: 0px 10px;
    > div {
        border-radius: 5px;
        background-color: white;
        font-size: 13px;
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
`;

const _date = styled.div`
    position: relative;
    padding: 0px 10px;
    padding-bottom: 10px;
    font: grey;
    &::before {
        background-color: #00000040;
        content: '';
        position: absolute;
        bottom: -3px;
        width: 90%;
        height: 3px;
    }
`;
const _content = styled.div`
    padding: 0px 10px;
    padding-top: 10px;
`;
export { RoomReviewWatch };
