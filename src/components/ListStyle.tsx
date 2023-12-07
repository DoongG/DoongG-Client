import styled from 'styled-components';
import { BoardStore } from '../store/storeT';
import { useEffect, useState, useRef } from 'react';
import ramen from '../assets/ramen1.jpg';
import fox from '../assets/fox.jpg';
import { IoMdPhotos } from 'react-icons/io';
import { BoardUpperPart } from './BoardUpperPart';
import axios from 'axios';
import { useLocation, useParams } from 'react-router';

import { useNavigate } from 'react-router';

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
    const navigate = useNavigate();
    const path = useLocation();

    const routingManager = () => {
        if (path.search) return 'pattern1';
        else return 'pattern2';
    };

    // 게시글 요청
    const getListData = async (page: any) => {
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
                }
                if (arr[i].includes('page')) {
                    pageNum = +arr[i].split('=')[1];
                }
                if (arr[i].includes('order')) {
                    order = arr[i].split('=')[1];
                }
            }
            if (keyword) {
                setIsKeywordExsist(keyword);
            }
            if (keyword.length > 0) {
                console.log(
                    `http://localhost:8080/boards/search/${
                        path.pathname.split('/')[3]
                    }?keyword=${keyword}&page=${page}&order=${order}`,
                );
                res = await axios({
                    method: 'get',
                    url: `http://localhost:8080/boards/search/${
                        path.pathname.split('/')[3]
                    }?keyword=${keyword}&page=${page}&order=${order}`,
                });
            } else {
                console.log(
                    `http://localhost:8080/boards/${
                        path.pathname.split('/')[2]
                    }?page=${page}&order=${order}`,
                );
                res = await axios({
                    method: 'get',
                    url: `http://localhost:8080/boards/${
                        path.pathname.split('/')[2]
                    }?page=${page}&order=${order}`,
                });
            }
        } else {
            if (page == 1) {
                res = await axios({
                    method: 'get',
                    url: `http://localhost:8080/boards/${
                        path.pathname.split('/')[2]
                    }?order=${whichType}`,
                });
            } else {
                res = await axios({
                    method: 'get',
                    url: `http://localhost:8080/boards/${
                        path.pathname.split('/')[2]
                    }?page=${page}&order=${whichType}`,
                });
            }
        }

        setListData(res?.data.posts);
    };

    // 정렬 유형이 바뀔 때 마다 새 데이터 요청하는 이펙트
    useEffect(() => {
        if (isMounted.current) {
            getListData(1);
        } else {
            isMounted.current = true;
        }
    }, [orderKind]);

    // 글을 쓴 뒤에 새 게시글들 목록을 요청하는 함수
    const getListDataAfterPosting = async () => {
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards/${
                path.search.includes('keyword')
                    ? path.pathname.split('/')[3]
                    : path.pathname.split('/')[2]
            }?page=1`,
        });
        console.log(res.data);
        setListData(res.data.posts);
        setSignal(false);
        navigate(`/board/${realBoardName}`);
    };

    // 렌더링시 데이터 받아오는 이펙트
    useEffect(() => {
        console.log(path);
        if (path.search) {
            let temp = path.search.slice(1);
            let arr = temp.split('&');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].split('=')[0] == 'page') {
                    getListData(+arr[i].split('=')[1]);
                }
            }
        } else {
            getListData(1);
        }
    }, []);

    // 글이 작성된 후에 데이터 목록을 다시 가져오는 요청을 보내는 함수가 발동되는 이펙트
    useEffect(() => {
        if (signal) {
            getListDataAfterPosting();
        }
    }, [signal]);

    // 페이지네이션
    const pagination = (num: number) => {
        let whichType = 'latest';
        if (orderKind === false) whichType = 'latest';
        else whichType = 'views';

        let pages = Math.ceil(num / 12);
        let data = [];
        for (let i = 1; i <= pages; i++) {
            data.push(i);
        }

        return (
            <div
                style={{
                    margin: '10px',
                    width: '60%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {data.map((x) => {
                    return (
                        <span
                            style={{
                                cursor: 'pointer',
                                margin: '0px 10px 0px 10px',
                            }}
                            onClick={(e) => {
                                let completeURL = '';
                                if (isKeywordExsist) {
                                    completeURL += `/boards/search/${realBoardName}?keyword=${isKeywordExsist}&page=${x}&order=${whichType}`;
                                } else {
                                    completeURL += `/board/${realBoardName}?page=${x}&order=${whichType}`;
                                }
                                navigate(completeURL);
                                getListData(x);
                            }}
                        >
                            {x}
                        </span>
                    );
                })}
            </div>
        );
    };

    // 게시글 하나 가져오는 함수
    const getOnePost = async (id: number) => {
        console.log(id);

        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards/posts/${id}`,
        });

        setOnePageData([res.data]);
    };

    // 조회수 1 증가
    const plusView = async (postId: any) => {
        let res = await axios({
            method: 'post',
            url: `http://localhost:8080/boards/posts/increaseViews/${postId}`,
        });
        getOnePost(postId);
    };

    // useEffect(() => {
    //     console.log(onePageData);
    //     if (onePageData.length > 0) {
    //         setDetailModalOn(true);
    //     }
    // }, [onePageData]);

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
                    listData.map((x: any, index: number) => {
                        return (
                            <>
                                <tr
                                    onClick={() => {
                                        plusView(x.postId);
                                    }}
                                >
                                    <td>{x.postId}</td>
                                    <_titleTd id="title">
                                        <div
                                            style={{
                                                color: 'orange',
                                            }}
                                        >
                                            {x.postImages.length > 0 && (
                                                <IoMdPhotos />
                                            )}
                                        </div>
                                        <div>
                                            {x.title} [{x.commentCount}]
                                        </div>
                                    </_titleTd>
                                    <td>{x.views}</td>
                                    <td>{x.likeCount}</td>
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
            {/* {pagination(boardPostCount !== 0 ? boardPostCount : 1)} */}
            {pagination(20)}
        </_listContainer>
    );
};

export { ListStyle };
