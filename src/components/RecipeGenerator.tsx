import { styled } from 'styled-components';
import { BoardStore } from '../store/storeT';
import { IoIosClose } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import MascotCook from '../assets/Mascot-Cook.png';
import Refrigerator from '../assets/refrigerator.png';

import axios from 'axios';
// 냉장고 요리사 컴포넌트
const RecipeGenerator = () => {
    const buttonRef = useRef<any>(null);
    const { game2ModalOn, setGame2ModalOn } = BoardStore();
    const [flip, setFlip] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [ingredients, setIngredients] = useState<any>([
        { id: 0, name: '' },
        { id: 1, name: '' },
        { id: 3, name: '' },
    ]);
    const [foodList, setFoodList] = useState<any>([]);
    const [titleWidth, setTitleWidth] = useState(40);
    const [detailPage, setDetailPage] = useState<any>(null);
    const [detailDesc, setDetailDesc] = useState(false);

    // 반응형 리사이징
    const handleResize = () => {
        if (window.innerWidth / 10 < 45) {
            setTitleWidth(window.innerWidth / 10);
        }
    };

    // 레시피 요청 함수
    const recipeRequest = async () => {
        if (buttonRef.current) {
            buttonRef.current.style.animation = 'jelly 0.5s';
        }
        let recipeMaterial = [];
        for (let i = 0; i < ingredients.length; i++) {
            recipeMaterial.push(ingredients[i].name);
        }
        setGenerated(true);
        let res = await axios({
            method: 'post',
            url: 'http://localhost:8080/food',
            data: {
                ingredients: recipeMaterial,
            },
        });
        console.log(res);

        let data = res.data;
        let foodArr = [];
        for (let i = 0; i < res.data.length; i++) {
            foodArr.push({
                name: res.data[i].rcp_NM,
                url: res.data[i].att_FILE_NO_MAIN,
            });
        }
        setFoodList(foodArr);
        setFlip(true);

        setTimeout(() => {
            if (buttonRef.current) {
                buttonRef.current.style.animation = 'none';
            }
        }, 1000);
    };

    // 레시피 상세 정보 요청
    const detailRequest = async (name: string) => {
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/food/${name}`,
        });
        console.log(res);
        setDetailPage(res.data);
        setDetailDesc(true);
    };

    // 리사이징을 위한 이벤트리스너 등록 이펙트
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
                            setGame2ModalOn(false);
                        }}
                    />
                </div>
                <div style={{ display: 'flex', marginTop: '100px' }}>
                    <img
                        style={{
                            width: titleWidth + 'px',
                            height: titleWidth + 'px',
                            margin: '5px',
                        }}
                        src={Refrigerator}
                    ></img>
                    <_gameTitle
                        style={{
                            fontSize: titleWidth + 'px',
                        }}
                    >
                        냉장고 요리사
                    </_gameTitle>
                    <img
                        style={{
                            width: titleWidth + 'px',
                            height: titleWidth + 'px',
                            margin: '5px',
                        }}
                        src={MascotCook}
                    ></img>
                </div>
                {flip == true && !detailDesc && (
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setFlip(false);
                        }}
                    >
                        돌아가기
                    </div>
                )}
                {flip == false ? (
                    <>
                        {ingredients.map((x: any) => {
                            return (
                                <_eachLine>
                                    <_input
                                        placeholder="재료를 입력해주세요"
                                        value={x.name}
                                        onChange={(e) => {
                                            let temp = ingredients.slice(0);
                                            for (
                                                let i = 0;
                                                i < temp.length;
                                                i++
                                            ) {
                                                if (temp[i].id == x.id) {
                                                    temp[i].name =
                                                        e.target.value;
                                                }
                                            }
                                            setIngredients(temp);
                                        }}
                                        type="text"
                                    ></_input>
                                    <_minus
                                        tabIndex={-1}
                                        onClick={() => {
                                            if (ingredients.length > 3) {
                                                let temp = [];
                                                for (
                                                    let i = 0;
                                                    i < ingredients.length;
                                                    i++
                                                ) {
                                                    if (
                                                        x.id !==
                                                        ingredients[i].id
                                                    ) {
                                                        temp.push(
                                                            ingredients[i],
                                                        );
                                                    }
                                                }
                                                setIngredients(temp);
                                            } else {
                                                alert('최소 3개는 필요해요!');
                                            }
                                        }}
                                    >
                                        -
                                    </_minus>
                                </_eachLine>
                            );
                        })}
                        <_plus
                            tabIndex={-1}
                            onClick={() => {
                                setIngredients([
                                    ...ingredients,
                                    { id: Date.now(), name: '' },
                                ]);
                            }}
                        >
                            +
                        </_plus>
                        <_generateButton
                            ref={buttonRef}
                            onClick={recipeRequest}
                        >
                            생성
                        </_generateButton>
                    </>
                ) : !detailDesc ? (
                    <_generatedFoods>
                        {foodList &&
                            foodList.map((x: any) => {
                                return (
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => {
                                            detailRequest(x.name);
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: '300px',
                                                width: '75%',
                                            }}
                                        >
                                            <img
                                                style={{
                                                    height: '100%',
                                                    // width: '100%',
                                                }}
                                                src={x.url}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '40px',
                                                marginBottom: '20px',
                                            }}
                                        >
                                            {x.name}
                                        </div>
                                    </div>
                                );
                            })}
                    </_generatedFoods>
                ) : (
                    <div style={{ width: '100%' }}>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setDetailDesc(false);
                            }}
                        >
                            돌아가기
                        </div>
                        <br></br>
                        <div>
                            <h1>&lt;{detailPage.rcp_NM}&gt;</h1>
                        </div>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <img
                                style={{ width: '60%' }}
                                src={detailPage.att_FILE_NO_MAIN}
                            ></img>
                            <br></br>
                            <_fontCover
                                style={{ width: '60%', textAlign: 'start' }}
                            >
                                {detailPage.rcp_PARTS_DTLS}
                            </_fontCover>
                            <br></br>
                            <br></br>
                            <div>
                                <h1>&lt;조리법&gt;</h1>
                            </div>
                            <br></br>
                        </div>
                        {detailPage.manual.map((manual: any, index: number) => {
                            return (
                                <>
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '!00%',
                                        }}
                                    >
                                        <img
                                            style={{ maxWidth: '200px' }}
                                            src={detailPage.manual_img[index]}
                                        ></img>
                                        <_fontCover
                                            style={{
                                                // width: '50%',
                                                textAlign: 'start',
                                                padding: '0px 5px 0px 5px',
                                            }}
                                        >
                                            {manual}
                                        </_fontCover>
                                    </div>
                                    <br></br>
                                </>
                            );
                        })}
                    </div>
                )}
            </_dialogBox>
            <_backdrop
                onClick={() => {
                    setGame2ModalOn(false);
                }}
            />
        </_modalContainer>
    );
};

const _fontCover = styled.div`
    @font-face {
        font-family: 'Jeongnimsaji-R';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/Jeongnimsaji-R.woff2')
            format('woff2');
        font-weight: 700;
        font-style: normal;
    }
    font-size: 20px;
    font-family: 'Jeongnimsaji-R';
`;

const _generatedFoods = styled.div`
    width: 80%;
    padding: 20px;
`;

const _gameTitle = styled.div`
    font-weight: 600;
`;

const _generateButton = styled.button`
    border-radius: 5px;
    background-color: #1c393d;
    color: #ffca1d;
    width: 50%;
    font-size: 40px;
    animation: none;
    @keyframes jelly {
        25% {
            transform: scale(0.9, 1.1);
        }

        50% {
            transform: scale(1.1, 0.9);
        }

        75% {
            transform: scale(0.95, 1.05);
        }
    }
`;

const _minus = styled.button`
    background-color: transparent;
    color: red;
    border: none;
    font-size: 30px;
`;

const _plus = styled.button`
    width: 50px;
    height: 50px;
    background-color: transparent;
    border-radius: 50%;
    color: #ffca1d;
    border: none;
    font-size: 40px;
    margin-bottom: 20px;
`;

const _eachLine = styled.div`
    margin: 10px;
`;

const _input = styled.input`
    width: 80%;
    height: 30px;
    padding: 20px;
    font-size: 25px;
    border: 5px solid #1c393d;
    border-radius: 5px;
    &::placeholder {
        color: #ccc;
        font-weight: 100;
    }
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
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 50px solid #1c393d;
    border-radius: 30px; */
    border: none;
    box-shadow: 0 0 30px #1e1e1e2f;
    box-sizing: border-box;
    background-color: white;
    z-index: 4998;
    overflow: hidden;
    margin-top: -100px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
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

export { RecipeGenerator };
