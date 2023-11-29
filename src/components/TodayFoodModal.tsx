import { styled } from 'styled-components';
import { BoardStore } from '../store/storeT';
import { useEffect, useRef, useState } from 'react';
import ReactCardFlip from 'react-card-flip';

const TodayFoodModal = () => {
    const refer = useRef<any>(null);
    const { gameModalOn, setGameModalOn } = BoardStore();

    const [isFlipped, setIsFlipped] = useState(false);

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
                    '삼겹살',
                    '치즈닭갈비',
                    '비빔밥',
                    '김치볶음밥',
                    '불닭',
                    '깍두기',
                    '불고기',
                    '꽁치조림',
                    '약과',
                    '제육볶음',
                ],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '중식',
            pack: {
                arr: [],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '일식',
            pack: {
                arr: [],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '고기',
            pack: {
                arr: [],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '디저트',
            pack: {
                arr: [],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '분식/야식',
            pack: {
                arr: [],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '양식',
            pack: {
                arr: [],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '간편식',
            pack: {
                arr: [],
                func: (arr: any) => {
                    return randomMixer(arr);
                },
            },
        },
        {
            name: '기타',
            pack: {
                arr: [],
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
        '분식/야식',
        '양식',
        '간편식',
        '기타',
    ];

    const flip = (category: any) => {
        for (let i = 0; i < foodDB.length; i++) {
            if (foodDB[i].name == category) {
                let res = foodDB[i].pack.func(foodDB[i].pack.arr);
                console.log(res);
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

    return (
        <_modalContainer>
            <_dialogBox>
                <_gameSpace>
                    <_gameTitle>오늘 뭐 먹지</_gameTitle>
                    <_itemSpace>
                        {sampledb.map((x, index) => {
                            console.log(index);
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
                                        <p>{x}</p>
                                    </_item>
                                    <_item>
                                        <p>{target[index]}</p>
                                    </_item>
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
    font-size: 60px;
    font-weight: 600;
`;

const _reset = styled.button`
    background-color: transparent;
    border: none;
`;

const _gameSpace = styled.div`
    width: 100%;
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
    background-color: #daddb1;
    width: 100%;
    min-width: 50px;
    border-radius: 10px;
    aspect-ratio: auto 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /* backface-visibility: hidden; */
`;

const _modalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10001;
`;

const _dialogBox = styled.dialog`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 10000;
    overflow: hidden;
    margin-top: -100px;
`;

const _backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { TodayFoodModal };
