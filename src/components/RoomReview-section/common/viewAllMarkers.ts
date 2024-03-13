const viewAllMarkers = async (map: any, markers: any) => {
    return new Promise<[string, string, number, string, boolean]>((resolve) => {
        const clusterer = new window.kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 1,
        });
        let viewMarker: any[] = [];
        const markerList = markers.map(async (item: any) => {
            // 마커 이미지 속성
            let imageSize = new window.kakao.maps.Size(24, 35);
            let imageSrc =
                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
            let markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
            );
            //마커 생성
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(
                    item.latitude,
                    item.longitude,
                ),
                map: map,
                title: item.content,
                image: markerImage,
            });
            viewMarker.push(marker);
            // 마커 고유값 설정
            marker.address = item.address;
            marker.createdAt = item.createdAt;
            marker.reviewId = item.reviewId;

            // 클릭한 마커의 정보 가져오기
            window.kakao.maps.event.addListener(marker, 'click', function () {
                const clickedMarkerContent = marker.getTitle();
                resolve([
                    marker.address,
                    marker.createdAt.split(' ')[0],
                    marker.reviewId,
                    clickedMarkerContent,
                    true,
                ]);
            });
        });
        // 모든 마커 생성이 완료된 후에 클러스터러에 마커들을 추가
        Promise.all(markerList).then(() => {
            clusterer.addMarkers(viewMarker);
        });
    });
};
export { viewAllMarkers };
