/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Product_t } from 'types/shoppingDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCalculatedCost } from 'store/shoppingHeaderSelectBarStore';

export default function CountBtn(props: Product_t) {
    const { ...fetchData } = props;
    const { beforePrice, afterPrice, setBeforePrice, setAfterPrice } =
        useCalculatedCost();

    // 수량과 가격 상태
    const [count, setCount] = useState(1);

    useEffect(() => {
        setBeforePrice(fetchData.price);
        setAfterPrice(fetchData.discountedPrice);
    }, []);

    // 마이너스 버튼
    const handleMinusClick = (before: number, after: number) => {
        if (before !== undefined && after !== undefined) {
            if (count > 1) {
                setCount(count - 1);
                setAfterPrice(afterPrice - after);
                setBeforePrice(beforePrice - before);
            }
        }
    };

    // 플러스 버튼
    const handlePlusClick = (before: number, after: number) => {
        if (before !== undefined && after !== undefined) {
            setCount(count + 1);
            setAfterPrice(afterPrice + after);
            setBeforePrice(beforePrice + before);
        }
    };
    return (
        <>
            <_countBox className="countBox">
                <_minus
                    className="minus"
                    onClick={() =>
                        handleMinusClick(
                            fetchData.price,
                            fetchData.discountedPrice,
                        )
                    }
                >
                    <FontAwesomeIcon icon={faMinus} />
                </_minus>
                <_count>{count}</_count>
                <_plus
                    className="plus"
                    onClick={() =>
                        handlePlusClick(
                            fetchData.price,
                            fetchData.discountedPrice,
                        )
                    }
                >
                    <FontAwesomeIcon icon={faPlus} />
                </_plus>
            </_countBox>
        </>
    );
}

// 수량 박스
const _countBox = styled.div`
    margin-top: 15px;
    display: flex;
    @media (max-width: 1200px) {
        margin-top: 20px;
    }
    @media (max-width: 991px) {
        margin-top: 10px;
    }
`;
const _minus = styled.button`
    padding: 10px 13px;
    border: 1px solid #8080801f;
    background-color: #8080801f;
    @media (max-width: 1200px) {
        font-size: 14px;
    }
    @media (max-width: 767px) {
        padding: 0px 7px;
    }
`;

const _count = styled.button`
    padding: 10px 18px;
    border: 1px solid #8080801f;
    background-color: #f9f9f9;
    @media (max-width: 1200px) {
        font-size: 14px;
    }
    @media (max-width: 767px) {
        padding: 0px 7px;
    }
`;
const _plus = styled.button`
    padding: 10px 13px;
    border: 1px solid #8080801f;
    background-color: #8080801f;
    @media (max-width: 1200px) {
        font-size: 14px;
    }
    @media (max-width: 767px) {
        padding: 0px 7px;
    }
`;
