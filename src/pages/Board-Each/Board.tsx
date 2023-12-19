import { GalleryStyle } from './GalleryStyle';
import { ListStyle } from './ListStyle';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';
import GalleryIcon from '../../assets/gallery-icon.png';
import ListIcon from '../../assets/list-icon.png';
import { BoardStore } from '../../store/storeT';
import { PostModal } from './PostDetailModal/PostModal';
import { Modal } from './WritingModal/PostingModal';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { UpdateModal } from './WritingModal/UpdateModal';

// 특정 게시판 하나 컴포넌트
const Board = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [galleryType, setGalleryType] = useState('');

    const {
        onePageData,
        setOnePageData,
        postModalOn,
        detailModalOn,
        setDetailModalOn,
        updateModal,
        modalSignal,
        setBoardPostCount,
        styleSwitch,
        setStyleSwitch,
        realBoardName,
        setRealBoardName,
        setIsKeywordExsist,
        setBoardId,
    } = BoardStore();

    // 게시판 데이터 요청
    const getBoardData = async () => {
        try {
            let res;
            if (location.pathname.includes('search')) {
                const judgement = location.pathname.split('/')[3];
                res = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_KEY}/boards/${judgement}`,
                });
            } else {
                const judgement = location.pathname.split('/')[2];
                res = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_KEY}/boards/${judgement}`,
                });
            }
            if (res) {
                setBoardId(res.data.boardId);
                setRealBoardName(res.data.boardName);
                setGalleryType(res.data.boardDefaultType);
                setBoardPostCount(res.data.postCount);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // 한 게시판 렌더링
    useEffect(() => {
        getBoardData();
        if (location.search) {
            setStyleSwitch(false);
        }
        return () => {
            setDetailModalOn(false);
            setOnePageData([]);
        };
    }, []);

    // 게시판 유형에 따라 게시판 boolean 값을 바꾸는 이펙트
    useEffect(() => {
        if (galleryType == 'list') {
            setStyleSwitch(false);
        } else {
            if (!location.search) {
                setStyleSwitch(true);
            }
        }
    }, [galleryType]);

    // 게시판 유형 바뀔 때 일부 값들 리셋하는 이펙트
    useEffect(() => {
        setIsKeywordExsist('');
        setDetailModalOn(false);
    }, [styleSwitch]);

    // 게시물 하나 데이터 요청 함수
    const getOnePageData = async () => {
        let res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/${modalSignal}`,
        });
        setOnePageData([res.data]);
        setDetailModalOn(true);
    };

    // url주소 바꿔주는 함수
    const urlChanger = () => {
        if (location.pathname.includes('search')) {
            navigate(`/board/${location.pathname.split('/')[3]}`);
        } else {
            navigate(`/board/${location.pathname.split('/')[2]}`);
        }
        setStyleSwitch(true);
    };

    useEffect(() => {
        if (modalSignal !== 0) {
            getOnePageData();
        }
    }, [modalSignal]);

    return (
        <_boardArea>
            {postModalOn && <Modal />}
            {detailModalOn && <PostModal />}
            {updateModal && <UpdateModal />}
            <_boardHeader>
                <_innerBoardHeader>
                    <_boardTitle>{realBoardName}</_boardTitle>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <_switchButton onClick={urlChanger}>
                            <_switchButtonImg2
                                src={GalleryIcon}
                            ></_switchButtonImg2>
                        </_switchButton>
                        <_switchButton
                            onClick={() => {
                                setStyleSwitch(false);
                            }}
                        >
                            <_switchButtonImg src={ListIcon}></_switchButtonImg>
                        </_switchButton>
                    </div>
                </_innerBoardHeader>
            </_boardHeader>
            <Carousel />
            <_galleryContainer>
                {styleSwitch ? (
                    <GalleryStyle></GalleryStyle>
                ) : (
                    <ListStyle></ListStyle>
                )}
            </_galleryContainer>
        </_boardArea>
    );
};

const _boardArea = styled.div`
    width: 100%;
`;

const _boardHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const _innerBoardHeader = styled.div`
    width: 75%;
    display: flex;
    justify-content: space-between;
`;

const _switchButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const _switchButtonImg = styled.img`
    width: 20px;
`;

const _switchButtonImg2 = styled.img`
    width: 22px;
`;

const _galleryContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const _boardTitle = styled.div`
    @font-face {
        font-family: 'GangwonEduPowerExtraBoldA';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEduPowerExtraBoldA.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'GangwonEduPowerExtraBoldA';
    font-weight: 700;
    font-size: 5vw;
`;

export { Board };
