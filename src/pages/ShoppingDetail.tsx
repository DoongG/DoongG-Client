/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Product_t } from 'types/shoppingDetail';
import { usePagination } from 'store/shoppingHeaderSelectBarStore';
import ReviewBox from 'components/shopping-section/detailPage/ReviewBox';
import PaginationBox from 'components/shopping-section/detailPage/PaginationBox';
import RecommendSlide from 'components/shopping-section/detailPage/RecommendSlide';
import EmptyReviewBox from 'components/shopping-section/detailPage/EmptyReviewBox';
import ProductInfoBox from 'components/shopping-section/detailPage/ProductInfoBox';

export default function ShoppingDetail() {
    const { productId } = useParams();
    const [fetchData, setFetchData] = useState<Product_t | null>(null); // 제품 상세 정보 상태
    const { pageArr } = usePagination(); // 현재 페이지의 리뷰 목록

    // 상품 정보 가져오는 함수
    useEffect(() => {
        const getDetailInfos = async () => {
            try {
                const res = await axios.get<Product_t, any>(
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
            {fetchData && (
                <>
                    <ProductInfoBox {...fetchData} />
                    <_review className="review">
                        <h3>
                            후기{' '}
                            <span style={{ color: 'grey' }}>
                                {fetchData.reviews.length}
                            </span>
                        </h3>
                        {fetchData.reviews.length > 0 ? (
                            pageArr.map((item, index) => {
                                return (
                                    <>
                                        <ReviewBox
                                            item={item}
                                            fetchData={fetchData}
                                        />
                                    </>
                                );
                            })
                        ) : (
                            <EmptyReviewBox />
                        )}
                        <PaginationBox {...fetchData} />
                    </_review>
                    <RecommendSlide category={fetchData.category} />
                </>
            )}
        </>
    );
}

// review
const _review = styled.section`
    width: 1080px;
    min-height: 345px;
    margin: 0 auto;
    padding-bottom: 70px;
    position: relative;
    overflow: hidden;
    & > h3 {
        text-align: left;
        margin: 0;
        border-bottom: 2px solid black;
        padding-bottom: 10px;
    }
`;
