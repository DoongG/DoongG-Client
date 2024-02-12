import axios from 'axios';
import { useEffect, useState } from 'react';
import { useShoppingHeaderSelectBarStore } from 'store/shoppingHeaderSelectBarStore';

interface ApiResponse {
    discountedPrice: number;
    price: number;
    productID: number;
    productImage: string;
    productName: string;
    stock: number;
    viewCount: number;
    category: string;
}

export default function useFetchSlideData() {
    const [data, setData] = useState<ApiResponse[]>([]);
    const { selectButton } = useShoppingHeaderSelectBarStore();

    useEffect(() => {
        let url = '';
        if (selectButton === '최근') {
            url = `${process.env.REACT_APP_API_KEY}/shop/new`;
        } else if (selectButton === '인기') {
            url = `${process.env.REACT_APP_API_KEY}/shop/best`;
        }
        const getResentProduct = async () => {
            try {
                const res = await axios.get<ApiResponse, any>(url);

                setData(res.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };
        getResentProduct();
    }, [selectButton]);
    return {
        data,
    };
}
