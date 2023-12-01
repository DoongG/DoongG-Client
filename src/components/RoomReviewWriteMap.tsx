import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RoomReviewWrite } from './RoomReviewWrite';
import { RoomReviewWatch } from './RoomReviewWatch';
import {
    useButtonStore,
    useCenterLatLng,
    useReviewDateStore,
} from '../store/shoppingHeaderSelectBarStore';

const { kakao } = window;

declare global {
    interface Window {
        kakao: any;
    }
}
const RoomReviewWriteMap = () => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState<any>();

    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    const { button, setButton } = useButtonStore();
    // 클릭한 곳의 내용
    const { address, mylat, mylng, setAddress, setMylat, setMylng } =
        useReviewDateStore();

    // 지도 중심 내용
    const {
        centerLat,
        centerLng,
        centerLevel,
        setCenterLat,
        setCenterLng,
        setCenterLevel,
        count,
        setCount,
    } = useCenterLatLng();

    // 인포 윈도우 내용
    let iwContent = '<div style="padding:5px;">자취방 리뷰달기 </div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(centerLat, centerLng),
        iwRemoveable = true; //삭제 가능

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
    });

    // 현재 위치 위도,경도 값 가져오기
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // setLatitude(position.coords.latitude);
                    // setLongitude(position.coords.longitude);
                    setMylat(position.coords.latitude);
                    setMylng(position.coords.longitude);
                    // 주소-좌표 변환 객체를 생성
                    var geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.coord2Address(
                        count == 0 ? position.coords.longitude : centerLng,
                        count == 0 ? position.coords.latitude : centerLat,
                        (result: any, status: any) => {
                            if (
                                status === window.kakao.maps.services.Status.OK
                            ) {
                                let addr = !!result[0].road_address
                                    ? result[0].road_address.address_name
                                    : result[0].address.address_name;
                                setAddress(addr);
                            }
                        },
                    );

                    // 카카오 지도 출력
                    const container = document.getElementById('map');
                    const option = {
                        center: new kakao.maps.LatLng(
                            count == 0 ? position.coords.latitude : centerLat,
                            count == 0 ? position.coords.longitude : centerLng,
                        ),
                        level: `${centerLevel}`,
                    };
                    const kakaoMap = new kakao.maps.Map(container, option);

                    // 초기 마커 생성
                    const initialMarker = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(
                            count == 0 ? position.coords.latitude : centerLat,
                            count == 0 ? position.coords.longitude : centerLng,
                        ),
                        map: kakaoMap,
                    });

                    setMap(kakaoMap);
                    setMarker(initialMarker);
                    console.log(count);

                    setCount(count + 1);
                },
                //에러 메시지
                (error) => console.log(error),
                // 정확도를 위한 설정
                {
                    enableHighAccuracy: true,
                    maximumAge: 30000,
                    timeout: 30000,
                },
            );
        } else {
            // geolocation 사용 불가능할 때 기본 위치로 판교 좌표 설정
            setLatitude(37.402056);
            setLongitude(127.108212);

            // 초기 마커 생성
            const initialMarker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(37.402056, 127.108212),
                map: map,
            });
            setMarker(initialMarker);
        }
    }, []);

    // 지도 클릭시 마커 생성 이벤트
    useEffect(() => {
        if (map) {
            infowindow.open(map, marker);
            window.kakao.maps.event.addListener(
                map,
                'click',
                function (mouseEvent: any) {
                    // 주소-좌표 변환 객체를 생성
                    var geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.coord2Address(
                        mouseEvent.latLng.getLng(),
                        mouseEvent.latLng.getLat(),
                        (result: any, status: any) => {
                            if (
                                status === window.kakao.maps.services.Status.OK
                            ) {
                                let addr = !!result[0].road_address
                                    ? result[0].road_address.address_name
                                    : result[0].address.address_name;

                                setMylat(mouseEvent.latLng.getLat());
                                setMylng(mouseEvent.latLng.getLng());
                                setCenterLat(mouseEvent.latLng.getLat());
                                setCenterLng(mouseEvent.latLng.getLng());
                                setAddress(addr);
                                // 클릭한 위치 주소를 가저온다.

                                // 기존 마커와 인포윈도우를 지우고 새로운 마커를 생성
                                if (marker) {
                                    marker.setMap(null);
                                }

                                // 기존 마커를 제거하고 새로운 마커를 넣는다.

                                infowindow.close();

                                // 마커를 클릭한 위치에 표시합니다
                                marker.setPosition(mouseEvent.latLng);
                                marker.setMap(map);
                                // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
                                infowindow.open(map, marker);
                            }
                        },
                    );
                },
            );
        }
    }, [map, marker]);

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

    // 리뷰쓰기,보기 버튼 함수
    const handleChangeReview = (write: string) => {
        if (write === '리뷰쓰기') {
            setButton(true);
        } else {
            setButton(false);
        }
    };
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

export { RoomReviewWriteMap };