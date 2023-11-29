import { Header } from '../components/Header';
import { styled } from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BoardStore } from '../store/storeT';
import { TodayFoodModal } from '../components/TodayFoodModal';

const _hr = styled.hr`
    /* width: 100%; */
`;

const _rightSection = styled.div`
    width: 150px;
    height: 200px;
    border: 1px solid black;
`;

const _backArea = styled.div`
    width: 100%;
    background-color: white;
    display: flex;
`;

const _allBoardArea = styled.div`
    width: 80%;
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
`;

const BoardUnited = () => {
    const {
        currentBoardName,
        setCurrentBoardName,
        gameModalOn,
        setGameModalOn,
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

    const sampleDB = [
        {
            name: '라면 게시판',
            recentPost: [
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
            ],
        },
        {
            name: '냉면 게시판',
            recentPost: [
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
            ],
        },
        {
            name: '짬뽕 게시판',
            recentPost: [
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
            ],
        },
        {
            name: '쫄면 게시판',
            recentPost: [
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
            ],
        },
        {
            name: '우동 게시판',
            recentPost: [
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
            ],
        },
    ];
    return (
        <>
            <Header></Header>
            <_backArea>
                {gameModalOn && <TodayFoodModal></TodayFoodModal>}
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
                                    return (
                                        <>
                                            <_eachPost>
                                                <div>{y.title}</div>
                                                <div>{y.createdAt}</div>
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
                <_rightSection
                    onClick={() => {
                        setGameModalOn(true);
                    }}
                ></_rightSection>
            </_backArea>
        </>
    );
};

export { BoardUnited };
