/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { useReviewDateStore } from 'store/shoppingHeaderSelectBarStore';
import { useState } from 'react';

export default function GoNowPlaceBtn() {
    // 클릭한 곳의 내용
    const { address, mylat, mylng, setAddress, setMylat, setMylng } =
        useReviewDateStore();
    const [map, setMap] = useState<any>();
    const [marker, setMarker] = useState<any>();
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
        map?.panTo(currentPos);
        setMap(map);
        marker?.setMap(null);
        marker?.setPosition(currentPos);
        marker?.setMap(map);
    };
    return (
        <>
            <_nowIconBox className="nowIcon" onClick={onhandleNowPlace}>
                <FaLocationCrosshairs />
            </_nowIconBox>
        </>
    );
}

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
