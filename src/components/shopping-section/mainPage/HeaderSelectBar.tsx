/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
import { useShoppingHeaderSelectBarStore } from '../../../store/shoppingHeaderSelectBarStore';

interface Props {
    isSelected: boolean;
}
export default function HeaderSelectBar() {
    const { selectButton, setSelectButton } = useShoppingHeaderSelectBarStore();

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
    background-color: inherit;
    border: none;
    font-size: 24px;
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

const _bar = styled.div`
    font-size: 24px;
    padding: 0px 10px;
    cursor: pointer;
    color: rgb(28, 57, 61);
    @media (max-width: 767px) {
        font-size: 18px;
    }
`;
