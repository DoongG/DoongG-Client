import { coordToAddress } from 'components/RoomReview-section/common/coordToAddress';
import { initMarker } from 'components/RoomReview-section/common/initMarker';
import { curLocation } from 'components/RoomReview-section/common/curLocation';
import { RefObject, useEffect, useState } from 'react';
import { useReviewDateStore } from 'store/shoppingHeaderSelectBarStore';

export default function useMap(containerRef: RefObject<HTMLElement>) {
    const [map, setMap] = useState();

    // 클릭한 곳의 내용
    const { address, mylat, mylng, setAddress, setMylat, setMylng } =
        useReviewDateStore();

    // 클릭한 곳 마커 생성 및 주소 반환 함수
    const displayInitMarker = async (lat: number, lng: number) => {
        if (map) {
            const [mouseLat, mouseLng] = await initMarker(map, lat, lng);
            const addr1 = await coordToAddress(mouseLat, mouseLng); // 좌표 - 주소 변환
            setAddress(addr1);
        }
    };
    // 현위치로 이동 함수
    const placeCurLocation = async () => {
        if (map) {
            const [lat, lng] = await curLocation(map);
            console.log(lat, lng);
        }
    };
    useEffect(() => {
        (() => {
            if (containerRef.current) {
                // 초기 위치(현재위치)
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        setMylat(latitude);
                        setMylng(longitude);
                        // 지도 생성하기
                        setMap(
                            new window.kakao.maps.Map(containerRef.current, {
                                center: new window.kakao.maps.LatLng(
                                    latitude,
                                    longitude,
                                ),
                            }),
                        );
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
    return { map, displayInitMarker, placeCurLocation };
}
