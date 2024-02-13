/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import axios from 'axios';
import eyes from 'assets/eyes.png';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import calculateDiscountRate from 'utils/calculateDiscountRate';
import addCommas from 'utils/addCommas';

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

    // 상품 정보 가져오는 함수
    useEffect(() => {
        const getDetailInfos = async () => {
            try {
                const res = await axios.get<DetailInfos, any>(
                    `${process.env.REACT_APP_API_KEY}/shop/get/${productId}`,
                );
                setFetchData(res.data);
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        };
        getDetailInfos();
    }, [productId]);
    return (
        <>
            <_productInfo className="productInfo">
                <div className="wrapper">
                    <div className="imgBox">
                        <img
                            src={fetchData?.productImage}
                            alt={fetchData?.productName}
                        />
                    </div>
                    <div className="infoBox">
                        <span>{fetchData?.category}</span>
                        <span>{fetchData?.productName}</span>
                        <div>
                            <img
                                src={eyes}
                                alt={String(fetchData?.viewCount)}
                            />
                            <div className="view">{fetchData?.viewCount}</div>
                        </div>
                        <_priceBox className="priceBox">
                            <_beforePrice className="beforePrice">
                                <_per className="per">
                                    {calculateDiscountRate(
                                        fetchData?.price as number,
                                        fetchData?.discountedPrice as number,
                                    )}
                                    %
                                </_per>
                                <_price className="price">
                                    {addCommas(fetchData?.price as number)}원
                                </_price>
                            </_beforePrice>
                            <_afterPrice className="afterPrice">
                                {addCommas(
                                    fetchData?.discountedPrice as number,
                                )}
                                원
                            </_afterPrice>
                        </_priceBox>
                    </div>
                </div>
            </_productInfo>
        </>
    );
}

const _productInfo = styled.section`
    padding: 30px 0px;
    & > div {
        width: 1200px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }
`;

// 가격 박스
const _priceBox = styled.div`
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
    margin-right: 10px;
`;
const _price = styled.div`
    text-decoration: line-through;
    color: grey;
`;
const _afterPrice = styled.div`
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
