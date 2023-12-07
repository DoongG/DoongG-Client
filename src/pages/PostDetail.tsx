import { styled } from 'styled-components';
import { CiShare2 } from 'react-icons/ci';
import { IoIosHeart } from 'react-icons/io';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { TbHeart } from 'react-icons/tb';
import { TbHeartBroken } from 'react-icons/tb';
import { IoCopyOutline } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';
import { BoardStore } from '../store/storeT';
import { useEffect, useState, useRef } from 'react';
import Mascot from '../assets/Mascot-removebg-preview.png';
import { useLocation, useNavigate } from 'react-router';
import eyes from '../assets/eyes.png';
import axios from 'axios';

// url로 접근해서 들어가는 페이지 컴포넌트
const PostDetail = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const { onePageData, setOnePageData } = BoardStore();
    const [shareBalloon, setShareBalloon] = useState(false);
    const [copiedCheck, setCopiedCheck] = useState(false);
    const [commentsList, setCommentsList] = useState([]);
    const iscopied = useRef<any>(null);

    // 게시물 데이터 하나 요청
    const getOnePage = async () => {
        let pathKey = location.pathname.split('/')[2];
        let res = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/${pathKey}`,
        });
        let page = res.data;
        setOnePageData([page]);
        // return res.data;
    };

    // 조회수 1증가
    const plusView = async () => {
        let pathKey = location.pathname.split('/')[2];
        let res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/increaseViews/${pathKey}`,
        });
        getOnePage();
    };

    // 게시물 하나 렌더링 될 때 조회수 하나 추가
    useEffect(() => {
        plusView();
    }, []);

    // 댓글 렌더링 이펙트
    useEffect(() => {
        if (onePageData[0]) {
            let newData = onePageData[0];

            for (let i = 0; i < newData.comments.length; i++) {
                newData.comments[i].childCommentsList = [];
            }
            for (let i = 0; i < newData.comments.length; i++) {
                if (newData.comments[i].parentCommentId) {
                    for (let j = 0; j < newData.comments.length; j++) {
                        if (
                            newData.comments[j].commentId ==
                            newData.comments[i].parentCommentId
                        ) {
                            newData.comments[j].childCommentsList.push(
                                newData.comments[i],
                            );
                        }
                    }
                }
            }
            setCommentsList(newData.comments);
        }
    }, [onePageData]);

    // 공유버튼창 띄우기
    const share = (id: number) => {
        setShareBalloon(!shareBalloon);
    };

    return (
        <_allArea>
            {onePageData && onePageData.length > 0 && (
                <_content>
                    <_moveToGallery
                        onClick={() => {
                            navigate(
                                `/board/${onePageData[0]?.board.boardName}`,
                            );
                        }}
                    >
                        <span style={{ fontSize: '10px' }}>
                            {onePageData[0]?.board.boardName}으로 이동{' '}
                        </span>
                        <FaArrowRight style={{ fontSize: '10px' }} />
                    </_moveToGallery>
                    <_postTitle>{onePageData[0]?.title}</_postTitle>
                    <_rightSide>
                        <_writer>
                            <h4>{onePageData[0]?.user?.nickname}</h4>
                            <div style={{ marginLeft: '5px' }}>
                                <img
                                    style={{
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                    }}
                                    src={
                                        onePageData[0]?.user?.profileImg ||
                                        Mascot
                                    }
                                ></img>
                            </div>
                        </_writer>
                    </_rightSide>
                    <_dateLine>
                        <_date>
                            {onePageData[0].createdAt.slice(0, 10)}{' '}
                            {onePageData[0].createdAt.slice(11, 16)}{' '}
                        </_date>
                        <_view>
                            <img
                                style={{ width: '15px', marginRight: '4px' }}
                                src={eyes}
                            ></img>
                            {onePageData[0]?.views}
                        </_view>
                        <_like>
                            <span style={{ color: 'red' }}>
                                <IoIosHeart style={{ fontSize: '14px' }} />
                                {/* {onePageData[0].likes} */}
                            </span>{' '}
                        </_like>
                        <_share
                            onClick={() => {
                                share(onePageData[0]?.postId);
                            }}
                        >
                            <CiShare2 />
                            {shareBalloon === true ? (
                                <_emptySearchBalloon
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        await navigator.clipboard.writeText(
                                            `https://doongg.site/posts/${onePageData[0]?.postId}`,
                                        );
                                        setCopiedCheck(true);
                                        setTimeout(() => {
                                            setCopiedCheck(false);
                                        }, 3000);
                                    }}
                                >
                                    <div style={{ display: 'flex' }}>
                                        <p style={{ margin: '5px' }}>
                                            https://doongg.site/posts/
                                            {onePageData[0]?.postId}
                                        </p>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <IoCopyOutline />
                                        </div>
                                    </div>
                                    {copiedCheck && (
                                        <_copiedAlert>
                                            복사되었습니다
                                        </_copiedAlert>
                                    )}
                                </_emptySearchBalloon>
                            ) : null}
                        </_share>
                    </_dateLine>
                    <br></br>
                    <_realContent
                        dangerouslySetInnerHTML={{
                            __html: onePageData[0]?.content,
                        }}
                    ></_realContent>
                    <_likeLine>
                        <_likeBox>
                            <TbHeart
                                style={{ color: 'red', fontSize: '36px' }}
                            />
                            <div style={{ color: 'red' }}>
                                {onePageData[0]?.likeCount}
                            </div>
                            좋아요
                        </_likeBox>
                        <_likeBox>
                            <TbHeartBroken style={{ fontSize: '36px' }} />
                            <div>{onePageData[0]?.dislikeCount}</div>
                            싫어요
                        </_likeBox>
                    </_likeLine>
                    <h4>댓글 {onePageData[0]?.comments?.length}</h4>
                    <_commentsList>
                        <hr></hr>
                        {commentsList.map((x: any, index: number) => {
                            if (!x.parentCommentId) {
                                return (
                                    <div>
                                        <_oneComment>
                                            <_commentWriterLine>
                                                <_eachCommentWriter>
                                                    {x.commenter.nickname}
                                                </_eachCommentWriter>
                                            </_commentWriterLine>
                                            <div>{x?.content}</div>
                                            <div>
                                                {x.createdAt.slice(0, 10)}{' '}
                                                {x.createdAt.slice(11, 16)}{' '}
                                            </div>
                                            {x.childCommentsList.map(
                                                (y: any) => {
                                                    return (
                                                        <_recommentList>
                                                            <MdSubdirectoryArrowRight />
                                                            <div>
                                                                <_commentWriterLine2>
                                                                    <_eachCommentWriter>
                                                                        {
                                                                            y
                                                                                .commenter
                                                                                .nickname
                                                                        }
                                                                    </_eachCommentWriter>
                                                                </_commentWriterLine2>
                                                                <div>
                                                                    {y.content}
                                                                </div>
                                                                <_date>
                                                                    {y.createdAt.slice(
                                                                        0,
                                                                        10,
                                                                    )}{' '}
                                                                    {y.createdAt.slice(
                                                                        11,
                                                                        16,
                                                                    )}{' '}
                                                                </_date>
                                                            </div>
                                                        </_recommentList>
                                                    );
                                                },
                                            )}
                                        </_oneComment>
                                        <hr></hr>
                                    </div>
                                );
                            }
                        })}
                    </_commentsList>
                    {/* <_commentArea>
                        <_commentWriter>
                            여우님
                            <_comment
                                onClick={() => {
                                    postComment(onePageData[0]?.postId);
                                }}
                            >
                                작성
                            </_comment>
                        </_commentWriter>
                        <_commentContents
                            value={commentContent}
                            onChange={(e) => {
                                setCommentContent(e.target.value);
                            }}
                        ></_commentContents>
                    </_commentArea> */}
                </_content>
            )}
        </_allArea>
    );
};

const _moveToGallery = styled.div`
    margin-bottom: 20px;
    text-align: end;
    cursor: pointer;
`;

const _copiedAlert = styled.div`
    text-align: center;
    color: green;
    animation: fadeOut 4s linear;
    top: -20px;
    right: 140px;

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

const _emptySearchBalloon = styled.div`
    position: absolute;
    flex-direction: column;
    /* margin-top: 50px; */
    display: flex;
    font-size: 10px;
    background-color: #ffe066;
    color: #333;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    top: 25px;
    right: 1px;
`;

const _allArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const _title = styled.div`
    display: flex;
    justify-content: end;
    width: 90%;
`;

const _dateLine = styled.div`
    /* width: 100%; */
    display: flex;
    justify-content: end;
    flex-direction: row;
    margin: 0px 5px 0px 5px;
`;

const _rightSide = styled.div`
    display: flex;
    justify-content: end;
    flex-direction: row;
`;
const _writer = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 5px 0px 5px;
`;

const _date = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 5px 0px 5px;
`;

const _date2 = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 5px 0px 5px;
`;

const _view = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 5px 0px 5px;
`;
const _like = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 5px 0px 5px;
`;
const _share = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    margin: 0px 5px 0px 5px;
    cursor: pointer;
`;

const _content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    padding: 10px;
    text-align: start;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const _commentArea = styled.div`
    width: 100%;
    height: 200px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const _commentWriter = styled.div`
    width: 95%;
    padding: 5px;
    height: 25px;
    display: flex;
    justify-content: space-between;
`;

const _commentContents = styled.textarea`
    border: 1px solid black;
    width: 95%;
    height: 150px;
    resize: none;
    font-size: 16px;
`;

const _realContent = styled.div`
    margin-bottom: 20px;
`;

const _commentsList = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const _oneComment = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const _eachCommentWriter = styled.div`
    font-weight: 600;
`;

const _commentWriterLine = styled.div`
    display: flex;
    justify-content: space-between;
`;

const _commentWriterLine2 = styled.div`
    display: flex;
    justify-content: start;
`;

const _recomment = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const _comment = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const _option = styled.div`
    display: flex;
`;

const _recommentSet = styled.div`
    display: flex;
    margin: 5px;
`;

const _recommentList = styled.div`
    display: flex;
    margin: 5px;
`;

const _recommentBox = styled.textarea`
    width: 80%;
    min-height: 100px;
    border: 1px solid black;
    resize: none;
    font-size: 16px;
`;

const _postTitle = styled.h1`
    width: 100%;
`;

const _likeLine = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const _likeBox = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
    border-radius: 10px;
`;

export { PostDetail };
