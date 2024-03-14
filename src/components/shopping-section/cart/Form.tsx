/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import CartItemBox from './CartItemBox';
import PaymentBox from './PaymentBox';
import { useEffect } from 'react';
import axios from 'axios';
import useFetchToken from 'hooks/useFetchToken';

export default function Form() {
    const token = useFetchToken();
    useEffect(() => {
        const getItem = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_KEY}/userAuth/getCart`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                console.log(res);
            } catch (error) {
                console.log('errer', error);
            }
        };
        if (token) {
            getItem();
        }
    }, [token]);
    return (
        <>
            <_form name="cart_form">
                <_contentBox className="content-box">
                    <_cartHead className="cart-head">
                        <label htmlFor="checked-all">
                            <_checkedAll type="checkbox" id="checked-all" />
                            <_strong>전체선택</_strong>
                        </label>
                    </_cartHead>

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 4, 25].map((item) => {
                        return (
                            <>
                                <CartItemBox />
                            </>
                        );
                    })}
                </_contentBox>
                <PaymentBox />
            </_form>
        </>
    );
}

const _form = styled.form`
    position: relative;
    display: flex;
    text-align: left;
    margin-top: 50px;
    padding-bottom: 1rem;
`;

// 전체 선택
const _contentBox = styled.div`
    width: 65%;
`;
const _cartHead = styled.div`
    padding-bottom: 15px;
`;
const _checkedAll = styled.input`
    width: 20px;
    height: 20px;
`;
const _strong = styled.strong`
    font-size: 20px;
    margin-left: 10px;
`;
