import { Header } from '../components/Header';
import { styled } from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardStore } from '../store/storeT';
import { TodayFoodModal } from '../components/TodayFoodModal';
import { useLocation } from 'react-router';
import { RecipeGenerator } from '../components/RecipeGenerator';

const _hr = styled.hr`
    /* width: 100%; */
`;

const _rightSection = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    width: 100%;
    min-width: 140px;
    height: 200px;
    background-color: #1c393d;
    /* border: 5px solid #1c393d; */
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 5px;
    cursor: pointer;
`;

const _backArea = styled.div`
    width: 100%;
    background-color: white;
    display: flex;
`;

const _allBoardArea = styled.div`
    width: 90%;
    display: flex;
    flex-wrap: wrap;
`;

const _eachBoardArea = styled.div`
    min-width: 40%;
    text-align: start;
    margin: 5px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* height: 200px; */
`;

const _boardTitleArea = styled.div`
    padding: 5px 5px 5px 5px;
    width: 100%;
    border: 2px solid #cbffd3;
    border-radius: 20px;
    cursor: pointer;
`;

const _eachPost = styled.div`
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

const _rightPlace = styled.div`
    width: 150px;
    right: 5%;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const BoardUnited = () => {
    const {
        currentBoardName,
        setCurrentBoardName,
        gameModalOn,
        setGameModalOn,
        game2ModalOn,
        setGame2ModalOn,
        modalSignal,
        setModalSignal,
    } = BoardStore();
    const navigate = useNavigate();
    const [allBoard, setAllBoard] = useState([]);
    const getBoard = async () => {
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards`,
        });

        console.log(res);
        setAllBoard(res.data);
    };

    useEffect(() => {
        getBoard();
    }, []);

    const enterEachBoard = (e: any) => {
        // console.log(e.currentTarget.innerText);
        setCurrentBoardName(e.currentTarget.innerText);
        navigate(`/board/${e.currentTarget.innerText}`);
    };

    const goToOnePage = async (id: any, postId: any) => {
        // navigate(`/posts/${postId}`);
        setModalSignal(postId);
        navigate(`/board/${id}`);
    };
    return (
        <>
            <_backArea>
                {gameModalOn && <TodayFoodModal></TodayFoodModal>}
                {game2ModalOn && <RecipeGenerator></RecipeGenerator>}
                <_allBoardArea>
                    {allBoard.map((x: any) => {
                        return (
                            <_eachBoardArea>
                                <_boardTitleArea
                                    onClick={(e) => {
                                        enterEachBoard(e);
                                    }}
                                >
                                    {x.boardName}
                                </_boardTitleArea>
                                {x.posts.map((y: any, index: number) => {
                                    console.log(y);
                                    return (
                                        <>
                                            <_eachPost
                                                onClick={(e) => {
                                                    goToOnePage(
                                                        x.boardName,
                                                        y.postId,
                                                    );
                                                }}
                                            >
                                                <div>{y.title}</div>
                                                <div>
                                                    {y.createdAt.slice(0, 10)}{' '}
                                                    {y.createdAt.slice(11, 16)}{' '}
                                                </div>
                                            </_eachPost>
                                            {x.posts.length !== index + 1 ? (
                                                <_hr></_hr>
                                            ) : null}
                                        </>
                                    );
                                })}
                            </_eachBoardArea>
                        );
                    })}
                </_allBoardArea>
                <_rightPlace>
                    <_rightSection
                        onClick={() => {
                            setGameModalOn(true);
                        }}
                    >
                        <div
                            style={{
                                width: '80%',
                                margin: '5px',
                                color: 'white',
                            }}
                        >
                            {' '}
                            오늘 뭐 먹을지 고민될 땐?
                        </div>
                        <div
                            style={{
                                borderRadius: '5px',
                                padding: '5px',
                                backgroundColor: '#ffca1d',
                                color: '#1c393d',
                            }}
                        >
                            클릭!
                        </div>
                    </_rightSection>
                    <_rightSection
                        onClick={() => {
                            setGame2ModalOn(true);
                        }}
                    >
                        <div
                            style={{
                                width: '80%',
                                margin: '5px',
                                color: 'white',
                            }}
                        >
                            {' '}
                            냉장고에 남은 것들로 만들 수 있는 요리 추천!
                        </div>
                        <div
                            style={{
                                borderRadius: '5px',
                                padding: '5px',
                                backgroundColor: '#ffca1d',
                                color: '#1c393d',
                            }}
                        >
                            클릭!
                        </div>
                    </_rightSection>
                </_rightPlace>
            </_backArea>
        </>
    );
};

export { BoardUnited };
