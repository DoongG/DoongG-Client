import { GalleryStyle } from '../components/GalleryStyle';
import { ListStyle } from '../components/ListStyle';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from '../components/Carousel';
import G from '../assets/gallery-icon.png';
import L from '../assets/list-icon.png';
import { BoardStore } from '../store/storeT';
import { PostModal } from '../components/PostModal';
import { Modal } from '../components/PostingModal';
import ramen from '../assets/ramen1.jpg';
import { useLocation, useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { UpdateModal } from '../components/UpdateModal';

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

const Board = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [galleryName, setGalleryName] = useState('');
    const [galleryType, setGalleryType] = useState('');
    // const [styleSwitch, setStyleSwitch] = useState(true);

    const {
        onePageData,
        setOnePageData,
        setCarousel,
        postModalOn,
        detailModalOn,
        setCurrentBoardName,
        setDetailModalOn,
        currentBoardName,
        updateModal,
        setUpdateModal,
        modalSignal,
        boardPostCount,
        setBoardPostCount,
        styleSwitch,
        setStyleSwitch,
        firstData,
        setFirstData,
        setGalleryData,
        realBoardName,
        setRealBoardName,
    } = BoardStore();

    const getBoardData = async () => {
        let res;
        if (location.pathname.includes('search')) {
            const judgement = location.pathname.split('/')[3];
            console.log(`http://localhost:8080/boards/${judgement}`);
            res = await axios({
                method: 'get',
                url: `http://localhost:8080/boards/${judgement}`,
            });
        } else {
            const judgement = location.pathname.split('/')[2];
            console.log(`http://localhost:8080/boards/${judgement}`);
            res = await axios({
                method: 'get',
                url: `http://localhost:8080/boards/${judgement}`,
            });
        }
        if (res) {
            console.log(res.data);
            setRealBoardName(res.data.boardName);
            setGalleryType(res.data.boardDefaultType);
            // setGalleryData(res.data.posts);
            setBoardPostCount(res.data.postCount);
        }
    };

    useEffect(() => {
        getBoardData();
        if (location.search) {
            setStyleSwitch(false);
        }
    }, []);

    useEffect(() => {
        if (galleryType == 'list') {
            setStyleSwitch(false);
        } else {
            if (!location.search) {
                setStyleSwitch(true);
            }
        }
    }, [galleryType]);

    useEffect(() => {
        setDetailModalOn(false);
    }, [styleSwitch]);

    const getOnePageData = async () => {
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards/posts/${modalSignal}`,
        });
        setOnePageData([res.data]);
        setDetailModalOn(true);
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
                    <h1>{realBoardName}</h1>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <_switchButton
                            onClick={() => {
                                navigate(
                                    `/board/${location.pathname.split('/')[2]}`,
                                );
                                setStyleSwitch(true);
                            }}
                        >
                            <_switchButtonImg2 src={G}></_switchButtonImg2>
                        </_switchButton>
                        <_switchButton
                            onClick={() => {
                                setStyleSwitch(false);
                            }}
                        >
                            <_switchButtonImg src={L}></_switchButtonImg>
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

export { Board };
