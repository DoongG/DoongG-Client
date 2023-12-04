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

    useEffect(() => {
        if (isMounted.current) {
            getListData(1);
        } else {
            isMounted.current = true;
        }
    }, [orderKind]);

    const getListDataAfterPosting = async () => {
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards/${
                path.pathname.split('/')[2]
            }?page=1`,
        });
        console.log(res.data);
        setListData(res.data.posts);
        setSignal(false);
        navigate(`/board/${realBoardName}`);
    };

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

    useEffect(() => {
        if (signal) {
            getListDataAfterPosting();
        }
    }, [signal]);

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

    const getOnePost = async (id: number) => {
        console.log(id);

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
