import mapMascot from 'assets/mapMascot4.png';

// 초기 마커 생성
const initMarker = async (
    map: any,
    curMarker: any,
): Promise<[number, number, any]> => {
    // 마커 이미지의 이미지 주소입니다
    let imageSrc = mapMascot;
    let imageSize = new window.kakao.maps.Size(64, 69);

    // 마커 이미지를 생성합니다
    let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    // 마커를 생성합니다
    let marker = new window.kakao.maps.Marker({
        position: map.getCenter(),
        image: markerImage, // 마커이미지 설정
    });

    // 클릭한 곳 마커 표시
    return await new Promise((resolve) => {
        window.kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
            if (curMarker) {
                curMarker.setMap(null);
            }
            // 클릭한 위도, 경도 정보를 가져옵니다
            let latlng = mouseEvent.latLng;
            // 마커 위치를 클릭한 위치로 이동
            marker.setPosition(latlng);
            marker.setMap(map);
            resolve([
                mouseEvent.latLng.getLat(),
                mouseEvent.latLng.getLng(),
                marker,
            ]);
        });
    });
};

export { initMarker };
