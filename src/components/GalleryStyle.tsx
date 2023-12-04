import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaRegComment } from 'react-icons/fa';
import ramen from '../assets/ramen1.jpg';
import fox from '../assets/fox.jpg';
import eyes from '../assets/eyes.png';
import { BoardStore } from '../store/storeT';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { BoardUpperPart } from './BoardUpperPart';
import { PostModal } from './PostModal';
import { useLocation, useParams } from 'react-router';
import Mascot from '../assets/Mascot-removebg-preview.png';

const _allArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const _cardContainer = styled.div`
    width: 95vw;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const _cardBox = styled.div`
    width: 300px;
    height: 320px;
    display: flex;
    margin: 20px;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    &:hover {
        box-shadow: 5px 5px 5px gray;
        & #title {
            text-decoration: underline;
        }
        & #img {
            width: 100%;
            height: 100%;
            object-fit: none;
        }
    }
    cursor: pointer;
`;

const _cardDisplay = styled.div`
    width: 300px;
    height: 210px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;
`;

const _card = styled.img`
    width: 90%;
    height: 90%;
    border-radius: 10px;
    object-fit: cover;
`;

const _cardTitle = styled.p`
    width: 90%;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: start;
    margin: 2px 2px 2px 0px;
`;

const _cardLike = styled.div`
    position: absolute;
    margin-top: 15px;
    margin-left: -200px;
    text-align: start;
    font-size: 25px;
    color: red;
`;

const _cardInst = styled.div`
    width: 100%;
    display: flex;
    margin-top: 5px;
`;

const _cardLeft = styled.div`
    padding: 10px;
`;

const _cardRight = styled.div`
    width: 100%;
`;

const _cardWriter = styled.div`
    width: 100%;
    font-size: 15px;
    text-align: start;
    font-weight: 600;
`;

const _cardProfileImg = styled.img`
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

const _cardFooter = styled.div`
    width: 100%;
    display: flex;
    margin: 5px 5px 5px 25px;
`;

const _cardFooterSection = styled.div`
    margin: 0px 5px 0px 5px;
`;

const GalleryStyle = () => {
    let path = useLocation();
    const {
        setOnePageData,
        setSignal,
        signal,
        orderKind,
        setOrderKind,
        galleryData,
        setGalleryData,
        isKeywordExsist,
        selectedOption,
        searchCount,
        setSearchCount,
    } = BoardStore();
    const [reference, inView] = useInView();
    const [getCount, setGetCount] = useState(0);

    const dataGenerate = async () => {
        let whichType = '';
        if (orderKind === false) whichType = 'latest';
        else whichType = 'views';
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards/${
                path.pathname.split('/')[2]
            }?page=1&order=${whichType}`,
        });
        setGalleryData(res.data.posts);
        setGetCount(getCount + 1);
        setSignal(false);
    };

    const dataGenerate2 = async (counter: number) => {
        let whichType = '';
        if (orderKind === false) whichType = 'latest';
        else whichType = 'views';
        let res;
        if (isKeywordExsist.length > 0) {
            res = await axios({
                method: 'get',
                url: `http://localhost:8080/boards/search/${
                    path.pathname.split('/')[2]
                }?keyword=${isKeywordExsist}&searchType=${selectedOption}&order=${whichType}&pageSize=${12}&page=${
                    searchCount + 1
                }`,
            });
            setSearchCount(searchCount + 1);
        } else {
            res = await axios({
                method: 'get',
                url: `http://localhost:8080/boards/${
                    path.pathname.split('/')[2]
                }?page=${counter}&order=${whichType}`,
            });
            setGetCount(counter);
        }
        // console.log(counter);
        setGalleryData([...galleryData, ...res.data.posts]);
    };

    const dataGenerate3 = async () => {
        let whichType = '';
        if (orderKind === false) whichType = 'latest';
        else whichType = 'views';
        let res;
        if (isKeywordExsist.length > 0) {
            res = await axios({
                method: 'get',
                url: `http://localhost:8080/boards/search/${
                    path.pathname.split('/')[2]
                }?keyword=${isKeywordExsist}&searchType=${selectedOption}&order=${whichType}&pageSize=${12}&page=1`,
            });
            console.log(whichType);
        } else {
            res = await axios({
                method: 'get',
                url: `http://localhost:8080/boards/${
                    path.pathname.split('/')[2]
                }?page=1&order=${whichType}`,
            });
        }
        setGalleryData(res.data.posts);
        setGetCount(1);
        setSearchCount(1);
    };

    useEffect(() => {
        if (inView) {
            dataGenerate2(getCount + 1);
        }
    }, [inView]);

    const getOnePost = async (id: number) => {
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards/posts/${id}`,
        });
        setOnePageData([res.data]);
    };

    const plusView = async (postId: any) => {
        let res = await axios({
            method: 'post',
            url: `http://localhost:8080/boards/posts/increaseViews/${postId}`,
        });
        getOnePost(postId);
    };

    const thumbnailPicker = (imageArr: any) => {
        if (imageArr) {
            for (let i = 0; i < imageArr.length; i++) {
                if (imageArr[i].imageType == 'thumbnail') {
                    return imageArr[i].url;
                }
            }
        }
        return Mascot;
    };

    useEffect(() => {
        if (signal == true) {
            dataGenerate();
        }
    }, [signal]);

    useEffect(() => {
        dataGenerate3();
    }, [orderKind]);

    // useEffect(() => {
    //     if (isKeywordExsist.length > 0) {
    //         setSearchCount(1);
    //     }
    // }, [isKeywordExsist]);

    return (
        <_allArea>
            <BoardUpperPart></BoardUpperPart>
            <_cardContainer>
                {galleryData &&
                    galleryData.map((x: any) => {
                        return (
                            <div>
                                <_cardBox
                                    onClick={() => {
                                        plusView(x.postId);
                                    }}
                                >
                                    <_cardLike>
                                        <FontAwesomeIcon icon={faHeart} />
                                        {x.likeCount}
                                    </_cardLike>
                                    <_cardDisplay>
                                        <_card
                                            id="img"
                                            src={thumbnailPicker(x.postImages)}
                                        />
                                    </_cardDisplay>
                                    <_cardInst>
                                        <_cardLeft>
                                            <_cardProfileImg
                                                src={
                                                    x?.user?.profileImg
                                                        ? x?.user?.profileImg
                                                        : Mascot
                                                }
                                            ></_cardProfileImg>
                                        </_cardLeft>
                                        <_cardRight>
                                            <_cardTitle id="title">
                                                {x.title}
                                            </_cardTitle>
                                            <_cardWriter>
                                                {x?.user?.nickname
                                                    ? x?.user?.nickname
                                                    : '미정'}
                                            </_cardWriter>
                                        </_cardRight>
                                    </_cardInst>
                                    <_cardFooter>
                                        <_cardFooterSection>
                                            <img
                                                style={{ width: '15px' }}
                                                src={eyes}
                                            ></img>
                                            {x.views}
                                        </_cardFooterSection>
                                        <_cardFooterSection>
                                            <FaRegComment
                                                style={{
                                                    fontSize: '12px',
                                                    marginTop: '5px',
                                                }}
                                            />
                                            {x.commentCount}
                                        </_cardFooterSection>
                                    </_cardFooter>
                                </_cardBox>
                            </div>
                        );
                        // : (
                        //     <div
                        //         style={{
                        //             width: '300px',
                        //             height: '320px',
                        //             margin: '20px',
                        //         }}
                        //     ></div>
                        // );
                    })}
            </_cardContainer>
            <div ref={reference}>더보기</div>
        </_allArea>
    );
};

export { GalleryStyle };
