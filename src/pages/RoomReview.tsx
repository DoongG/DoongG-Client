import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RoomReviewBox } from '../components/RoomReviewBox';

const { kakao } = window;

declare global {
    interface Window {
        kakao: any;
    }
}

const RoomreView = () => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState<any>();
    // const [infowindow, setInfowindow] = useState(null);

    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [address, setAddress] = useState('');

    // 인포 윈도우 내용
    let iwContent = '<div style="padding:5px;">자취방 리뷰달기 </div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(latitude, longitude),
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
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);

                    // 주소-좌표 변환 객체를 생성
                    var geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.coord2Address(
                        position.coords.longitude,
                        position.coords.latitude,
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

                    // 초기 마커 생성 및 표시
                    const initialMarker = new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(
                            position.coords.latitude,
                            position.coords.longitude,
                        ),
                        map: map,
                    });
                    setMarker(initialMarker);
                    infowindow.open(map, marker);
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
    }, [map]);

    //카카오 맵 출력하기
    useEffect(() => {
        const container = document.getElementById('map');
        const option = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 4,
        };
        const kakaoMap = new kakao.maps.Map(container, option);
        setMap(kakaoMap);
        setMarker(new kakao.maps.Marker());
        console.log(latitude, longitude);
    }, [latitude, longitude]);

    // 지도 클릭시 마커 생성 이벤트
    useEffect(() => {
        if (map) {
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
                                console.log(
                                    mouseEvent.latLng.getLng(),
                                    mouseEvent.latLng.getLat(),
                                );
                                // setLatitude(mouseEvent.latLng.getLat());
                                // setLongitude(mouseEvent.latLng.getLng());
                                setAddress(addr);
                                // 클릭한 위치 주소를 가저온다.

                                // 기존 마커와 인포윈도우를 지우고 새로운 마커를 생성
                                if (marker) {
                                    marker.setMap(null);
                                }

                                // 기존 마커를 제거하고 새로운 마커를 넣는다.
                                // setMarker(null);
                                marker.setMap(null);
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

    return (
        <>
            <_wrapperBox className="wrapperBox">
                <_kakaoMapWrapper id="map"></_kakaoMapWrapper>
                <RoomReviewBox
                    address={address}
                    latitude={latitude}
                    longitude={longitude}
                />
            </_wrapperBox>
        </>
    );
};
const _wrapperBox = styled.div`
    display: flex;
`;
const _kakaoMapWrapper = styled.div`
    width: 80%;
    height: calc(100vh - 50px);
`;

export { RoomreView };
