import styled from 'styled-components';
import { BoardStore } from '../../store/storeT';
import { useEffect, useState, useRef } from 'react';
import { IoMdPhotos } from 'react-icons/io';
import { BoardUpperPart } from './SearchBar/BoardUpperPart';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import axios from 'axios';
import { useLocation, useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { eachDataType } from '../Type/Type';

// 리스트 유형 게시판 컴포넌트
const ListStyle = () => {
    const isMounted = useRef(false);
    const {
        listData,
        setListData,
        signal,
        setSignal,
        detailModalOn,
        setDetailModalOn,
        onePageData,
        setOnePageData,
        orderKind,
        setOrderKind,
        boardPostCount,
        setBoardPostCount,
        setIsKeywordExsist,
        isKeywordExsist,
        realBoardName,
    } = BoardStore();
    const [pages, setPages] = useState<number[]>([]);
    const [nowPage, setNowPage] = useState(0);
    const [prevPages, setPrevPages] = useState(false);
    const [nextPages, setNextPages] = useState(false);
    const [colorPage, setColorPage] = useState(1);
    const navigate = useNavigate();
    const path = useLocation();
    const params = useParams();

    // 게시글 요청
    const getListData = async (page: number) => {
        let whichType = 'latest';
        if (orderKind === false) whichType = 'latest';
        else whichType = 'views';
        let res;
        let keyword = '';
        let pageNum = 1;
        let order = 'latest';
        if (path.search) {
            let temp = path.search.slice(1);
            let arr = temp.split('&');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].includes('keyword')) {
                    keyword = arr[i].split('=')[1];
                } else if (arr[i].includes('page')) {
                    pageNum = +arr[i].split('=')[1];
                } else if (arr[i].includes('order')) {
                    order = arr[i].split('=')[1];
                }
            }
            if (keyword) {
                setIsKeywordExsist(keyword);
            }
            if (keyword.length > 0) {
                res = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_KEY}/boards/search/${
                        path.pathname.split('/')[3]
                    }?keyword=${keyword}&page=${page}&order=${order}`,
                });
                setListData(res?.data.content);
            } else {
                res = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_KEY}/boards/${
                        path.pathname.split('/')[2]
                    }?page=${page}&order=${order}`,
                });
                setListData(res?.data.posts);
            }
        } else {
            if (page == 1) {
                res = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_KEY}/boards/${
                        path.pathname.split('/')[2]
                    }?order=${whichType}`,
                });
            } else {
                res = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_KEY}/boards/${
                        path.pathname.split('/')[2]
                    }?page=${page}&order=${whichType}`,
                });
            }
            setListData(res?.data.posts);
        }
    };

    // 정렬 유형이 바뀔 때 마다 새 데이터 요청하는 이펙트
    useEffect(() => {
        if (isMounted.current) {
            getListData(1);
            setNowPage(1);
            setColorPage(1);
        } else {
            isMounted.current = true;
        }
    }, [orderKind]);

    // 글을 쓴 뒤에 새 게시글들 목록을 요청하는 함수
    const getListDataAfterPosting = async () => {
        let res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_KEY}/boards/${
                path.search.includes('keyword')
                    ? path.pathname.split('/')[3]
                    : path.pathname.split('/')[2]
            }?page=1`,
        });

        setBoardPostCount(res.data.postCount);
        setListData(res.data.posts);
        setSignal(false);
        setNowPage(1);
        setColorPage(1);
        navigate(`/board/${realBoardName}`);
    };

    // 렌더링시 데이터 받아오는 이펙트
    useEffect(() => {
        if (path.search) {
            let temp = path.search.slice(1);
            let arr = temp.split('&');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].split('=')[0] == 'page') {
                    getListData(+arr[i].split('=')[1]);
                    setColorPage(+arr[i].split('=')[1]);
                }
            }
        } else {
            getListData(1);
            setColorPage(1);
        }

        return () => {
            setListData([]);
        };
    }, []);

    // 글이 작성된 후에 데이터 목록을 다시 가져오는 요청을 보내는 함수가 발동되는 이펙트
    useEffect(() => {
        if (signal) {
            getListDataAfterPosting();
        }
    }, [signal]);

    // 페이지네이션
    const pagination = (num: number, pageSection: number) => {
        let pagesNum = Math.ceil(num / 12);
        let data = [];
        for (let i = pageSection; i <= pageSection + 9; i++) {
            if (pagesNum >= i) {
                data.push(i);
            }
        }
        if (pageSection !== 1) {
            setPrevPages(true);
        } else {
            setPrevPages(false);
        }
        if (pageSection + 9 < pagesNum) {
            setNextPages(true);
        } else {
            setNextPages(false);
        }
        setPages(data);
    };

    useEffect(() => {
        pagination(boardPostCount, 1);
        if (path.search) {
            let temp = path.search.slice(1);
            let arr = temp.split('&');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].split('=')[0] == 'page') {
                    setColorPage(+arr[i].split('=')[1]);
                }
            }
        } else {
            setColorPage(1);
        }
    }, [boardPostCount]);

    useEffect(() => {
        if ((nowPage - 1) % 10 == 0) {
            pagination(boardPostCount, nowPage);
        }
    }, [nowPage]);

    // 게시글 하나 가져오는 함수
    const getOnePost = async (id: number) => {
        let res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/${id}`,
        });
        setOnePageData([res.data]);
        setDetailModalOn(true);
    };

    // 조회수 1 증가
    const plusView = async (postId: number) => {
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/increaseViews/${postId}`,
        });
        getOnePost(postId);
    };

    const routingManager = (eachPage: number, state: string) => {
        let pageComplete = -1;
        if (state == 'prev') {
            pageComplete = eachPage - 1;
            setNowPage(eachPage - 10);
        } else if (state == 'next') {
            pageComplete = eachPage + 1;
            setNowPage(eachPage + 1);
        } else {
            pageComplete = eachPage;
            setNowPage(eachPage);
        }
        setColorPage(pageComplete);
        let completeURL = '';
        if (isKeywordExsist) {
            completeURL += `/boards/search/${realBoardName}?keyword=${isKeywordExsist}&page=${pageComplete}&order=${
                orderKind ? 'views' : 'latest'
            }`;
        } else {
            completeURL += `/board/${realBoardName}?page=${pageComplete}&order=${
                orderKind ? 'views' : 'latest'
            }`;
        }
        navigate(completeURL);
        getListData(pageComplete);
    };

    useEffect(() => {
        if (path.search) {
            let numberExport = path.search
                .split('page')[1]
                .split('&')[0]
                .split('=')[1];
            setColorPage(+numberExport);
        } else {
            setColorPage(1);
        }
    }, [path]);

    return (
        <_listContainer>
            <BoardUpperPart />
            <_listRow>
                <tr>
                    <_th style={{ width: '100px' }}>번호</_th>
                    <_th>제목</_th>
                    <_th style={{ width: '100px' }}>조회수</_th>
                    <_th style={{ width: '100px' }}>추천수</_th>
                </tr>
                {listData &&
                    listData.map((eachData: eachDataType) => {
                        return (
                            <>
                                <tr
                                    onClick={() => {
                                        plusView(eachData.postId);
                                    }}
                                >
                                    <td>{eachData.postId}</td>
                                    <_titleTd id="title">
                                        <div
                                            style={{
                                                color: 'orange',
                                            }}
                                        >
                                            {eachData.postImages.length > 0 && (
                                                <IoMdPhotos />
                                            )}
                                        </div>
                                        <div>
                                            {eachData.title} [
                                            {eachData.commentCount}]
                                        </div>
                                    </_titleTd>
                                    <td>{eachData.views}</td>
                                    <td>{eachData.likeCount}</td>
                                </tr>
                                <tr>
                                    <_td></_td>
                                    <_td></_td>
                                    <_td></_td>
                                    <_td></_td>
                                </tr>
                            </>
                        );
                    })}
            </_listRow>
            <_paginationWrapper>
                {pages.map((eachPage: number) => {
                    return (
                        <>
                            {eachPage !== 1 &&
                                (eachPage - 1) % 10 == 0 &&
                                prevPages && (
                                    <span>
                                        <IoIosArrowBack
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                routingManager(
                                                    eachPage,
                                                    'prev',
                                                );
                                            }}
                                        />
                                    </span>
                                )}
                            <_whichPage
                                style={{
                                    color:
                                        colorPage == eachPage
                                            ? 'blue'
                                            : 'black',
                                    fontWeight:
                                        colorPage == eachPage ? 700 : 400,
                                }}
                                onClick={(e) => {
                                    routingManager(eachPage, 'current');
                                }}
                            >
                                {eachPage}
                            </_whichPage>
                            {eachPage % 10 == 0 && nextPages == true && (
                                <span>
                                    <IoIosArrowForward
                                        onClick={() => {
                                            routingManager(eachPage, 'next');
                                        }}
                                        style={{
                                            marginTop: '-3px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                </span>
                            )}
                        </>
                    );
                })}
            </_paginationWrapper>
        </_listContainer>
    );
};

const _whichPage = styled.span`
    cursor: pointer;
    margin: 0px 10px 0px 10px;
`;

const _listContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: auto;
    /* background-color: #cccccc; */
    margin: 0px 0px 20px 0px;
`;

const _listRow = styled.table`
    width: 80%;
    font-size: 16px;
    border-spacing: 0 10px;
    cursor: pointer;
    & #title {
        text-align: start;
    }
    & #title:hover {
        text-decoration: underline;
    }
`;

const _th = styled.th`
    border-bottom: 1px solid #000;
`;

const _td = styled.td`
    border-bottom: 1px solid #000;
`;

const _titleTd = styled.td`
    display: flex;
    flex-direction: row;
`;

const _paginationWrapper = styled.div`
    margin: 10px;
    width: 60%;
    display: flex;
    justify-content: center;
`;

export { ListStyle };
