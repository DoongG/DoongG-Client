import { coordToAddress } from 'components/RoomReview-section/common/coordToAddress';
import { initMarker } from 'components/RoomReview-section/common/initMarker';
import { curLocation } from 'components/RoomReview-section/common/curLocation';
import { RefObject, useEffect, useState } from 'react';
import { useReviewDateStore } from 'store/shoppingHeaderSelectBarStore';
import mapMascot from 'assets/mapMascot4.png';
import { searchAddress } from 'components/RoomReview-section/common/searchAddress';

export default function useMap(containerRef: RefObject<HTMLElement>) {
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

    // 클릭한 곳 마커 생성 및 주소 반환
    useEffect(() => {
        const displayInitMarker = async () => {
            if (map) {
                const [mouseLat, mouseLng, clickedMarker] = await initMarker(
                    map,
                    marker,
                );
                const addr = await coordToAddress(mouseLat, mouseLng); // 좌표 - 주소 변환
                setAddress(addr);
                setMarker(clickedMarker);
            }
        };
        displayInitMarker();
    }, [marker]);

    // 현위치로 이동 함수
    const placeCurLocation = async () => {
        if (map) {
            marker.setMap(null); // 이전 마커 지우기
            const [lat, lng] = await curLocation(map);
            const addr = await coordToAddress(lat, lng); // 좌표 - 주소 변환
            setAddress(addr);
        }
    };

    // 검색한 주소로 이동 함수
    const placeSearchLocation = async (data: any) => {
        if (map) {
            const position = await searchAddress(data);
            setAddress(data.address);
            marker.setPosition(position);
            map.panTo(position);
        }
    };

    useEffect(() => {
        (() => {
            if (containerRef.current) {
                // 초기 위치(현재위치)
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const initMap = new window.kakao.maps.Map(
                            containerRef.current,
                            {
                                center: new window.kakao.maps.LatLng(
                                    latitude,
                                    longitude,
                                ),
                            },
                        );
                        // 마커 이미지를 생성합니다
                        let markerImage = new window.kakao.maps.MarkerImage(
                            mapMascot,
                            new window.kakao.maps.Size(64, 69),
                        );
                        let markerPosition = new window.kakao.maps.LatLng(
                            latitude,
                            longitude,
                        );
                        // 마커를 생성합니다
                        let initmarker = new window.kakao.maps.Marker({
                            position: markerPosition,
                            image: markerImage, // 마커이미지 설정
                            map: initMap,
                        });
                        setMylat(latitude);
                        setMylng(longitude);
                        setMap(initMap); // 지도 생성하기
                        setMarker(initmarker); // 마커 생성하기

                        const addr = await coordToAddress(latitude, longitude);
                        setAddress(addr);
                    },
                    (error) => {
                        console.error('Error getting current location:', error);
                    },
                );
            }
        })();
    }, [containerRef]);
    return { placeCurLocation, placeSearchLocation };
}
