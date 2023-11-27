import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useButtonStore } from '../store/shoppingHeaderSelectBarStore';

const { kakao } = window;
declare global {
    interface Window {
        kakao: any;
    }
}
const RoomReviewWatchMap = () => {
    const { button, setButton } = useButtonStore();
    const [lat, setLat] = useState(0);
    const [lng, setlng] = useState(0);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState<any>();

    const handleChangeReview = (write: string) => {
        if (write === '리뷰쓰기') {
            setButton(true);
        } else {
            setButton(false);
        }
    };
    useEffect(() => {
        // 현재 위치를 가져오는 함수
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLat(latitude);
                        setlng(longitude);
                    },
                    (error) => {
                        console.error('Error getting current location:', error);
                    },
                );
                // 카카오 지도 출력
                const container = document.getElementById('map');
                const option = {
                    center: new kakao.maps.LatLng(lat, lng),
                    level: 4,
                };

                const kakaoMap = new kakao.maps.Map(container, option);
                setMap(kakaoMap);
                console.log(lat, lng);
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getCurrentLocation();
    }, [lat, lng]);

    return (
        <>
            <_kakaoMapWrapper id="map">
                <_buttonWrapper className="buttonWrapper">
                    <button
                        onClick={() => {
                            handleChangeReview('리뷰쓰기');
                        }}
                    >
                        리뷰 달기
                    </button>
                    <button
                        onClick={() => {
                            handleChangeReview('리뷰보기');
                        }}
                    >
                        전체 리뷰 보기
                    </button>
                </_buttonWrapper>
            </_kakaoMapWrapper>
        </>
    );
};

const _kakaoMapWrapper = styled.div`
    width: 80%;
    height: calc(100vh - 50px);
`;

const _buttonWrapper = styled.div`
    position: absolute;
    z-index: 999;
    bottom: 4px;
    right: 0px;
    & > button {
        margin-right: 1px;
        padding: 5px 10px;
        border-radius: 5px;
        font-weight: 700;
        min-width: 120px;
        border: none;
        background-color: #404040;
        color: rgba(var(--bs-link-color-rgb));
    }
`;
export { RoomReviewWatchMap };
