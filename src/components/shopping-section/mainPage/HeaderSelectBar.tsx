/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import {
    useShoppingHeaderSelectBarStore,
    useSwiperDomStore,
    useSwiperPageStore,
} from '../../../store/shoppingHeaderSelectBarStore';
import { GoArrowRight } from 'react-icons/go';
import { GoArrowLeft } from 'react-icons/go';

interface Props {
    isSelected: boolean;
}

export default function HeaderSelectBar() {
    // 슬라이드 상태관리 버튼
    const { selectButton, setSelectButton } = useShoppingHeaderSelectBarStore();
    // swiper Dom 상태 가져오기
    const { swiperDom } = useSwiperDomStore();
    // 현재 swiper page index
    const { swiperPage } = useSwiperPageStore();

    const handleButtonClick = (button: string) => {
        setSelectButton(button);
    };

    return (
        <>
            <_selectWrapperBox className="selectWrapperBox">
                <_selectInnerBox className="selectInnerBox">
                    <_selectButton
                        isSelected={selectButton === '최근'}
                        onClick={() => handleButtonClick('최근')}
                    >
                        최근 올라온 상품
                    </_selectButton>

                    <_selectButton
                        isSelected={selectButton === '인기'}
                        onClick={() => handleButtonClick('인기')}
                    >
                        인기 상품
                    </_selectButton>
                </_selectInnerBox>
                <p style={{ marginTop: '40px', marginBottom: '0px' }}>
                    둥지가 회원님께 드리는 <br />
                    <span
                        style={{
                            backgroundImage:
                                'linear-gradient(transparent 70%, rgb(252, 122, 122) 30%)',
                        }}
                    >
                        추천 상품
                    </span>{' '}
                    입니다.
                </p>
                <_pageBox>
                    <_swiperBtn
                        onClick={() => {
                            swiperDom.swiper.slidePrev();
                        }}
                    >
                        <GoArrowLeft />
                    </_swiperBtn>
                    <span>{swiperPage}</span>
                    <span>/3</span>
                    <_swiperBtn
                        onClick={() => {
                            swiperDom.swiper.slideNext();
                        }}
                    >
                        <GoArrowRight />
                    </_swiperBtn>
                </_pageBox>
            </_selectWrapperBox>
        </>
    );
}

const _selectWrapperBox = styled.div`
    max-width: 300px;
    float: left;
    display: flex;
    flex-direction: column;
    padding: 20px 55px 20px 0px;
    position: relative;
    z-index: 3;
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    @media (max-width: 575px) {
        padding: 17px 25px;
        justify-content: center;
    }
`;

const _selectInnerBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    & > ::before {
        content: '';
        position: absolute;
        top: -3px;
        left: 0px;
        border-top: 3px solid black;
        border-left: 3px solid black;
        width: 14px;
        height: 14px;
    }
    & > ::after {
        content: '';
        position: absolute;
        bottom: 0px;
        right: 0px;
        border-bottom: 3px solid black;
        border-right: 3px solid black;
        width: 14px;
        height: 14px;
    }
`;

const _selectButton = styled.button<Props>`
    font-weight: 900;
    background-color: inherit;
    border: none;
    font-size: 28px;
    cursor: pointer;
    width: 100%;
    padding: 0px 10px;

    color: ${(props) => (props.isSelected ? 'rgb(255, 202, 29)' : '#c1c1c1')};
    @media (max-width: 767px) {
        font-size: 18px;
    }
    @media (max-width: 575px) {
        min-width: 150px;
    }
`;

const _swiperBtn = styled.button`
    background: transparent;
    border: none;
    color: grey;
    font-size: 30px;
    :hover {
        color: black;
    }
`;

const _pageBox = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: grey;
    & > :nth-child(2) {
        margin-left: 10px;
        color: black;
    }
    & > :nth-child(3) {
        margin-right: 10px;
    }
`;
