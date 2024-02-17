/* eslint-disable react/jsx-pascal-case */
import axios from 'axios';
import useFetchToken from 'hooks/useFetchToken';
import { FaPlus } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import styled from 'styled-components';

type Css = {
    position: boolean;
};

export default function CartIcon() {
    const token = useFetchToken();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (token) {
            const getCartItemCount = () => {
                axios
                    .get(`${process.env.REACT_APP_API_KEY}/userAuth/getCart`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        setCartCount(response.data.length);
                    });
            };
            getCartItemCount();
        }
    }, [token]);

    return (
        <>
            <_shoppingBox className="shoppingBox">
                <FaCartShopping
                    style={{
                        fontSize: '20px',
                        marginRight: '5px',
                        padding: '0px 14px',
                        color: 'rgb(121, 180, 175)',
                    }}
                />
                <_countBox
                    className="countBox"
                    position={cartCount > 9 ? true : false}
                >
                    {cartCount <= 9 ? (
                        <_count>{cartCount}</_count>
                    ) : (
                        <_count>
                            9
                            <FaPlus
                                style={{ width: '7px', marginLeft: '1px' }}
                            />
                        </_count>
                    )}
                </_countBox>
            </_shoppingBox>
        </>
    );
}

const _shoppingBox = styled.div`
    position: relative;
`;
const _countBox = styled.div<Css>`
    position: absolute;
    z-index: 2;
    top: -4px;
    right: ${(props) => (props.position === true ? '0px' : '7px')};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 6px;
    min-width: 6px;
    height: 14px;
    color: #fff;
    background: #ff5b16;
    border-radius: 35px;
    font-weight: 700;
    font-size: 10px;
`;

const _count = styled.div`
    display: flex;
    align-items: center;
`;
