import styled from 'styled-components';
import { BoardStore } from '../store/storeT';
import { useEffect, useState } from 'react';
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
    border-bottom: 1px solid #000;
    display: flex;
    flex-direction: row;
`;

const ListStyle = () => {
    const {
        // listData,
        // setListData,
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
    } = BoardStore();
    const navigate = useNavigate();
    const [postNum, setPostNum] = useState(0);
    const [whichOrder, setWhichOrder] = useState(false);

    const [listData, setListData] = useState([]);
    const [getCount, setGetCount] = useState(1);
    const path = useLocation();

    const getListData = async () => {
        let whichType = 'latest';
        if (orderKind === false) whichType = 'latest';
        else whichType = 'views';
        let res;
        if (path.search) {
            res = await axios({
                method: 'get',
                url: `http://localhost:8080/boards/${
                    path.pathname.split('/')[2]
                }?page=${path.search.split('=')[1]}&order=${whichType}`,
            });
        } else {
            res = await axios({
                method: 'get',
                url: `http://localhost:8080/boards/${
                    path.pathname.split('/')[2]
                }`,
            });
        }

        setListData(res?.data.posts);
    };

    const getListDataAfterPosting = async () => {
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards/${
                path.pathname.split('/')[2]
            }?page=1`,
        });
        console.log(res.data);
        setListData(res.data.posts);
    };

    useEffect(() => {
        getListData();
    }, []);

    useEffect(() => {
        getListDataAfterPosting();
    }, [signal]);

    const pagination = (num: number) => {
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
                                navigate(
                                    `/board/${
                                        path.pathname.split('/')[2]
                                    }?page=${e.currentTarget.innerText}`,
                                );
                                getListData();
                            }}
                        >
                            {x}
                        </span>
                    );
                })}
            </div>
        );
    };

    const sampledb = [
        {
            id: 1,
            url: ramen,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
        {
            id: 2,
            url: fox,
            profileImg: fox,
            writer: '여우',
            title: '미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로',
            comments: 12,
            likes: 12,
            visits: 121,
        },
    ];

    const getOnePost = async (id: number) => {
        console.log(id);

        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards/posts/${id}`,
        });

        const tempData: any = [
            {
                id: id,
                profileImg: fox,
                title: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
                writer: '여우여우여우여우여우여우여우여우여우',
                date: '2023-11-21 02:23',
                likes: 12,
                views: 121,
                content:
                    '일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다v',
                comments: [
                    {
                        id: 1,
                        writer: '늑대',
                        date: '2023-11-21 02:25',
                        content: '뭐래씹',
                        childCommentsList: [
                            {
                                id: 1,
                                writer: '늑대',
                                date: '2023-11-21 02:25',
                                content: '뭐래씹',
                            },
                            {
                                id: 2,
                                writer: '늑대',
                                date: '2023-11-21 02:25',
                                content: '걍뒤져',
                            },
                        ],
                    },
                    {
                        id: 2,
                        writer: '늑대',
                        date: '2023-11-21 02:25',
                        content: '걍뒤져',
                        childCommentsList: [
                            {
                                id: 1,
                                writer: '늑대늑대늑대늑대늑대늑대늑대늑대',
                                date: '2023-11-21 02:25',
                                content: '뭐래씹',
                            },
                            {
                                id: 2,
                                writer: '늑대',
                                date: '2023-11-21 02:25',
                                content: '걍뒤져',
                            },
                        ],
                    },
                ],
            },
        ];
        setOnePageData([res.data]);
    };

    useEffect(() => {
        console.log(onePageData);
        if (onePageData.length > 0) {
            setDetailModalOn(true);
        }
    }, [onePageData]);

    useEffect(() => {
        getListData();
    }, [orderKind]);

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
                {listData.map((x: any, index: number) => {
                    return (
                        <>
                            <tr
                                onClick={() => {
                                    getOnePost(x.postId);
                                }}
                            >
                                <_td>{x.postId}</_td>
                                <_titleTd id="title">
                                    <div style={{ color: 'orange' }}>
                                        {x.postImages && <IoMdPhotos />}
                                    </div>
                                    <div>
                                        {x.title} [{x.commentCount}]
                                    </div>
                                </_titleTd>
                                <_td>{x.views}</_td>
                                <_td>{x.likeCount}</_td>
                            </tr>
                        </>
                    );
                })}
            </_listRow>
            {pagination(boardPostCount !== 0 ? boardPostCount : 1)}
        </_listContainer>
    );
};

export { ListStyle };
