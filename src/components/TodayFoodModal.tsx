import { styled } from 'styled-components';
import { BoardStore } from '../store/storeT';
import { useEffect, useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import ReactCardFlip from 'react-card-flip';
import WhatToEatLogo from '../assets/Mascot-EatWhat.png';

const TodayFoodModal = () => {
    const refer = useRef<any>(null);
    const { gameModalOn, setGameModalOn } = BoardStore();

    const [isFlipped, setIsFlipped] = useState(false);
    const [width, setWidth] = useState(16);
    const [titleWidth, setTitleWidth] = useState(30);
    const [target, setTarget] = useState<any>([]);

    const randomMixer = (foodArr: any) => {
        let result = foodArr.sort(() => Math.random() - 0.5);
        return result.slice(0, 9);
    };

    const foodDB = [
        {
            name: '한식',
            pack: {
                arr: [
                    '부대찌개',
                    '김치찌개',
                    '된장찌개',
                    '육개장',
                    '미역국',
                    '콩나물해장국',
                    '감자탕',
                    '치즈닭갈비',
                    '비빔밥',
                    '김치볶음밥',
                    '불닭',
                    '순대국밥',
                    '꽁치조림',
                    '약과',
                    '제육볶음',
                    '물냉면',
                    '비빔냉면',
                    '칼국수',
                    '콩국수',
                    '삼계탕',
                    '찜닭',
                ],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '중식',
            pack: {
                arr: [
                    '짜장면',
                    '해물짬뽕',
                    '탕수육',
                    '깐풍기',
                    '꿔바로우',
                    '차돌짬뽕',
                    '간짜장',
                    '새우볶음밥',
                    'XO볶음밥',
                    '백짬뽕',
                    '군만두',
                    '마라탕',
                    '마라샹궈',
                    '양고기',
                    '칠리새우',
                    '짬짜면',
                ],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '일식',
            pack: {
                arr: [
                    '초밥',
                    '돈코츠라멘',
                    '오코노미야키',
                    '우동',
                    '오뎅탕',
                    '메밀소바',
                    '미소라멘',
                    '카츠동',
                    '돈까스',
                    '치즈까스',
                    '오므라이스',
                    '카라아게',
                    '일본카레',
                ],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '고기',
            pack: {
                arr: [
                    '삼겹살',
                    '오리훈제',
                    '양념갈비',
                    '목살',
                    '안심',
                    '등심',
                    '곱창',
                    '대창',
                    '스테이크',
                    '족발',
                    '보쌈',
                    '등갈비',
                    '갈비찜',
                    '우삼겹',
                    '차돌박이',
                ],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '디저트',
            pack: {
                arr: [
                    '빙수',
                    '타코야키',
                    '붕어빵',
                    '아이스크림',
                    '커피',
                    '쥬스',
                    '케이크',
                    '도넛',
                    '핫도그',
                    '마카롱',
                    '탕후루',
                    '와플',
                    '과일',
                    '약과',
                    '에그타르트',
                    '꽈배기',
                ],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '분식',
            pack: {
                arr: [
                    '김밥',
                    '라면',
                    '순대',
                    '튀김',
                    '떡볶이',
                    '오뎅',
                    '김말이',
                    '라볶이',
                    '만두',
                    '짜장떡볶이',
                    '로제떡볶이',
                    '돈까스',
                    '닭강정',
                ],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '양식',
            pack: {
                arr: [
                    '토마토스파게티',
                    '까르보나라',
                    '알리오올리오',
                    '로제파스타',
                    '피자',
                    '햄버거',
                    '스테이크',
                    '스프',
                    '피쉬앱칩스',
                    '에그스크램블',
                    '샌드위치',
                ],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '간편식',
            pack: {
                arr: [
                    '컵라면',
                    '삼각김밥',
                    '도시락',
                    '밀키트',
                    '3분카레',
                    '3분짜장',
                    '라면',
                    '간장계란밥',
                    '계란후라이',
                    '냉동피자',
                    '냉동치킨너겟',
                ],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '치킨',
            pack: {
                arr: [
                    '지코바',
                    '교촌치킨',
                    '굽네치킨',
                    'BBQ',
                    'BHC',
                    '후참잘',
                    '푸라닭',
                    '신통치킨',
                    '네네치킨',
                    '멕시카나',
                    '훌랄라',
                    '60계치킨',
                    '페리카나',
                    '처갓집',
                    '호식이2마리치킨',
                    '또래오래',
                    '보드람치킨',
                    '피자나라치킨공주',
                    '노랑통닭',
                ],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
    ];

    const sampledb = [
        '한식',
        '중식',
        '일식',
        '고기',
        '디저트',
        '분식',
        '양식',
        '간편식',
        '기타',
    ];

    const flip = (category: any) => {
        for (let i = 0; i < foodDB.length; i++) {
            if (foodDB[i].name == category) {
                let res = foodDB[i].pack.func(foodDB[i].pack.arr);
                setTarget(res);
                return;
            }
        }
    };

    useEffect(() => {
        if (target.length > 0) {
            setIsFlipped(!isFlipped);
        }
    }, [target]);

    const handleResize = () => {
        if (window.innerWidth / 10 < 45) {
            setTitleWidth(window.innerWidth / 10);
        }
        if (window.innerWidth / 25 < 16) {
            setWidth(window.innerWidth / 25);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <_modalContainer>
            <_dialogBox>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <IoIosClose
                        style={{
                            cursor: 'pointer',
                            fontSize: '20px',
                            marginBottom: '10px',
                        }}
                        onClick={() => {
                            setGameModalOn(false);
                        }}
                    />
                </div>
                <_gameSpace>
                    <_gameTitle style={{ fontSize: '30px', width: '400px' }}>
                        <img src={WhatToEatLogo} style={{ width: '70px' }} />
                        오늘 뭐 먹지
                        <img src={WhatToEatLogo} style={{ width: '70px' }} />
                    </_gameTitle>
                    <_itemSpace>
                        {sampledb.map((x, index) => {
                            return (
                                <ReactCardFlip
                                    containerStyle={{
                                        width: '30%',
                                        margin: '0px 0px 20px 0px',
                                    }}
                                    isFlipped={isFlipped}
                                    flipDirection="horizontal"
                                >
                                    <_item
                                        onClick={() => {
                                            flip(x);
                                        }}
                                    >
                                        <p
                                            style={{
                                                marginTop: '20px',
                                                fontSize: width + 'px',
                                            }}
                                        >
                                            {x}
                                        </p>
                                    </_item>
                                    <_item2>
                                        <p
                                            style={{
                                                marginTop: '20px',
                                                fontSize: width + 'px',
                                            }}
                                        >
                                            {target[index]}
                                        </p>
                                    </_item2>
                                </ReactCardFlip>
                            );
                        })}
                    </_itemSpace>
                    {isFlipped && (
                        <_reset
                            onClick={() => {
                                if (isFlipped == true) {
                                    setIsFlipped(!isFlipped);
                                }
                            }}
                        >
                            카테고리 다시 선택
                        </_reset>
                    )}
                </_gameSpace>
            </_dialogBox>
            <_backdrop
                onClick={() => {
                    setGameModalOn(false);
                }}
            />
        </_modalContainer>
    );
};

const _gameTitle = styled.div`
    margin-top: -80px;
    font-weight: 600;
`;

const _reset = styled.button`
    background-color: transparent;
    border: none;
`;

const _gameSpace = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    margin-top: 80px;
    font-family: 'JalnanGothic';
    min-width: 268px;
    max-width: 400px;
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
`;

const _itemSpace = styled.div`
    margin: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; // 복수의 행
`;

const _item = styled.div`
    background-color: #1c393d;
    color: #ffca1d;
    width: 95%;
    font-size: 20px;
    min-width: 50px;
    border-radius: 10px;
    aspect-ratio: auto 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /* backface-visibility: hidden; */
`;

const _item2 = styled.div`
    background-color: #1c393d;
    color: #ffca1d;
    width: 95%;
    font-size: 20px;
    min-width: 50px;
    border-radius: 10px;
    aspect-ratio: auto 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* backface-visibility: hidden; */
`;

const _modalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 4999;
`;

const _dialogBox = styled.dialog`
    width: 50vw;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 30px hsla(0, 0%, 11.76470588235294%, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 4998;
    overflow: hidden;
    margin-top: -100px;
    @media (max-width: 820px) {
        width: 80vw;
        height: 80vh;
    }
`;

const _backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 4997;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { TodayFoodModal };
