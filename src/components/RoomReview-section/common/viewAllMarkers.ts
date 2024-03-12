const viewAllMarkers = async (map: any, markers: any) => {
    return new Promise<[string, string, number, string, boolean]>((resolve) => {
        markers.map(async (item: any) => {
            // 마커 이미지의 이미지 크기 입니다
            let imageSize = new window.kakao.maps.Size(24, 35);
            let imageSrc =
                'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
            // 마커 이미지를 생성합니다
            let markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
            );
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(
                    item.latitude,
                    item.longitude,
                ),
                map: map,
                title: item.content,
                image: markerImage, // 마커 이미지
            });
            marker.address = item.address;
            marker.createdAt = item.createdAt;
            marker.reviewId = item.reviewId;

            // 마커 클릭 이벤트 등록

            window.kakao.maps.event.addListener(marker, 'click', function () {
                // 클릭한 마커의 정보 가져오기
                const clickedMarkerContent = marker.getTitle();
                const clickedMarkerPosition = marker.getPosition();
                console.log(
                    marker.address,
                    marker.createdAt.split(' ')[0],
                    clickedMarkerContent,
                );
                resolve([
                    marker.address,
                    marker.createdAt.split(' ')[0],
                    marker.reviewId,
                    clickedMarkerContent,
                    true,
                ]);
            });
        });
    });
};
export { viewAllMarkers };
