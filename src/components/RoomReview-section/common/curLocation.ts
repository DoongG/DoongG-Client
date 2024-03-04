const curLocation = (map: any): Promise<number[]> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                let lat = position.coords.latitude, // 위도
                    lng = position.coords.longitude; // 경도

                let locPosition = new window.kakao.maps.LatLng(lat, lng);
                map.setCenter(locPosition);
                resolve([lat, lng]);
            });
        } else {
            let locPosition = new window.kakao.maps.LatLng(
                33.450701,
                126.570667,
            );
            map.setCenter(locPosition);
            resolve([33.450701, 126.570667]);
        }
    });
};

export { curLocation };
