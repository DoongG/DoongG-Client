import { BoardStore } from '../../../store/storeT';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { CiShare2 } from 'react-icons/ci';
import { IoIosHeart } from 'react-icons/io';
import { TbHeart } from 'react-icons/tb';
import { TbHeartFilled } from 'react-icons/tb';
import { IoCopyOutline } from 'react-icons/io5';
import { TbHeartBroken } from 'react-icons/tb';
import { IoIosClose } from 'react-icons/io';
import eyes from '../../../assets/eyes.png';
import { ShareBalloon } from '../../ShareBalloon/ShareBalloon';
import { CommentManipulate } from '../../Comment/CommentManipulate';
import axios from 'axios';
import Mascot from '../../../assets/Mascot-removebg-preview.png';
import { validationCheck } from '../../Validation/Validation';

// 게시물 컴포넌트
const PostModal = () => {
    const {
        detailModalOn,
        setDetailModalOn,
        onePageData,
        setOnePageData,
        setSignal,
        signal,
        updateModal,
        setUpdateModal,
        updatePostId,
        setUpdatePostId,
    } = BoardStore();
    const [shareBalloon, setShareBalloon] = useState(false);
    const [commentsList, setCommentsList] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [token, setToken] = useState<string | null>('');
    const [liked, setLiked] = useState(false);
    const [disliked, setDisLiked] = useState(false);
    const [nickname, setNickname] = useState<string | null>('');

    // 렌더링시 토큰 등록 이펙트
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(JSON.parse(localStorage.getItem('token') || '')?.value);
        }
        setNickname(localStorage.getItem('nickname'));
    }, []);

    // 공유 버튼 모달 띄우기
    const share = () => {
        setShareBalloon(!shareBalloon);
    };

    // 댓글 작성 함수
    const postComment = async (postId: string | number) => {
        if (!JSON.parse(localStorage.getItem('token') || '')?.value) {
            alert('먼저 로그인 해주세요');
            return;
        }
        if (validationCheck()) {
            try {
                let res = await axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_API_KEY}/boardsAuth/createComment/${postId}`,
                    data: {
                        content: commentContent,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert('댓글작성 성공');
                let res2 = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
                });
                setOnePageData([res2.data]);

                setCommentContent('');
            } catch (e) {
                console.log(e);
            }
        }
    };

    // 좋아요 싫어요 현상태 데이터 요청
    const getLikeHateStatus = async () => {
        if (JSON.parse(localStorage.getItem('token') || '')?.value) {
            if (validationCheck()) {
                try {
                    let res = await axios({
                        method: 'get',
                        url: `${process.env.REACT_APP_API_KEY}/boardsAuth/getReaction?postId=${onePageData[0].postId}`,
                        headers: {
                            Authorization: `Bearer ${
                                JSON.parse(localStorage.getItem('token') || '')
                                    .value
                            }`,
                        },
                    });
                    setLiked(res.data.liked);
                    setDisLiked(res.data.disliked);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    };

    // 게시물 데이터 하나 받아왔을 때 기본 세팅
    useEffect(() => {
        if (onePageData.length > 0) {
            let newData = onePageData[0];
            for (let i = 0; i < newData.comments.length; i++) {
                newData.comments[i].childCommentsList = [];
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
            if (validationCheck()) {
                if (localStorage.getItem('token')) {
                    setToken(
                        JSON.parse(localStorage.getItem('token') || '').value,
                    );
                    getLikeHateStatus();
                }
                if (localStorage.getItem('nickname')) {
                    setNickname(localStorage.getItem('nickname'));
                }
            }
        }
    }, [onePageData]);

    // 게시글 삭제 요청
    const postDeletePost = async (postId: any) => {
        if (!JSON.parse(localStorage.getItem('token') || '')?.value) {
            alert('먼저 로그인 해주세요');
            return;
        }
        if (validationCheck()) {
            let confirmer = window.confirm('게시글을 삭제하시겠습니까?');
            try {
                if (confirmer) {
                    let res = await axios({
                        method: 'post',
                        url: `${process.env.REACT_APP_API_KEY}/boardsAuth/deletePost/${postId}`,
                        data: {},
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    alert('삭제되셨습니다');
                    setSignal(true);
                    setDetailModalOn(false);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    // 좋아요 눌렀을 때 함수
    const clickLike = async () => {
        if (!JSON.parse(localStorage.getItem('token') || '')?.value) {
            alert('먼저 로그인 해주세요');
            return;
        }
        if (validationCheck()) {
            try {
                let res = await axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_API_KEY}/boardsAuth/like`,
                    data: {
                        postId: onePageData[0].postId,
                        liked: true,
                        disliked: false,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                let copy = onePageData.slice(0);
                copy[0].likeCount = res.data.likes;
                setLiked(res.data.liked);
                setOnePageData(copy);
            } catch (e) {
                console.log(e);
            }
        }
    };

    // 싫어요 눌렀을 때 함수
    const clickHate = async () => {
        if (!JSON.parse(localStorage.getItem('token') || '')?.value) {
            alert('먼저 로그인 해주세요');
            return;
        }
        if (validationCheck()) {
            try {
                let res = await axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_API_KEY}/boardsAuth/dislike`,
                    data: {
                        postId: onePageData[0].postId,
                        liked: true,
                        disliked: false,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                let copy = onePageData.slice(0);
                copy[0].dislikeCount = res.data.dislikes;
                setDisLiked(res.data.disliked);
                setOnePageData(copy);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const postUpdateHandler = () => {
        if (validationCheck()) {
            setUpdatePostId(onePageData[0]?.postId);
            setUpdateModal(true);
        }
    };

    return (
        <ModalContainer>
            <DialogBox>
                <_closeButtonWrapper>
                    <_customCloser
                        onClick={() => {
                            setDetailModalOn(false);
                        }}
                    />
                </_closeButtonWrapper>
                <_content>
                    <_postTitle>{onePageData[0]?.title}</_postTitle>
                    <_rightSide>
                        <_writer>
                            <h4>{onePageData[0]?.user.nickname}</h4>
                            <div style={{ marginLeft: '5px' }}>
                                <_MascotPlacer
                                    src={onePageData[0]?.profileImg || Mascot}
                                ></_MascotPlacer>
                            </div>
                        </_writer>
                    </_rightSide>
                    <_dateLine>
                        <_date>
                            {onePageData[0]?.createdAt.slice(0, 10)}{' '}
                            {onePageData[0]?.createdAt.slice(11, 16)}{' '}
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
                                {onePageData[0]?.likeCount}
                            </span>{' '}
                        </_like>
                        <_share onClick={share}>
                            <CiShare2 />
                            {shareBalloon === true ? (
                                <ShareBalloon pageData={onePageData[0]} />
                            ) : null}
                        </_share>
                    </_dateLine>
                    {nickname == onePageData[0]?.user.nickname && (
                        <_dateLine>
                            <_recomment onClick={postUpdateHandler}>
                                수정
                            </_recomment>
                            <_recomment
                                onClick={() => {
                                    postDeletePost(onePageData[0]?.postId);
                                }}
                            >
                                삭제
                            </_recomment>
                        </_dateLine>
                    )}

                    <br></br>
                    <_realContent
                        dangerouslySetInnerHTML={{
                            __html: onePageData[0]?.content,
                        }}
                    ></_realContent>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}
                    >
                        {onePageData[0]?.hashtags.map((tag: any) => {
                            return <_eachTag>#{tag.hashtagName}</_eachTag>;
                        })}
                    </div>
                    <_likeLine>
                        <_likeBox
                            onClick={() => {
                                clickLike();
                            }}
                        >
                            {liked ? (
                                <TbHeartFilled
                                    style={{ color: 'red', fontSize: '36px' }}
                                />
                            ) : (
                                <TbHeart
                                    style={{ color: 'red', fontSize: '36px' }}
                                />
                            )}
                            <div style={{ color: 'red' }}>
                                {onePageData[0]?.likeCount}
                            </div>
                            <p style={{ margin: 0, padding: 0 }}>좋아요</p>
                        </_likeBox>
                        <_likeBox
                            onClick={() => {
                                clickHate();
                            }}
                        >
                            <TbHeartBroken style={{ fontSize: '36px' }} />
                            <div>{onePageData[0]?.dislikeCount}</div>
                            <p style={{ margin: 0, padding: 0 }}>싫어요</p>
                            <div></div>
                        </_likeBox>
                    </_likeLine>
                    {onePageData[0]?.commentAllowed == 'true' && (
                        <>
                            <h4>댓글 {onePageData[0]?.comments.length}</h4>
                            <_commentsList>
                                <hr></hr>
                                {commentsList.map(
                                    (comment: any, index: number) => {
                                        if (!comment.parentCommentId) {
                                            return (
                                                <CommentManipulate
                                                    comment={comment}
                                                    token={token}
                                                    index={index}
                                                />
                                            );
                                        }
                                    },
                                )}
                            </_commentsList>
                            {nickname && (
                                <_commentArea>
                                    <_commentWriter>
                                        {nickname}
                                        <_comment
                                            onClick={() => {
                                                postComment(
                                                    onePageData[0]?.postId,
                                                );
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
                                </_commentArea>
                            )}
                        </>
                    )}
                </_content>
            </DialogBox>
            <Backdrop
                onClick={() => {
                    setDetailModalOn(false);
                }}
            />
        </ModalContainer>
    );
};

const _closeButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
`;

const _customCloser = styled(IoIosClose)`
    cursor: pointer;
    font-size: 20px;
    margin-bottom: 10px;
`;

const _MascotPlacer = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
`;

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 4998;
`;

const DialogBox = styled.dialog`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 4999;
    margin-top: -100px;
`;

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 4997;
    background-color: rgba(0, 0, 0, 0.2);
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

const _eachTag = styled.p`
    color: #ccc;
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
    justify-content: center;
    margin: 0px 5px 0px 5px;
    cursor: pointer;
`;

const _content = styled.div`
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
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
`;

const _commentWriter = styled.div`
    width: 95%;
    padding: 5px;
    /* height: 25px; */
    display: flex;
    justify-content: space-between;
`;

const _commentContents = styled.textarea`
    border: 1px solid #ccc;
    width: 95%;
    height: 150px;
    resize: none;
    font-size: 16px;
    border-radius: 5px;
`;

const _realContent = styled.div`
    margin-bottom: 20px;
`;

const _commentsList = styled.div`
    width: 100%;
    margin-bottom: 20px;
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

const _postTitle = styled.h1`
    width: 100%;
    word-wrap: break-word;
    word-break: break-all;
`;

const _likeLine = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const _likeBox = styled.div`
    width: 80px;
    height: 80px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
    border-radius: 10px;
    cursor: pointer;
`;

const _modalArea = styled.div`
    position: absolute;
    width: 100%;
    height: 400px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    z-index: 9999;
`;

const _modal = styled.div`
    width: 70%;
    height: 400px;
    background-color: red;
`;

export { PostModal };
