import styled, { keyframes } from 'styled-components';
import character from '../assets/Mascot-removebg-preview.png';
import Talk from '../assets/Talk.png';

const _MainSection = styled.div`
    height: 400px;
    width: 100%;
    background-color: white;
    border: 2px solid rgb(28, 57, 61);
`;

// 오른쪽으로 이동하는 것
const slideRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 0;
  }
  to {
    transform: translateX(calc(100% + 10px));
    /* transform: translateX(25rem); */
    opacity: 1;
  }
`;
// 왼쪽 이동하는 것
const slideLeft = keyframes`
  from {
    transform: translateX(0);
    opacity: 0;
  }
  to {
    transform: translateX(-25rem);
    opacity: 1;
  }
`;
// 말풍선 나타남
const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const _Character1 = styled.img`
    width: 170px;
    height: 170px;
    /* margin-top: 110px; */
    float: left;
    animation: ${slideRight} 4s forwards;
`;

const _Character2 = styled.img`
    /* position: fixed; */
    width: 170px;
    height: 170px;
    /* margin-top: 110px; */
    float: right;
    animation: ${slideLeft} 4s forwards;
`;

const _Talking = styled.div`
    position: relative;
    opacity: 0;
    animation: ${appear} 1s forwards 4.5s;
`;

const _TalkImg1 = styled.img`
    z-index: 1 !important;
    position: absolute;
    width: 130px;
    left: 350px;
`;

const _TalkText = styled.div`
    z-index: 2 !important;
    position: absolute;
    left: 370px;
    top: 50px;
`;
const _Character1Move = styled.div`
    width: 50%;
    height: 170px;
`;

const _Character2Move = styled.div`
    width: 50%;
    height: 170px;
`;

const CharacterMove = styled.div`
    display: flex;
    width: 100%;
    height: 170px;
    margin-top: 100px;
`;

const IntroduceHotdeal = () => {
    return (
        <_MainSection>
            <CharacterMove>
                <_Character1Move>
                    <_Character1 src={character} alt="" />
                </_Character1Move>
                <_Character2Move>
                    <_Character2 src={character} alt="" />
                </_Character2Move>
            </CharacterMove>
            <_Talking>
                <_TalkImg1 src={Talk} alt="" />
                <_TalkText>이야 이거 싸다</_TalkText>
            </_Talking>
        </_MainSection>
    );
};

export { IntroduceHotdeal };
