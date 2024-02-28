import { coordToAddress } from 'components/RoomReview-section/common/coordToAddress';
import { initMarker } from 'components/RoomReview-section/common/initMarker';
import { RefObject, useEffect, useState } from 'react';
import { useReviewDateStore } from 'store/shoppingHeaderSelectBarStore';

export default function useMap<T>(
    containerRef: RefObject<T extends HTMLElement ? T : HTMLElement>,
) {
    const [map, setMap] = useState();

    // 클릭한 곳의 내용
    const { address, mylat, mylng, setAddress, setMylat, setMylng } =
        useReviewDateStore();

    // 초기 마커 나타내는 메소드
    const displayInitMarker = async (lat: number, lng: number) => {
        if (map) {
            const [mouseLat, mouseLng] = await initMarker(map, lat, lng);
            const addr1 = await coordToAddress(mouseLat, mouseLng);
            setAddress(addr1);
        }
    };

    useEffect(() => {
        (() => {
            if (containerRef.current) {
                // 초기 위치(현재위치)
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        // setAddress(address);
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
    return { map, displayInitMarker };
}
