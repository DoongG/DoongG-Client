import mapMascot from 'assets/mapMascot4.png';

// 초기 마커 생성
const initMarker = async (map: any, lat: number, lng: number) => {
    // 마커 이미지의 이미지 주소입니다
    let imageSrc = mapMascot;
    let imageSize = new window.kakao.maps.Size(64, 69);

    // 마커 이미지를 생성합니다
    let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    let markerPosition = new window.kakao.maps.LatLng(lat, lng);
    // 마커를 생성합니다
    let marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
    });
    marker.setMap(map);

    // 클릭한 곳 마커 표시
    window.kakao.maps.event.addListener(
        map,
        'click',
        function (mouseEvent: any) {
            // 클릭한 위도, 경도 정보를 가져옵니다
            let latlng = mouseEvent.latLng;
            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);
        },
    );
};

export { initMarker };
