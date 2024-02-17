/* eslint-disable react/jsx-pascal-case */
import axios from 'axios';
import useFetchToken from 'hooks/useFetchToken';
import { useParams } from 'react-router-dom';
import { useCount } from 'store/shoppingHeaderSelectBarStore';
import styled from 'styled-components';
import Swal from 'sweetalert2';

export default function CartBtn() {
    const { productId } = useParams();
    const { count } = useCount();
    const token = useFetchToken();

    // 장바구니 함수
    const onClickCartModal = () => {
        if (token) {
            // token이 존재하는 경우에만 API 요청을 보냅니다.
            axios
                .post(
                    `${process.env.REACT_APP_API_KEY}/userAuth/addCart`,
                    {
                        productID: productId,
                        quantity: count,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                )
                .then(function (response) {
                    Swal.fire({
                        text: '장바구니에 추가되었습니다.',
                        icon: 'success',
                    });
                });
        } else {
            Swal.fire({
                text: '로그인 후 사용해주세요.',
                icon: 'error',
            });
        }
    };

    return (
        <>
            <_cart onClick={onClickCartModal}>장바구니 담기</_cart>
        </>
    );
}

const _cart = styled.button`
    color: white;
    font-weight: 700;
    font-size: 14px;
    min-width: 190px;
    padding: 15px 50px;
    border: 1px solid #8080801f;
    background-color: #3128288f;
    border-radius: 10px;
    margin-right: 10px;
    @media (max-width: 1200px) {
        min-width: 140px;
        padding: 7px 22px;
    }
    @media (max-width: 575px) {
        min-width: 115px;
        padding: 4px 10px;
        font-size: 12px;
    }
`;
