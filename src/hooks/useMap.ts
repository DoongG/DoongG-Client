import { coordToAddress } from 'components/RoomReview-section/common/coordToAddress';
import { initMarker } from 'components/RoomReview-section/common/initMarker';
import { curLocation } from 'components/RoomReview-section/common/curLocation';
import { RefObject, useEffect, useState } from 'react';
import {
    useButtonStore,
    useMarkerOnOff,
    useReviewDateStore,
    useVisibleMarker,
} from 'store/shoppingHeaderSelectBarStore';
import mapMascot from 'assets/mapMascot4.png';
import { searchAddress } from 'components/RoomReview-section/common/searchAddress';
import { viewAllMarkers } from 'components/RoomReview-section/common/viewAllMarkers';
import { clusterer } from 'components/RoomReview-section/common/clusterer';

export default function useMap(containerRef: RefObject<HTMLElement>) {
    const {
        address,
        mylat,
        mylng,
        map,
        marker,
        centerLevel,
        setAddress,
        setMylat,
        setMylng,
        setMap,
        setMarker,
        setCenterLevel,
    } = useReviewDateStore();
    const { button, setButton } = useButtonStore();
    const {
        setClickedId,
        setClickedAddress,
        setClickedDate,
        setClickedContent,
        setMarkerOnOff,
    } = useMarkerOnOff();
    // 지도에 보이는 마커
    const { visibleMarker, setVisibleMarker } = useVisibleMarker();

    // 클릭한 곳 마커 생성 및 주소 반환
    const displayInitMarker = async () => {
        if (map) {
            const [mouseLat, mouseLng, clickedMarker] = await initMarker(
                map,
                marker,
            );
            const addr = await coordToAddress(mouseLat, mouseLng); // 좌표 - 주소 변환
            setMylat(mouseLat);
            setMylng(mouseLng);
            setAddress(addr);
            setMarker(clickedMarker);
        }
    };

    // 지도 움직일 때마다 중심 좌표 구하는 함수
    const getCenterLatLng = async () => {
        if (map) {
            window.kakao.maps.event.addListener(
                map,
                'center_changed',
                function () {
                    // 지도의  레벨을 얻어옵니다
                    var level = (map as any).getLevel();
                    // 지도의 중심좌표를 얻어옵니다
                    var latlng = (map as any).getCenter();
                    setMylat(latlng.getLat());
                    setMylng(latlng.getLng());
                    setCenterLevel(level);
                },
            );
        }
    };

    // 현위치로 이동 함수
    const placeCurLocation = async () => {
        if (map) {
            marker.setMap(null);
            const [lat, lng] = await curLocation(map);
            const addr = await coordToAddress(lat, lng); // 좌표 - 주소 변환
            setAddress(addr);
        }
    };

    // 모든 리뷰 보기 && 클릭한 마커의 리뷰 보기
    const viewAllReviews = async (markers: any) => {
        if (map && markers) {
            let [address, date, id, content, isClicked] = await viewAllMarkers(
                map,
                markers,
            );
            // 마커 고유값 설정
            setClickedAddress(address);
            setClickedDate(date);
            setClickedId(id);
            setClickedContent(content);
            setMarkerOnOff(isClicked);
        }
    };

    // 지도 영역 마커만 출력
    const viewReviewInMap = async (markers: any) => {
        if (map && markers) {
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
                let lb = new window.kakao.maps.LatLngBounds(sw, ne);
                let l1 = new window.kakao.maps.LatLng(
                    item.latitude,
                    item.longitude,
                );
                // true -> 출력O
                // false -> 출력X
                return lb.contain(l1);
            });
            setVisibleMarker(selectedMarker);
            window.kakao.maps.event.addListener(
                map,
                'bounds_changed',
                function () {
                    let bounds = map.getBounds();
                    let sw = bounds.getSouthWest();
                    let ne = bounds.getNorthEast();
                    // 지도영역 마커만 filter
                    if (markers) {
                        const selectedMarker = markers.filter((item: any) => {
                            // 현재 지도 영역의 남서쪽, 북동쪽 좌표
                            let lb = new window.kakao.maps.LatLngBounds(sw, ne);
                            let l1 = new window.kakao.maps.LatLng(
                                item.latitude,
                                item.longitude,
                            );
                            return lb.contain(l1); // true -> 출력, false -> 출력X
                        });
                        setVisibleMarker(selectedMarker);
                    }
                },
            );
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

    // 지도 초기 위치
    useEffect(() => {
        (async () => {
            if (containerRef.current) {
                // 초기 위치(현재위치)
                const initMap = new window.kakao.maps.Map(
                    containerRef.current,
                    {
                        center: new window.kakao.maps.LatLng(mylat, mylng),
                        level: `${centerLevel}`,
                    },
                );
                // 마커 이미지를 생성합니다
                let markerImage = new window.kakao.maps.MarkerImage(
                    mapMascot,
                    new window.kakao.maps.Size(64, 69),
                );
                let markerPosition = new window.kakao.maps.LatLng(mylat, mylng);
                // 마커를 생성합니다
                let initmarker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: markerImage, // 마커이미지 설정
                    map: initMap,
                });
                setMap(initMap); // 지도 생성하기
                setMarker(initmarker); // 마커 생성하기

                const addr = await coordToAddress(mylat, mylng);
                setAddress(addr);
            }
        })();
    }, [containerRef]);
    return {
        map,
        placeCurLocation,
        placeSearchLocation,
        displayInitMarker,
        getCenterLatLng,
        viewAllReviews,
        viewReviewInMap,
    };
}
