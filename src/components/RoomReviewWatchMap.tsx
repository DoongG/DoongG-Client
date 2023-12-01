import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
    useButtonStore,
    useCenterLatLng,
    useMarkerOnOff,
    useReviewDateStore,
    useVisibleMarker,
} from '../store/shoppingHeaderSelectBarStore';
import axios from 'axios';

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
    const [map, setMap] = useState<any>();
    // 모든 마커
    const [markers, setMarkers] = useState<any>();
    // 지도에 보이는 마커
    const { visibleMarker, setVisibleMarker } = useVisibleMarker();
    // 클릭한 곳의 내용
    const { address, mylat, mylng, setAddress, setMylat, setMylng } =
        useReviewDateStore();
    // 지도 중심 내용
    const {
        centerLat,
        centerLng,
        centerLevel,
        count,
        setCount,
        setCenterLat,
        setCenterLng,
        setCenterLevel,
    } = useCenterLatLng();

    const {
        markerOnOff,
        setClickedAddress,
        setClickedDate,
        setClickedContent,
        setMarkerOnOff,
    } = useMarkerOnOff();

    const handleChangeReview = (write: string) => {
        if (write === '리뷰쓰기') {
            setButton(true);
        } else {
            setButton(false);
        }
    };

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
                    center: new kakao.maps.LatLng(centerLat, centerLng),
                    level: `${centerLevel}`,
                };
                const kakaoMap = new kakao.maps.Map(container, option);
                setMap(kakaoMap);

                // 마커 이미지의 이미지 주소입니다
                let imageSrc =
                    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
                // 모든 마커 띄우기
                if (markers) {
                    const markerList = markers.map((markerData: any) => {
                        // 마커 이미지의 이미지 크기 입니다
                        let imageSize = new kakao.maps.Size(24, 35);

                        // 마커 이미지를 생성합니다
                        let markerImage = new kakao.maps.MarkerImage(
                            imageSrc,
                            imageSize,
                        );
                        const marker = new kakao.maps.Marker({
                            position: new kakao.maps.LatLng(
                                markerData.latitude,
                                markerData.longitude,
                            ),
                            map: kakaoMap,
                            title: markerData.content,
                            image: markerImage, // 마커 이미지
                        });
                        marker.address = markerData.address;
                        marker.createdAt = markerData.createdAt;

                        // 마커 클릭 이벤트 등록
                        kakao.maps.event.addListener(
                            marker,
                            'click',
                            function () {
                                // 클릭한 마커의 정보 가져오기
                                const clickedMarkerContent = marker.getTitle();
                                const clickedMarkerPosition =
                                    marker.getPosition();
                                setClickedAddress(marker.address);
                                setClickedDate(marker.createdAt.split(' ')[0]);
                                setClickedContent(clickedMarkerContent);
                                setMarkerOnOff(true);
                            },
                        );

                        return marker;
                    });
                    // Create a clusterer and set the map
                    const clusterer = new kakao.maps.MarkerClusterer({
                        map: kakaoMap,
                        averageCenter: true,
                        minLevel: 1,
                    });
                    // 클러스터 추가
                    clusterer.addMarkers(markerList);

                    // 컴포넌트가 열렸을 때 현재위치의 방 리뷰들을 볼 수 있는 코드
                    // 지도 영역정보를 얻어옵니다
                    let bounds = map.getBounds();
                    // 영역정보의 남서쪽 정보를 얻어옵니다
                    let sw = bounds.getSouthWest();
                    // 영역정보의 북동쪽 정보를 얻어옵니다
                    let ne = bounds.getNorthEast();
                    // 지도영역 마커만 filter
                    const selectedMarker = markers.filter((item: any) => {
                        // 현재 지도 영역의 남서쪽, 북동쪽 좌표
                        let lb = new kakao.maps.LatLngBounds(sw, ne);
                        let l1 = new kakao.maps.LatLng(
                            item.latitude,
                            item.longitude,
                        );
                        // true -> 출력O
                        // false -> 출력X
                        return lb.contain(l1);
                    });
                    // console.log(selectedMarker);
                    setVisibleMarker(selectedMarker);
                }
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getCurrentLocation();
    }, [markers]);

    // 지도 영역에 포함된 마커만 추출하기
    useEffect(() => {
        if (map) {
            kakao.maps.event.addListener(map, 'bounds_changed', function () {
                // 지도 영역정보를 얻어옵니다
                let bounds = map.getBounds();

                // 영역정보의 남서쪽 정보를 얻어옵니다
                let sw = bounds.getSouthWest();

                // 영역정보의 북동쪽 정보를 얻어옵니다
                let ne = bounds.getNorthEast();

                // 지도영역 마커만 filter
                if (markers) {
                    const selectedMarker = markers.filter((item: any) => {
                        // 현재 지도 영역의 남서쪽, 북동쪽 좌표
                        let lb = new kakao.maps.LatLngBounds(sw, ne);
                        let l1 = new kakao.maps.LatLng(
                            item.latitude,
                            item.longitude,
                        );
                        // true -> 출력O
                        // false -> 출력X
                        return lb.contain(l1);
                    });
                    setVisibleMarker(selectedMarker);
                }

                // console.log(selectedMarker);
            });
        }
    }, [map]);
    // console.log(visibleMarker);

    // 지도 중심 좌표
    useEffect(() => {
        if (map) {
            kakao.maps.event.addListener(map, 'center_changed', function () {
                // 지도의  레벨을 얻어옵니다
                var level = (map as any).getLevel();
                // 지도의 중심좌표를 얻어옵니다
                var latlng = (map as any).getCenter();
                setCenterLat(latlng.getLat());
                setCenterLng(latlng.getLng());
                setCenterLevel(level);
            });
        }
    }, [map]);

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
