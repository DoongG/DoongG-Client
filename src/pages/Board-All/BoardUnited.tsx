import axios from 'axios';
import Post from './Post';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BoardStore } from '../../store/storeT';
import { TodayFoodModal } from '../Side-Games/TodayFoodModal';
import { RecipeGenerator } from '../Side-Games/RecipeGenerator';
import { BoardAll, EachPost } from '../Type/Type';
// import { BoardStore } from '@/Store';
// import { TodayFoodModal } from '@/Side-Games/TodayFoodModal';
// import { RecipeGenerator } from '@/Side-Games/RecipeGenerator';
// import { BoardAll, EachPost } from '@/Type/Type';

// 통합 게시판 컴포넌트
const BoardUnited = () => {
    const {
        gameModalOn,
        setGameModalOn,
        game2ModalOn,
        setGame2ModalOn,
        setModalSignal,
    } = BoardStore();
    const navigate = useNavigate();
    const [allBoard, setAllBoard] = useState<BoardAll[] | undefined>([]);

    // 통합 게시판 데이터 요청
    const getBoard = async () => {
        try {
            let res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_KEY}/boards`,
            });
            setAllBoard(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    // 통합 게시판 렌더링 이펙트
    useEffect(() => {
        getBoard();
        setModalSignal(0);
    }, []);

    // 각 게시판에 들어가는 함수
    const enterEachBoard = (e: React.MouseEvent<HTMLDivElement>) => {
        navigate(`/board/${e.currentTarget.innerText}`);
    };

    return (
        <>
            <_backArea>
                {gameModalOn && <TodayFoodModal></TodayFoodModal>}
                {game2ModalOn && <RecipeGenerator></RecipeGenerator>}
                <_allBoardArea>
                    {allBoard?.map((board) => {
                        return (
                            <_eachBoardArea>
                                <_boardTitleArea onClick={enterEachBoard}>
                                    {board.boardName}
                                </_boardTitleArea>
                                <_eachBoardPostsWrapper>
                                    {board.posts.map((eachpost: EachPost) => {
                                        return (
                                            <Post
                                                boardName={board.boardName}
                                                post={eachpost}
                                            />
                                        );
                                    })}
                                </_eachBoardPostsWrapper>
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
                        <_gameTextWrapper>
                            {' '}
                            오늘 뭐 먹을지 고민될 땐?
                        </_gameTextWrapper>
                        <_gameClickArea>클릭!</_gameClickArea>
                    </_rightSection>
                    <_rightSection
                        onClick={() => {
                            setGame2ModalOn(true);
                        }}
                    >
                        <_gameTextWrapper>
                            {' '}
                            냉장고에 남은 것들로 만들 수 있는 요리 추천!
                        </_gameTextWrapper>
                        <_gameClickArea>클릭!</_gameClickArea>
                    </_rightSection>
                </_rightPlace>
            </_backArea>
        </>
    );
};

const _gameClickArea = styled.div`
    border-radius: 5px;
    padding: 5px;
    background-color: #ffca1d;
    color: #1c393d;
`;

const _gameTextWrapper = styled.div`
    width: 80%;
    margin: 5px;
    color: white;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #1c393d;
    width: 100%;
    min-width: 140px;
    height: 200px;
    margin-bottom: 5px;
    cursor: pointer;
`;

const _backArea = styled.div`
    display: flex;
    width: 100%;
    background-color: white;
`;

const _allBoardArea = styled.div`
    display: flex;
    width: 90%;
    flex-wrap: wrap;
`;

const _eachBoardArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 40%;
    text-align: start;
    margin: 5px 10px 10px 10px;
`;

const _boardTitleArea = styled.div`
    width: 100%;
    min-width: 310px;
    padding: 5px 5px 5px 5px;
    border: 5px solid #1c393d;
    border-radius: 20px;
    color: #1c393d;
    cursor: pointer;
`;

const _eachPost = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    padding: 5px;
    cursor: pointer;
`;

const _rightPlace = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    right: 5%;
    margin: 10px;
`;

const _eachBoardPostsWrapper = styled.div`
    width: 100%;
    padding: 10px 0px 0px 0px;
`;

export { BoardUnited };
