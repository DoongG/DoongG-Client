import { BoardStore } from '../store/storeT';
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
import eyes from '../assets/eyes.png';
import axios from 'axios';
import Mascot from '../assets/Mascot-removebg-preview.png';

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
    const [recommentOn, setRecommentOn] = useState(false);
    const [targetComment, setTargetComment] = useState(-1);
    const [targetUpdateComment, setTargetUpdateComment] = useState(-1);
    const [shareBalloon, setShareBalloon] = useState(false);
    const [copiedCheck, setCopiedCheck] = useState(false);
    const [commentsList, setCommentsList] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [recommentContent, setRecommentContent] = useState('');
    const [commentUpdate, setCommentUpdate] = useState(false);
    const [commentUpdateContent, setCommentUpdateContent] = useState('');
    const [token, setToken] = useState<string | null>('');
    const [liked, setLiked] = useState(false);
    const [disliked, setDisLiked] = useState(false);
    const [nickname, setNickname] = useState<string | null>('');

    // 렌더링시 토큰 등록 이펙트
    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setNickname(localStorage.getItem('nickname'));
    }, []);

    // 공유 버튼 모달 띄우기
    const share = (id: number) => {
        setShareBalloon(!shareBalloon);
    };

    // 댓글 작성 함수
    const postComment = async (postId: any) => {
        if (!localStorage.getItem('token')) {
            alert('세션이 만료되었습니다');
            return;
        }
        let res = await axios({
            method: 'post',
            // url: `${process.env.REACT_APP_API_KEY}/boardsAuth/createComment/${postId}`,
            url: `${process.env.REACT_APP_API_KEY}/boardsAuth/createComment/${postId}`,
            data: {
                // commenterId: 1,
                //이거 로그인이랑 연동하면 수정
                content: commentContent,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        alert('댓글작성 성공');
        let res2 = await axios({
            method: 'get',
            // url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
        });
        setOnePageData([res2.data]);

        setCommentContent('');
    };

    // 대댓글 작성
    const postRecomment = async (commentId: any, postId: any) => {
        if (!localStorage.getItem('token')) {
            alert('세션이 만료되었습니다');
            return;
        }
        let res = await axios({
            method: 'post',
            // url: `${process.env.REACT_APP_API_KEY}/boardsAuth/replies/${commentId}`,
            url: `${process.env.REACT_APP_API_KEY}/boardsAuth/replies/${commentId}`,
            data: {
                // commenterId: 1,
                //이거 로그인이랑 연동하면 수정
                content: recommentContent,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        alert('대댓글작성 성공');
        let res2 = await axios({
            method: 'get',
            // url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
        });
        setOnePageData([res2.data]);
        setRecommentOn(!recommentOn);
        setRecommentContent('');
    };

    // 좋아요 싫어요 현상태 데이터 요청
    const getLikeHateStatus = async () => {
        if (localStorage.getItem('token')) {
            try {
                let res = await axios({
                    method: 'get',
                    // url: `${process.env.REACT_APP_API_KEY}/boardsAuth/getReaction?postId=${onePageData[0].postId}`, // 이거 수정해야함
                    url: `${process.env.REACT_APP_API_KEY}/boardsAuth/getReaction?postId=${onePageData[0].postId}`, // 이거 수정해야함
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token',
                        )}`,
                    },
                });
                setLiked(res.data.liked);
                setDisLiked(res.data.disliked);
            } catch (e) {}
            setDetailModalOn(true);
        }
    };

    // 게시물 데이터 하나 받아왔을 때 기본 세팅
    useEffect(() => {
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
        setToken(localStorage.getItem('token'));
        setNickname(localStorage.getItem('nickname'));
        // getLikeHateStatus();
        // setDetailModalOn(true);
    }, [onePageData]);

    useEffect(() => {
        getLikeHateStatus();
    }, [token]);

    // 댓글 삭제 요청
    const postDeleteComment = async (id: any, postId: any) => {
        if (!localStorage.getItem('token')) {
            alert('로그인 된 상태가 아닙니다');
            return;
        }
        let confirmer = window.confirm('댓글을 삭제하시겠습니까?');
        if (confirmer) {
            let res = await axios({
                method: 'post',
                // url: `${process.env.REACT_APP_API_KEY}/boardsAuth/deleteComment/${id}`,
                url: `${process.env.REACT_APP_API_KEY}/boardsAuth/deleteComment/${id}`,
                data: {},
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            let res2 = await axios({
                method: 'get',
                // url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
                url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
            });
            setOnePageData([res2.data]);
        }
    };

    // 댓글 수정 창 띄우기
    const postUpdateComment = (commentId: any, content: any) => {
        setTargetUpdateComment(commentId);
        setCommentUpdate(!commentUpdate);
        setCommentUpdateContent(content);
    };

    // 댓글 수정 요청
    const postUpdateCommentSend = async (
        commentId: any,
        commenterId: any,
        postId: any,
    ) => {
        if (!localStorage.getItem('token')) {
            alert('로그인 된 상태가 아닙니다');
            return;
        }
        let res = await axios({
            method: 'post',
            // url: `${process.env.REACT_APP_API_KEY}/boardsAuth/updateComment/${commentId}`,
            url: `${process.env.REACT_APP_API_KEY}/boardsAuth/updateComment/${commentId}`,
            data: {
                // commenterId: commenterId,
                content: commentUpdateContent,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        alert('수정되었습니다');
        let res2 = await axios({
            method: 'get',
            // url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
        });
        setCommentUpdate(!commentUpdate);
        setOnePageData([res2.data]);
    };

    // 게시글 삭제 요청
    const postDeletePost = async (postId: any) => {
        if (!localStorage.getItem('token')) {
            alert('로그인 된 상태가 아닙니다');
            return;
        }
        let confirmer = window.confirm('게시글을 삭제하시겠습니까?');
        if (confirmer) {
            let res = await axios({
                method: 'post',
                // url: `${process.env.REACT_APP_API_KEY}/boardsAuth/deletePost/${postId}`,
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
    };

    // 좋아요 눌렀을 때 함수
    const clickLike = async () => {
        if (!localStorage.getItem('token')) {
            alert('로그인 상태에서만 가능합니다');
            return;
        }
        let res = await axios({
            method: 'post',
            // url: `${process.env.REACT_APP_API_KEY}/boardsAuth/like`,
            url: `${process.env.REACT_APP_API_KEY}/boardsAuth/like`,
            data: {
                postId: onePageData[0].postId,
                // userId: 1, // 수정해야함
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
    };

    // 싫어요 눌렀을 때 함수
    const clickHate = async () => {
        if (!localStorage.getItem('token')) {
            alert('로그인 상태에서만 가능합니다');
            return;
        }
        let res = await axios({
            method: 'post',
            // url: `${process.env.REACT_APP_API_KEY}/boardsAuth/dislike`,
            url: `${process.env.REACT_APP_API_KEY}/boardsAuth/dislike`,
            data: {
                postId: onePageData[0].postId,
                // userId: 1, // 수정해야함
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
    };

    return (
        <ModalContainer>
            <DialogBox>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <IoIosClose
                        style={{
                            cursor: 'pointer',
                            fontSize: '20px',
                            marginBottom: '10px',
                        }}
                        onClick={() => {
                            setDetailModalOn(false);
                        }}
                    />
                </div>
                <_content>
                    <_postTitle>{onePageData[0].title}</_postTitle>
                    <_rightSide>
                        <_writer>
                            <h4>{onePageData[0].user.nickname}</h4>
                            <div style={{ marginLeft: '5px' }}>
                                <img
                                    style={{
                                        borderRadius: '50%',
                                        width: '30px',
                                        height: '30px',
                                    }}
                                    src={onePageData[0].profileImg || Mascot}
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
                            {onePageData[0].views}
                        </_view>
                        <_like>
                            <span style={{ color: 'red' }}>
                                <IoIosHeart style={{ fontSize: '14px' }} />
                                {onePageData[0].likeCount}
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
                                            `http://doongg.site/posts/${onePageData[0]?.postId}`,
                                        );
                                        setCopiedCheck(true);
                                        setTimeout(() => {
                                            setCopiedCheck(false);
                                        }, 3000);
                                    }}
                                >
                                    <div style={{ display: 'flex' }}>
                                        <p style={{ margin: '5px' }}>
                                            http://doongg.site/posts/
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
                    {nickname == onePageData[0].user.nickname && (
                        <_dateLine>
                            <_recomment
                                onClick={() => {
                                    setUpdatePostId(onePageData[0]?.postId);
                                    setUpdateModal(true);
                                }}
                            >
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
                        {onePageData[0].hashtags.map((tag: any) => {
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
                    {onePageData[0].commentAllowed == 'true' && (
                        <>
                            <h4>댓글 {onePageData[0]?.comments.length}</h4>
                            <_commentsList>
                                <hr></hr>
                                {commentsList.map((x: any, index: number) => {
                                    if (!x.parentCommentId) {
                                        return (
                                            <div>
                                                <_oneComment>
                                                    <_commentWriterLine>
                                                        <_eachCommentWriter>
                                                            {
                                                                x.commenter
                                                                    .nickname
                                                            }
                                                        </_eachCommentWriter>
                                                        <_option>
                                                            {token && (
                                                                <_recomment
                                                                    onClick={() => {
                                                                        setTargetComment(
                                                                            index,
                                                                        );
                                                                        setRecommentOn(
                                                                            true,
                                                                        );
                                                                    }}
                                                                >
                                                                    답글
                                                                </_recomment>
                                                            )}
                                                            {nickname ==
                                                                x.commenter
                                                                    .nickname && (
                                                                <>
                                                                    <_recomment
                                                                        onClick={() => {
                                                                            postUpdateComment(
                                                                                x.commentId,
                                                                                x?.content,
                                                                            );
                                                                        }}
                                                                    >
                                                                        수정
                                                                    </_recomment>
                                                                    <_recomment
                                                                        onClick={() => {
                                                                            postDeleteComment(
                                                                                x.commentId,
                                                                                onePageData[0]
                                                                                    ?.postId,
                                                                            );
                                                                        }}
                                                                    >
                                                                        삭제
                                                                    </_recomment>
                                                                </>
                                                            )}
                                                        </_option>
                                                    </_commentWriterLine>
                                                    {commentUpdate &&
                                                    targetUpdateComment ==
                                                        x.commentId ? (
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                            }}
                                                        >
                                                            <_recommentBox
                                                                value={
                                                                    commentUpdateContent
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    setCommentUpdateContent(
                                                                        e.target
                                                                            .value,
                                                                    );
                                                                }}
                                                            ></_recommentBox>
                                                            <button
                                                                onClick={() => {
                                                                    postUpdateCommentSend(
                                                                        x.commentId,
                                                                        x
                                                                            .commenter
                                                                            .id,
                                                                        onePageData[0]
                                                                            ?.postId,
                                                                    );
                                                                }}
                                                            >
                                                                수정
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div>{x?.content}</div>
                                                    )}
                                                    <div>
                                                        {x.createdAt.slice(
                                                            0,
                                                            10,
                                                        )}{' '}
                                                        {x.createdAt.slice(
                                                            11,
                                                            16,
                                                        )}{' '}
                                                    </div>
                                                    {x.childCommentsList.map(
                                                        (y: any) => {
                                                            return (
                                                                <_recommentList>
                                                                    <MdSubdirectoryArrowRight />
                                                                    <div
                                                                        style={{
                                                                            marginLeft:
                                                                                '5px',
                                                                        }}
                                                                    >
                                                                        <_commentWriterLine2>
                                                                            <_eachCommentWriter>
                                                                                {
                                                                                    y
                                                                                        .commenter
                                                                                        .nickname
                                                                                }
                                                                            </_eachCommentWriter>
                                                                            {nickname ==
                                                                                y
                                                                                    .commenter
                                                                                    .nickname && (
                                                                                <div
                                                                                    style={{
                                                                                        display:
                                                                                            'flex',
                                                                                    }}
                                                                                >
                                                                                    <_recomment
                                                                                        onClick={() => {
                                                                                            postUpdateComment(
                                                                                                y.commentId,
                                                                                                y?.content,
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        수정
                                                                                    </_recomment>
                                                                                    <_recomment
                                                                                        onClick={() => {
                                                                                            postDeleteComment(
                                                                                                y.commentId,
                                                                                                onePageData[0]
                                                                                                    ?.postId,
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        삭제
                                                                                    </_recomment>
                                                                                </div>
                                                                            )}
                                                                        </_commentWriterLine2>
                                                                        {commentUpdate &&
                                                                        targetUpdateComment ==
                                                                            y.commentId ? (
                                                                            <div
                                                                                style={{
                                                                                    display:
                                                                                        'flex',
                                                                                }}
                                                                            >
                                                                                <_recommentBox
                                                                                    value={
                                                                                        commentUpdateContent
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                    ) => {
                                                                                        setCommentUpdateContent(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        );
                                                                                    }}
                                                                                ></_recommentBox>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        postUpdateCommentSend(
                                                                                            y.commentId,
                                                                                            y
                                                                                                .commenter
                                                                                                .id,
                                                                                            onePageData[0]
                                                                                                ?.postId,
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    수정
                                                                                </button>
                                                                            </div>
                                                                        ) : (
                                                                            <div>
                                                                                {
                                                                                    y.content
                                                                                }
                                                                            </div>
                                                                        )}
                                                                        <div>
                                                                            {y.createdAt.slice(
                                                                                0,
                                                                                10,
                                                                            )}{' '}
                                                                            {y.createdAt.slice(
                                                                                11,
                                                                                16,
                                                                            )}{' '}
                                                                        </div>
                                                                    </div>
                                                                </_recommentList>
                                                            );
                                                        },
                                                    )}
                                                    {recommentOn &&
                                                    index == targetComment ? (
                                                        <_recommentSet>
                                                            <MdSubdirectoryArrowRight />
                                                            <_recommentBox
                                                                value={
                                                                    recommentContent
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    setRecommentContent(
                                                                        e
                                                                            .currentTarget
                                                                            .value,
                                                                    );
                                                                }}
                                                                placeholder="답글쓰기"
                                                            ></_recommentBox>
                                                            <button
                                                                onClick={() => {
                                                                    postRecomment(
                                                                        x.commentId,
                                                                        onePageData[0]
                                                                            ?.postId,
                                                                    );
                                                                }}
                                                            >
                                                                작성
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setRecommentOn(
                                                                        !recommentOn,
                                                                    );
                                                                }}
                                                            >
                                                                취소
                                                            </button>
                                                        </_recommentSet>
                                                    ) : null}
                                                </_oneComment>
                                                <hr></hr>
                                            </div>
                                        );
                                    }
                                })}
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
                    // setSignal(!signal);
                    setDetailModalOn(false);
                }}
            />
        </ModalContainer>
    );
};

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
    display: flex;
    flex-direction: column;
    /* margin-top: 50px; */
    font-size: 10px;
    background-color: #ffe066;
    color: #333;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    top: 25px;
    right: 1px;
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

const _eachTag = styled.p`
    color: #ccc;
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

export { PostModal };
