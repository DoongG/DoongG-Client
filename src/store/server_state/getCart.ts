import { useQuery } from 'react-query';
import axios from 'axios';
import useFetchToken from 'hooks/useFetchToken';

// 장바구니 갯수 상태
const useQueryStore = () => {
    const token = useFetchToken();

    const getCartItemCount = () => {
        if (token) {
            return axios
                .get(`${process.env.REACT_APP_API_KEY}/userAuth/getCart`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    return res.data;
                });
        }
    };

    return useQuery({
        queryKey: ['key'],
        queryFn: getCartItemCount,
        enabled: false,
    });
};

export { useQueryStore };
