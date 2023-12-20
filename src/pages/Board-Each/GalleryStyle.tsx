import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaRegComment } from 'react-icons/fa';
import eyes from '../../assets/eyes.png';
import { BoardStore } from '../../store/storeT';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { BoardUpperPart } from './SearchBar/BoardUpperPart';
import { PostModal } from './PostDetailModal/PostModal';
import { useLocation, useParams } from 'react-router';
import Mascot from '../../assets/Mascot-removebg-preview.png';
import { imageDataType, eachDataType } from '../Type/Type';

// 갤러리 유형의 게시판 컴포넌트
const GalleryStyle = () => {
    let path = useLocation();
    const isMounted = useRef(false);
    const {
        setOnePageData,
        setSignal,
        signal,
        orderKind,
        galleryData,
        setGalleryData,
        isKeywordExsist,
        selectedOption,
        searchCount,
        setSearchCount,
        setDetailModalOn,
    } = BoardStore();
    const [reference, inView] = useInView();
    const [getCount, setGetCount] = useState(0);

    const dataGenerate = async () => {
        let whichType = '';
        if (orderKind === false) whichType = 'latest';
        else whichType = 'views';
        let res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_KEY}/boards/${
                path.pathname.split('/')[2]
            }?page=1&order=${whichType}`,
        });
        setGalleryData(res.data.posts);
        setGetCount(getCount + 1);
        setSignal(false);
    };

    // 게시판 데이터 요청하는 함수
    const dataGenerate2 = async (counter: number) => {
        let whichType = '';
        if (orderKind === false) whichType = 'latest';
        else whichType = 'views';
        let res;
        if (isKeywordExsist.length > 0) {
            res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_KEY}/boards/search/${
                    path.pathname.split('/')[2]
                }?keyword=${isKeywordExsist}&searchType=${selectedOption}&order=${whichType}&pageSize=${12}&page=${
                    searchCount + 1
                }`,
            });
            setSearchCount(searchCount + 1);
            setGalleryData([...galleryData, ...res.data.content]);
        } else {
            res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_KEY}/boards/${
                    path.pathname.split('/')[2]
                }?page=${counter}&order=${whichType}`,
            });
            setGetCount(counter);
            setGalleryData([...galleryData, ...res.data.posts]);
        }
    };

    // 정렬 기준이 들어간 요청이 들어간 함수
    const dataGenerate3 = async () => {
        let whichType = '';
        if (orderKind === false) whichType = 'latest';
        else whichType = 'views';
        let res;
        if (isKeywordExsist.length > 0) {
            res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_KEY}/boards/search/${
                    path.pathname.split('/')[2]
                }?keyword=${isKeywordExsist}&searchType=${selectedOption}&order=${whichType}&pageSize=${12}&page=1`,
            });
            setGalleryData(res.data.content);
        } else {
            res = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_KEY}/boards/${
                    path.pathname.split('/')[2]
                }?page=1&order=${whichType}`,
            });
            setGalleryData(res.data.posts);
        }
        setGetCount(1);
        setSearchCount(1);
    };

    // 무한 스크롤이 동작하기 위한 인터섹트옵저버 로직이 들어간 라이브러리 기능이 들어간 이펙트
    useEffect(() => {
        if (inView) {
            dataGenerate2(getCount + 1);
        }
    }, [inView]);

    // 게시글 하나 요청하는 함수
    const getOnePost = async (id: number) => {
        let res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/${id}`,
        });
        setOnePageData([res.data]);
        setDetailModalOn(true);
    };

    // 조회수 1 증가 함수
    const plusView = async (postId: number) => {
        let res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/increaseViews/${postId}`,
        });
        getOnePost(postId);
    };

    // 썸네일 고르는 로직 함수
    const thumbnailPicker = (imageArr: imageDataType[]) => {
        if (imageArr) {
            for (let i = 0; i < imageArr.length; i++) {
                if (imageArr[i].imageType == 'thumbnail') {
                    return imageArr[i].url;
                }
            }
        }
        return Mascot;
    };

    // 글이 수정되거나 했을 때 게시판 데이터 새로 불러오는 이펙트
    useEffect(() => {
        if (signal == true) {
            dataGenerate();
        }
    }, [signal]);

    useEffect(() => {
        return () => {
            setGalleryData([]);
        };
    }, []);

    // 게시글 정렬 기준이 바꼈을 때 데이터 새로 불러오는 이펙트
    useEffect(() => {
        if (isMounted.current) {
            dataGenerate3();
        } else {
            isMounted.current = true;
        }
    }, [orderKind]);

    return (
        <_allArea>
            <BoardUpperPart></BoardUpperPart>
            <_cardContainer>
                {galleryData &&
                    galleryData.map((eachData: eachDataType) => {
                        return (
                            <div>
                                <_cardBox
                                    onClick={() => {
                                        plusView(eachData.postId);
                                    }}
                                >
                                    <_cardLike>
                                        <FontAwesomeIcon icon={faHeart} />
                                        {eachData.likeCount}
                                    </_cardLike>
                                    <_cardDisplay>
                                        <_card
                                            id="img"
                                            src={thumbnailPicker(
                                                eachData.postImages,
                                            )}
                                        />
                                    </_cardDisplay>
                                    <_cardInst>
                                        <_cardLeft>
                                            <_cardProfileImg
                                                src={
                                                    eachData?.user?.profileImg
                                                        ? eachData?.user
                                                              ?.profileImg
                                                        : Mascot
                                                }
                                            ></_cardProfileImg>
                                        </_cardLeft>
                                        <_cardRight>
                                            <_cardTitle id="title">
                                                {eachData.title}
                                            </_cardTitle>
                                            <_cardWriter>
                                                {eachData?.user?.nickname
                                                    ? eachData?.user?.nickname
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
                                            {eachData.views}
                                        </_cardFooterSection>
                                        <_cardFooterSection>
                                            <_customCommentIcon />
                                            {eachData.commentCount}
                                        </_cardFooterSection>
                                    </_cardFooter>
                                </_cardBox>
                            </div>
                        );
                    })}
            </_cardContainer>
            <div ref={reference}>더보기</div>
        </_allArea>
    );
};

const _customCommentIcon = styled(FaRegComment)`
    font-size: 12px;
    margin-top: 5px;
`;

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
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    /* white-space: normal; */
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

export { GalleryStyle };
