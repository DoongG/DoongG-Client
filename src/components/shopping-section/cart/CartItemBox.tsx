/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import shopping1 from 'assets/shopping1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import addCommas from 'utils/addCommas';

const handleMinusClick = () => {};

const handlePlusClick = () => {};

export default function CartItemBox() {
    return (
        <>
            <_cartItemBox className="cart-item-box">
                <_checkedOne htmlFor="checked-one">
                    <input type="checkbox" id="checked-one" />
                </_checkedOne>
                <_itemImgBox className="item-img-box">
                    <_img src={shopping1} alt="shopping1" />
                </_itemImgBox>
                <_itemTitleBox className="item-title-box">
                    <_itemTitle className="item-title">
                        투데이위드 소프트 모이스쳐 판테놀 10% 속보습 수분크림
                    </_itemTitle>
                    <_countBox className="item-count-box">
                        <_minus
                            className="minus"
                            type="button"
                            onClick={() => handleMinusClick()}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </_minus>
                        <_count>1</_count>
                        <_plus
                            className="plus"
                            type="button"
                            onClick={() => handlePlusClick()}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </_plus>
                    </_countBox>
                </_itemTitleBox>
                <_priceBox className="price-box">
                    <span>{addCommas(4300)}원</span>
                </_priceBox>
                <_deleteBox className="delete-box">
                    <button type="button">삭제</button>
                </_deleteBox>
            </_cartItemBox>
        </>
    );
}
const _cartItemBox = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 25px 0px;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
`;

const _checkedOne = styled.label`
    display: flex;
    align-items: center;
    & > input {
        width: 20px;
        height: 20px;
    }
`;

const _itemImgBox = styled.div`
    display: flex;
    margin-right: 1.5rem;
`;
const _img = styled.img`
    width: 80px;
    height: 80px;
`;

const _itemTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const _itemTitle = styled.p`
    margin: 0;
`;

// 수량 박스
const _countBox = styled.div`
    margin-top: 15px;
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

const _priceBox = styled.div`
    margin-left: 7.5rem;
    display: flex;
    align-items: center;
`;

const _deleteBox = styled.div`
    display: flex;
    align-items: center;
    & > button {
        border-radius: 5px;
        border-style: solid;
        color: #1c1814;
        border-color: #d2d1d0;
        background: none;
        padding: 4px 18px;
    }
`;
