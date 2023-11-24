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
import { useLocation } from 'react-router';
import axios from 'axios';

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
    const location = useLocation();
    console.log(location.pathname);
    const getBoardData = async (where: any) => {
        console.log(`http://localhost:8080/${where}`);
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/${where}`,
        });
    };

    const uploadCallback = () => {
        console.log('이미지 업로드');
    };

    const [styleSwitch, setStyleSwitch] = useState(true);
    const {
        setCarousel,
        postModalOn,
        detailModalOn,
        setDetailModalOn,
        setCurrentBoardName,
        currentBoardName,
    } = BoardStore();
    useEffect(() => {
        let where = location.pathname.split('/')[1];
        getBoardData(where);
        setCarousel([
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
            {
                url: ramen,
                title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
                comments: 12,
                likes: 12,
                visits: 121,
            },
        ]);
    }, []);

    useEffect(() => {
        setDetailModalOn(false);
    }, [styleSwitch]);

    return (
        <_boardArea>
            {postModalOn && <Modal />}
            {detailModalOn == true && <PostModal />}
            <_boardHeader>
                <_innerBoardHeader>
                    <h1>라면 게시판</h1>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <_switchButton
                            onClick={() => {
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
