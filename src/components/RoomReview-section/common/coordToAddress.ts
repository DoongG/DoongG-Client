const coordToAddress = async (
    lat: number,
    lng: number,
    setAddress: (state: string) => void,
) => {
    let geocoder = new window.kakao.maps.services.Geocoder();

    await new Promise((resolve) => {
        geocoder.coord2Address(lng, lat, (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                let addr = !!result[0].road_address
                    ? result[0].road_address.address_name
                    : result[0].address.address_name;
                setAddress(addr);
            }
        });
    });
};

export { coordToAddress };
