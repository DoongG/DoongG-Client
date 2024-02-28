/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';

import {
    useButtonStore,
    useCenterLatLng,
    useMarkerOnOff,
    useReviewDateStore,
    useVisibleMarker,
} from '../../store/shoppingHeaderSelectBarStore';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import { FaLocationCrosshairs } from 'react-icons/fa6';

const { kakao } = window;
declare global {
    interface Window {
        kakao: any;
    }
}

interface Props {
    button: boolean;
}
const RoomReviewWatchMap = () => {
    const { button, setButton } = useButtonStore();
    const [lat, setLat] = useState(0);
    const [lng, setlng] = useState(0);
    const [map, setMap] = useState<any>();
    const [marker, setMarker] = useState<any>();
    // 주소 찾는 모달 상태
    const [openPostModal, setOpenPostModal] = useState(false);
    // 주소 입력 모달 상태 state
    const [daumAddress, setDaumAddress] = useState('');
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
    // 현재 위치를 가져오는 함수
    useEffect(() => {
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
            });
        }
    }, [map]);

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

    // 주소 검색 함수
    const onSearchAddress = () => {
        // 주소 찾기 버튼 이벤트
        setOpenPostModal(!openPostModal);
    };

    // 주소 검색 후 지도 이동
    const onCompletePost = (data: any) => {
        setOpenPostModal(false);
        if (map) {
            let geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(
                data.address,
                function (result: any, status: any) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        let currentPos = new window.kakao.maps.LatLng(
                            result[0].y,
                            result[0].x,
                        );
                        // 새로운 마커 생성
                        const newMarker = new window.kakao.maps.Marker({
                            position: currentPos,
                            map: map,
                        });
                        // 기존 마커가 있으면 지도에서 제거합니다.
                        if (marker) {
                            marker.setMap(null);
                        }
                        setMarker(newMarker);
                        newMarker.setMap(map);
                        setDaumAddress(data.address);
                        setAddress(data.address);
                        map.panTo(currentPos);
                        setMap(map);
                    }
                },
            );
        }
    };
    // 현위치 이동 함수
    const onhandleNowPlace = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setMylat(position.coords.latitude);
                setMylng(position.coords.longitude);
                // 주소-좌표 변환 객체를 생성
                var geocoder = new window.kakao.maps.services.Geocoder();
                geocoder.coord2Address(
                    position.coords.longitude,
                    position.coords.latitude,
                    (result: any, status: any) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            let addr = !!result[0].road_address
                                ? result[0].road_address.address_name
                                : result[0].address.address_name;
                            setAddress(addr);
                        }
                    },
                );
            });
        }
        // 기존 마커를 제거하고 새로운 마커를 넣는다.
        let currentPos = new window.kakao.maps.LatLng(mylat, mylng);
        map.panTo(currentPos);
        setMap(map);
        marker.setMap(null);
        marker.setPosition(currentPos);
        marker.setMap(map);
    };
    return (
        <>
            <_kakaoMapWrapper id="map">
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
                {map && (
                    <_searchAddressInputBox className="Hello">
                        <_inputBox
                            className="inputBox"
                            onClick={onSearchAddress}
                        >
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
                                    onComplete={onCompletePost} // 값을 선택할 경우 실행되는 이벤트
                                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                    defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                                />
                            )}
                        </_inputBox>
                    </_searchAddressInputBox>
                )}

                <_nowIconBox className="nowIcon" onClick={onhandleNowPlace}>
                    <FaLocationCrosshairs />
                </_nowIconBox>
            </_kakaoMapWrapper>
        </>
    );
};

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
    height: calc(100vh - 50px);
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
export { RoomReviewWatchMap };
