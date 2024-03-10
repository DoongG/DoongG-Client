const searchAddress = (data: any) => {
    return new Promise((resolve, reject) => {
        let geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(
            data.address,
            function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                    let currentPos = new window.kakao.maps.LatLng(
                        result[0].y,
                        result[0].x,
                    );
                    resolve(currentPos);
                }
            },
        );
    });
};
export { searchAddress };
