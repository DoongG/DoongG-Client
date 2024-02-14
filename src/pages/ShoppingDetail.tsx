/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import calculateDiscountRate from 'utils/calculateDiscountRate';
import addCommas from 'utils/addCommas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// MUI 컴포넌트
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Review {
    nickname: string;
    content: string;
    createdAt: string;
}

interface DetailInfos {
    productID: number;
    productName: string;
    productImage: string;
    productDescription?: string;
    category: string;
    stock: number;
    price: number;
    discountedPrice: number;
    viewCount: number;
    createAt: string;
    reviews: Review[];
}

export default function ShoppingDetail() {
    const { productId } = useParams();
    // 제품 상세 정보 상태
    const [fetchData, setFetchData] = useState<DetailInfos | null>(null);
    // 수량과 가격 상태
    const [count, setCount] = useState(1);
    const [beforePrice, setbeforePrice] = useState(0);
    const [afterPrice, setAfterPrice] = useState(0);

    // 상품 정보 가져오는 함수
    useEffect(() => {
        const getDetailInfos = async () => {
            try {
                const res = await axios.get<DetailInfos, any>(
                    `${process.env.REACT_APP_API_KEY}/shop/get/${productId}`,
                );
                setbeforePrice(res.data.price);
                setAfterPrice(res.data.discountedPrice);
                setFetchData(res.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };
        getDetailInfos();
    }, [productId]);

    // 마이너스 버튼
    const handleMinusClick = (
        before: number | undefined,
        after: number | undefined,
    ) => {
        if (before !== undefined && after !== undefined) {
            if (count > 1) {
                setCount(count - 1);
                setAfterPrice(afterPrice - after);
                setbeforePrice(beforePrice - before);
            }
        }
    };

    // 플러스 버튼
    const handlePlusClick = (
        before: number | undefined,
        after: number | undefined,
    ) => {
        if (before !== undefined && after !== undefined) {
            setCount(count + 1);
            setAfterPrice(afterPrice + after);
            setbeforePrice(beforePrice + before);
        }
    };
    return (
        <>
            {fetchData && (
                <>
                    <_productInfo className="productInfo">
                        <_headerWrapper className="HeaderWrapper">
                            <ul>
                                <Link to={'/'}>
                                    <li>HOME</li>
                                </Link>
                                <div>{'>'}</div>

                                <li onClick={() => window.location.reload()}>
                                    SHOP
                                </li>

                                <div>{'>'}</div>
                                <li>{fetchData.category}</li>
                            </ul>
                        </_headerWrapper>
                        <div className="wrapper">
                            <_imgBox className="imgBox">
                                <img
                                    src={fetchData.productImage}
                                    alt={fetchData.productName}
                                />
                            </_imgBox>
                            <_infoBox className="infoBox">
                                <_productName>
                                    {fetchData.productName}
                                    <span className="view">
                                        ({fetchData.viewCount})
                                    </span>
                                </_productName>
                                <_productDescription className="productDescription">
                                    <span>상품 설명 </span>
                                    <hr />
                                    <p>{fetchData.productDescription}</p>
                                </_productDescription>
                                <_priceBox className="priceBox">
                                    <_afterPrice className="afterPrice">
                                        {addCommas(afterPrice)}원
                                        <_price className="price">
                                            {addCommas(beforePrice)}원
                                        </_price>
                                    </_afterPrice>

                                    <_beforePrice className="beforePrice">
                                        <_per className="per">
                                            {calculateDiscountRate(
                                                fetchData.price,
                                                fetchData.discountedPrice,
                                            ).toFixed(0)}
                                            %
                                        </_per>
                                    </_beforePrice>
                                </_priceBox>
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
                                <_buyBox className="buyBox">
                                    <_cart className="cart" id="success">
                                        장바구니 담기
                                    </_cart>
                                    <_buy className="buy">구매하기</_buy>
                                </_buyBox>
                            </_infoBox>
                        </div>
                    </_productInfo>

                    <_review className="review">
                        <h3>
                            후기{' '}
                            <span style={{ color: 'grey' }}>
                                {fetchData.reviews.length}
                            </span>
                        </h3>
                        {fetchData.reviews.map((item, index) => {
                            return (
                                <>
                                    <_reviewBox className="reviewBox">
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={
                                                    <ArrowDropDownIcon />
                                                }
                                                aria-controls="panel2-content"
                                                id="panel2-header"
                                            >
                                                <Typography
                                                    style={{
                                                        padding: '0px 10px',
                                                    }}
                                                >
                                                    {fetchData.reviews.length -
                                                        index}
                                                </Typography>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        width: '100%',
                                                        justifyContent:
                                                            'space-between',
                                                    }}
                                                >
                                                    <Typography className="content">
                                                        {item.content}
                                                    </Typography>
                                                    <Typography
                                                        style={{
                                                            width: '20%',
                                                        }}
                                                    >
                                                        {item.nickname}
                                                    </Typography>
                                                    <Typography
                                                        style={{ width: '30%' }}
                                                    >
                                                        {
                                                            item.createdAt.split(
                                                                ' ',
                                                            )[0]
                                                        }
                                                    </Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    {item.content}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </_reviewBox>
                                </>
                            );
                        })}
                    </_review>
                </>
            )}
        </>
    );
}
// 카테고리 경로
const _headerWrapper = styled.div`
    padding-bottom: 20px;
    color: #9c9a9a;
    font-size: 13px;
    a {
        text-decoration: none;
        color: #9c9a9a;
        cursor: default;
    }
    ul {
        cursor: default;
        display: flex;
        padding: 0px;
        margin: 0px;
        list-style: none;
    }
    div {
        padding: 0px 10px;
    }
    @media (max-width: 1200px) {
        padding: 40px 30px 20px;
    }
    @media (max-width: 991px) {
        padding: 12px 30px 12px;
        font-size: 12px;
    }
    @media (max-width: 767px) {
        font-size: 10px;
        padding: 12px 0px 12px;
    }
    @media (max-width: 575px) {
        font-size: 8px;
        padding: 6px 0px 6px;
    }
`;

const _productInfo = styled.section`
    padding: 100px 0px 70px;
    & > div {
        display: flex;
        justify-content: space-between;
        width: 1080px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }
`;

const _imgBox = styled.div`
    border: 2px solid black;
    /* aspect-ratio: 16/9; */
    height: 400px;
    width: 400px;
    & > img {
        scale: 0.7;
        aspect-ratio: 1/1;
        width: 100%;
    }
`;

const _infoBox = styled.div`
    width: 550px;
    text-align: left;
`;
const _productName = styled.span`
    font-size: 32px;
    font-weight: 700;
    & > span {
        font-size: 16px;
        margin-left: 5px;
        color: grey;
    }
`;

const _productDescription = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    min-height: 130px;
    & > :nth-child(1) {
        margin-bottom: 5px;
        font-weight: 700;
    }
    & > :nth-child(2) {
        margin: 0;
    }
    & > :nth-child(3) {
        margin: 0;
        margin-top: 15px;
    }
`;

// 가격 박스
const _priceBox = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    text-align: left;
    margin-top: 30px;
    @media (max-width: 991px) {
        margin-top: 5px;
    }
`;

const _beforePrice = styled.div`
    display: flex;
    @media (max-width: 575px) {
        font-size: 14px;
    }
`;
const _per = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: red;
    margin-right: 10px;
`;
const _price = styled.div`
    font-size: 17px;
    text-decoration: line-through;
    color: grey;
    margin-left: 10px;
`;
const _afterPrice = styled.div`
    display: flex;
    align-items: flex-end;
    font-weight: 700;
    font-size: 30px;
    @media (max-width: 1200px) {
        font-size: 25px;
    }
    @media (max-width: 991px) {
        font-size: 20px;
    }
    @media (max-width: 575px) {
        font-size: 15px;
    }
`;

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

// 장바구니 & 결제 버튼
const _buyBox = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    @media (max-width: 1200px) {
        margin-top: 13px;
    }
`;
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
const _buy = styled.button`
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

// review
const _review = styled.section`
    width: 1080px;
    margin: 0 auto;
    padding-bottom: 100px;
    position: relative;
    overflow: hidden;
    & > h3 {
        width: 70%;
        text-align: left;
        margin: 0;
        border-bottom: 2px solid black;
        padding-bottom: 10px;
    }
`;

const _reviewBox = styled.div`
    width: 70%;
    .content {
        text-align: left;
        width: 50%;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        margin: 0px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
`;
