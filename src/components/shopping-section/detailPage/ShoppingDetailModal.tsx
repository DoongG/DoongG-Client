/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import eyes from 'assets/eyes.png';
import {
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import {
    useBuyModalStore,
    useModalStore,
    useProductId,
} from '../../../store/shoppingHeaderSelectBarStore';
import { ShoppingDetailSelectBar } from './ShoppingDetailSelectBar';
import { ShoppingDetailBuy } from './ShoppingDetailBuy';
import Swal from 'sweetalert2';

interface ShoppingDetailModalProps {
    category: string;
    title: string;
    productId: number;
    onClickToggleModal: (
        title: string,
        category: string,
        productId: number,
    ) => void;
}
interface ModalProps {
    isModal: boolean;
}

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

// detailInfos의 타입 정의
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

const ShoppingDetailHeader: React.FC<ShoppingDetailModalProps> = ({
    category,
    title,

    onClickToggleModal,
}) => {
    // 모달 상태
    const { isOpenModal, setOpenModal } = useModalStore();
    const { isOpenBuyModal, setIsOpenBuyModal } = useBuyModalStore();
    const { productId, setProductId } = useProductId();

    // 수량과 가격 상태
    const [count, setCount] = useState(1);
    const [beforePrice, setbeforePrice] = useState(0);
    const [afterPrice, setAfterPrice] = useState(0);
    const [productName, setProductName] = useState('');
    const [productImage, setProductImage] = useState('');

    // 제품 상세 정보 상태
    const [detailInfos, setDetailInfos] = useState<DetailInfos | null>(null);

    const [token, setToken] = useState<string | null>(null);

    //jwt 토큰 가져오는 함수
    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
        };
        fetchToken();
    }, []);

    // 결제 모달 on/off 함수
    const onClickbuyModal = useCallback(() => {
        setIsOpenBuyModal(!isOpenBuyModal);
    }, [isOpenBuyModal]);

    // 장바구니 함수
    const onClickCartModal = () => {
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
                    // title: 'The Internet?',
                    text: '장바구니에 추가되었습니다.',
                    icon: 'success',
                });
            })
            .catch(function (error) {
                Swal.fire({
                    text: '로그인 후 사용해주세요.',
                    icon: 'error',
                }).then(function () {});
            });
    };

    const shoppingDetailHeader = useRef<HTMLDivElement>(null);

    // 상품 정보 가져오는 함수
    useEffect(() => {
        if (productId !== 0) {
            const getDetailInfos = async () => {
                try {
                    const res = await axios.get<DetailInfos, any>(
                        `${process.env.REACT_APP_API_KEY}/shop/get/${productId}`,
                    );
                    setDetailInfos(res.data);
                    setbeforePrice(res.data.price);
                    setAfterPrice(res.data.discountedPrice);
                    setProductName(res.data.productName);
                    setProductImage(res.data.productImage);
                } catch (error) {
                    console.error('데이터를 가져오는 중 오류 발생:', error);
                }
            };
            getDetailInfos();
        }
    }, []);

    useEffect(() => {
        // isOpenModal 값이 변경될 때마다 애니메이션 클래스를 동적으로 추가 또는 제거
        if (isOpenModal) {
            shoppingDetailHeader.current!.style.animation =
                'scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
        } else {
            shoppingDetailHeader.current!.style.animation =
                'scale-out-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
        }
    }, [isOpenModal]);

    // shoppingDetail 모달 생기면 뒷 배경 스크롤 막는 함수
    useEffect(() => {
        if (isOpenModal === true) {
            document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: auto;
    width: 100%;`;
            return () => {
                const scrollY = document.body.style.top;
                document.body.style.cssText = '';
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
            };
        }
    }, [isOpenModal]);

    // shoppingDetailBuy 모달 생기면 뒷 배경 스크롤 막는 함수
    useEffect(() => {
        if (isOpenBuyModal === true) {
            shoppingDetailHeader.current!.style.overflow = `hidden`;
        } else {
            shoppingDetailHeader.current!.style.overflow = `auto`;
        }
    }, [isOpenBuyModal]);

    // title에 제대로된 타입을 넘겨줌

    // 천 단위 쉼표 추가 함수
    const addCommas = (num: number | undefined) => {
        if (num !== undefined) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            // handle the case where num is undefined
            return '';
        }
    };

    // 할인률 구하는 함수
    function calculateDiscountRate(
        originalPrice: number | undefined,
        discountedPrice: number | undefined,
    ) {
        if (originalPrice !== undefined && discountedPrice !== undefined) {
            // 원래 가격과 할인된 가격을 이용하여 할인률을 계산합니다.
            const discountAmount = originalPrice - discountedPrice;
            const discountRate = (discountAmount / originalPrice) * 100;

            return discountRate.toFixed(0);
        } else {
            return '';
        }
    }

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

    // 모달 닫는 함수
    const closeModal = () => {
        setTimeout(() => {
            isOpenModal && setOpenModal(!isOpenModal);
        }, 200);
    };

    return (
        <>
            <_ShoppingDetailModal
                ref={shoppingDetailHeader}
                isModal={isOpenModal}
            >
                <_closeModal onClick={closeModal}>
                    <AiOutlineClose />
                </_closeModal>
                <_headerWrapper className="HeaderWrapper">
                    <ul>
                        <Link to={'/'}>
                            <li>HOME</li>
                        </Link>
                        <div>{'>'}</div>

                        <li onClick={() => window.location.reload()}>SHOP</li>

                        <div>{'>'}</div>
                        <li>{detailInfos?.productName}</li>
                    </ul>
                </_headerWrapper>
                <_productInfoBox className="productInfoBox">
                    <_imgBox className="imgBox">
                        <img src={detailInfos?.productImage} alt="" />
                    </_imgBox>
                    <_productInfos className="productInfos">
                        <_category className="category">
                            {detailInfos?.category}
                        </_category>
                        <_title className="title">
                            {detailInfos?.productName}
                        </_title>
                        <_heartAndViewBox className="heartAndViewBox">
                            <_viewBox className="viewBox">
                                <img src={eyes} alt="" />
                                <div className="view">
                                    {detailInfos?.viewCount}
                                </div>
                            </_viewBox>
                        </_heartAndViewBox>
                        <_priceBox className="priceBox">
                            <_beforePrice className="beforePrice">
                                <_per className="per">
                                    {calculateDiscountRate(
                                        detailInfos?.price,
                                        detailInfos?.discountedPrice,
                                    )}
                                    %
                                </_per>
                                <_price className="price">
                                    {addCommas(beforePrice)}원
                                </_price>
                            </_beforePrice>
                            <_afterPrice className="afterPrice">
                                {addCommas(afterPrice)}원
                            </_afterPrice>
                        </_priceBox>
                        <_countBox className="countBox">
                            <_minus
                                className="minus"
                                onClick={() =>
                                    handleMinusClick(
                                        detailInfos?.price,
                                        detailInfos?.discountedPrice,
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
                                        detailInfos?.price,
                                        detailInfos?.discountedPrice,
                                    )
                                }
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </_plus>
                        </_countBox>
                        <_buyBox className="buyBox">
                            <_cart
                                className="cart"
                                id="success"
                                onClick={onClickCartModal}
                            >
                                장바구니 담기
                            </_cart>
                            <_buy className="buy" onClick={onClickbuyModal}>
                                구매하기
                            </_buy>
                        </_buyBox>
                    </_productInfos>
                </_productInfoBox>
                <ShoppingDetailSelectBar
                    description={detailInfos?.productDescription || ''}
                    review={
                        detailInfos?.reviews.map(
                            ({ nickname, createdAt, content }) => ({
                                name: nickname,
                                createAt: createdAt,
                                content,
                            }),
                        ) || []
                    }
                ></ShoppingDetailSelectBar>
            </_ShoppingDetailModal>
            {/* 결제 모달 */}
            {isOpenBuyModal && (
                <ShoppingDetailBuy
                    onClickbuyModal={onClickbuyModal}
                    cost={afterPrice}
                    count={count}
                    productId={productId}
                    productName={productName}
                    productImage={productImage}
                ></ShoppingDetailBuy>
            )}
        </>
    );
};

// 가장 밖 div
const _ShoppingDetailModal = styled.div<ModalProps>`
    height: 82%;
    width: 92%;
    position: fixed;
    top: 50%;
    left: 50%;
    overflow: auto;
    background-color: white;
    padding: 20px 110px;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 4;
    animation: ${(props) =>
        props.isModal
            ? 'scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
            : 'scale-out-center 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'};

    @media (max-width: 1200px) {
        padding: 20px 50px;
        height: 70%;
    }
    @media (max-width: 991px) {
        height: 60%;
    }
    @media (max-width: 575px) {
        padding: 20px 25px;
    }
    @keyframes scale-in-center {
        0% {
            -webkit-transform: scale(0);
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: scale(1);
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }

    @keyframes scale-out-center {
        0% {
            -webkit-transform: scale(1);
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            -webkit-transform: scale(0);
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
    }
`;

const _closeModal = styled.div`
    position: absolute;
    right: 30px;
    top: 25px;
    @media (max-width: 575px) {
        right: 10px;
        top: 5px;
    }
`;

// 카테고리 경로
const _headerWrapper = styled.div`
    padding: 40px 80px 20px;
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

// 상품 이미지박스
const _productInfoBox = styled.div`
    padding: 0px 80px;
    display: flex;
    /* height: 53%; */
    img {
        width: 100%;
        height: 100%;
    }
    @media (max-width: 1200px) {
        padding: 0px 30px;
    }
    @media (max-width: 767px) {
        flex-direction: column;
        padding: 0px 0px;
    }
`;

const _imgBox = styled.div`
    flex: 1;
`;

const _productInfos = styled.div`
    cursor: default;
    flex: 1;
    padding-left: 40px;
    position: relative;
    @media (max-width: 991px) {
        padding-left: 17px;
    }
    @media (max-width: 767px) {
        margin-top: 10px;
        padding-left: 0px;
    }
`;

const _category = styled.div`
    color: #9c9a9a;
    text-align: left;
    @media (max-width: 1200px) {
        font-size: 14px;
    }
    @media (max-width: 991px) {
        font-size: 12px;
    }
    @media (max-width: 575px) {
        font-size: 11px;
    }
`;

const _title = styled.div`
    font-weight: 700;
    font-size: 36px;
    text-align: left;
    @media (max-width: 1200px) {
        font-size: 25px;
    }
    @media (max-width: 991px) {
        font-size: 17px;
    }
    @media (max-width: 575px) {
        font-size: 14px;
    }
`;

// 아이콘 커스텀
const _customFontAwesome = styled(FontAwesomeIcon)`
    font-size: 20px;
    margin-right: 5px;
`;

const _heartAndViewBox = styled.div`
    font-size: 15px;
    padding-top: 10px;
    display: flex;
    align-items: center;
    @media (max-width: 1200px) {
        font-size: 13px;
    }
    @media (max-width: 991px) {
        padding-top: 5px;
    }
    @media (max-width: 767px) {
        font-size: 10px;
    }
`;
const _heartBox = styled.div`
    margin-right: 10px;
    display: flex;
    align-items: center;
`;

const _viewBox = styled.div`
    display: flex;
    align-items: center;
    img {
        margin-right: 5px;
        width: 20px;
        @media (max-width: 991px) {
            width: 16px;
        }
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

const _countBox = styled.div`
    margin-top: 50px;
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

const _buyBox = styled.div`
    width: 100%;
    margin-top: 20px;
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

export { ShoppingDetailHeader };
