import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { BoardStore } from '../../store/storeT';
import axios from 'axios';
import { validationCheck } from '../Validation/Validation';

const CommentManipulate = (props: {
    comment: any;
    token: string | null;
    index: number;
}) => {
    const [token, setToken] = useState<string | null>('');
    const [nickname, setNickname] = useState<string | null>('');
    const [targetComment, setTargetComment] = useState(-1);
    const [recommentOn, setRecommentOn] = useState(false);
    const [recommentContent, setRecommentContent] = useState('');
    const [targetUpdateComment, setTargetUpdateComment] = useState(-1);
    const [commentUpdate, setCommentUpdate] = useState(false);
    const [commentUpdateContent, setCommentUpdateContent] = useState('');
    const { commenter, commentId, content, createdAt, childCommentsList } =
        props.comment;
    const { onePageData, setOnePageData } = BoardStore();

    const postUpdateComment = (commentId: any, content: any) => {
        setTargetUpdateComment(commentId);
        setCommentUpdate(!commentUpdate);
        setCommentUpdateContent(content);
    };

    const postDeleteComment = async (id: any, postId: any) => {
        if (!JSON.parse(localStorage.getItem('token') || '')?.value) {
            alert('로그인 된 상태가 아닙니다');
            return;
        }
        if (validationCheck()) {
            let confirmer = window.confirm('댓글을 삭제하시겠습니까?');
            if (confirmer) {
                await axios({
                    method: 'post',
                    url: `${process.env.REACT_APP_API_KEY}/boardsAuth/deleteComment/${id}`,
                    data: {},
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                let res2 = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
                });
                setOnePageData([res2.data]);
            }
        }
    };

    const postUpdateCommentSend = async (commentId: any, postId: any) => {
        if (!JSON.parse(localStorage.getItem('token') || '')?.value) {
            alert('로그인 된 상태가 아닙니다');
            return;
        }
        if (validationCheck()) {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_KEY}/boardsAuth/updateComment/${commentId}`,
                data: {
                    content: commentUpdateContent,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('수정되었습니다');
            let res2 = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
            });
            setCommentUpdate(!commentUpdate);
            setOnePageData([res2.data]);
        }
    };

    const postRecomment = async (commentId: any, postId: any) => {
        if (!JSON.parse(localStorage.getItem('token') || '')?.value) {
            alert('세션이 만료되었습니다');
            return;
        }
        if (validationCheck()) {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_KEY}/boardsAuth/replies/${commentId}`,
                data: {
                    content: recommentContent,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('대댓글작성 성공');
            let res2 = await axios({
                method: 'get',
                url: `${process.env.REACT_APP_API_KEY}/boards/posts/${postId}`,
            });
            setOnePageData([res2.data]);
            setRecommentOn(!recommentOn);
            setRecommentContent('');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(JSON.parse(localStorage.getItem('token') || '')?.value);
        }
        if (localStorage.getItem('nickname')) {
            setNickname(localStorage.getItem('nickname'));
        }
    }, []);

    return (
        <div>
            <_oneComment>
                <_commentWriterLine>
                    <_eachCommentWriter>
                        {commenter.nickname}
                    </_eachCommentWriter>
                    <_option>
                        {token && (
                            <_recomment
                                onClick={() => {
                                    setTargetComment(props.index);
                                    setRecommentOn(true);
                                }}
                            >
                                답글
                            </_recomment>
                        )}
                        {nickname == commenter.nickname && (
                            <>
                                <_recomment
                                    onClick={() => {
                                        postUpdateComment(commentId, content);
                                    }}
                                >
                                    수정
                                </_recomment>
                                <_recomment
                                    onClick={() => {
                                        postDeleteComment(
                                            commentId,
                                            onePageData[0]?.postId,
                                        );
                                    }}
                                >
                                    삭제
                                </_recomment>
                            </>
                        )}
                    </_option>
                </_commentWriterLine>
                {commentUpdate && targetUpdateComment == commentId ? (
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <_recommentBox
                            value={commentUpdateContent}
                            onChange={(e) => {
                                setCommentUpdateContent(e.target.value);
                            }}
                        ></_recommentBox>
                        <_templateButton
                            onClick={() => {
                                postUpdateCommentSend(
                                    commentId,
                                    onePageData[0]?.postId,
                                );
                            }}
                        >
                            수정
                        </_templateButton>
                    </div>
                ) : (
                    <div>{content}</div>
                )}
                <div>
                    {createdAt.slice(0, 10)} {createdAt.slice(11, 16)}{' '}
                </div>
                {childCommentsList.map((recomment: any) => {
                    return (
                        <_recommentList>
                            <MdSubdirectoryArrowRight />
                            <div
                                style={{
                                    marginLeft: '5px',
                                }}
                            >
                                <_commentWriterLine
                                    style={{ justifyContent: 'start' }}
                                >
                                    <_eachCommentWriter>
                                        {recomment.commenter.nickname}
                                    </_eachCommentWriter>
                                    {nickname ==
                                        recomment.commenter.nickname && (
                                        <div
                                            style={{
                                                display: 'flex',
                                            }}
                                        >
                                            <_recomment
                                                onClick={() => {
                                                    postUpdateComment(
                                                        recomment.commentId,
                                                        recomment?.content,
                                                    );
                                                }}
                                            >
                                                수정
                                            </_recomment>
                                            <_recomment
                                                onClick={() => {
                                                    postDeleteComment(
                                                        recomment.commentId,
                                                        onePageData[0]?.postId,
                                                    );
                                                }}
                                            >
                                                삭제
                                            </_recomment>
                                        </div>
                                    )}
                                </_commentWriterLine>
                                {commentUpdate &&
                                targetUpdateComment == recomment.commentId ? (
                                    <div
                                        style={{
                                            display: 'flex',
                                        }}
                                    >
                                        <_recommentBox
                                            value={commentUpdateContent}
                                            onChange={(e) => {
                                                setCommentUpdateContent(
                                                    e.target.value,
                                                );
                                            }}
                                        ></_recommentBox>
                                        <_templateButton
                                            onClick={() => {
                                                postUpdateCommentSend(
                                                    recomment.commentId,
                                                    onePageData[0]?.postId,
                                                );
                                            }}
                                        >
                                            수정
                                        </_templateButton>
                                    </div>
                                ) : (
                                    <div>{recomment.content}</div>
                                )}
                                <div>
                                    {recomment.createdAt.slice(0, 10)}{' '}
                                    {recomment.createdAt.slice(11, 16)}{' '}
                                </div>
                            </div>
                        </_recommentList>
                    );
                })}
                {recommentOn && props.index == targetComment ? (
                    <_recommentSet>
                        <MdSubdirectoryArrowRight />
                        <_recommentBox
                            value={recommentContent}
                            onChange={(e) => {
                                setRecommentContent(e.currentTarget.value);
                            }}
                            placeholder="답글쓰기"
                        ></_recommentBox>

                        <_templateButton
                            onClick={() => {
                                postRecomment(
                                    commentId,
                                    onePageData[0]?.postId,
                                );
                            }}
                        >
                            작성
                        </_templateButton>
                        <_templateButton
                            onClick={() => {
                                setRecommentOn(!recommentOn);
                            }}
                        >
                            취소
                        </_templateButton>
                    </_recommentSet>
                ) : null}
            </_oneComment>
            <hr></hr>
        </div>
    );
};

const _templateButton = styled.button`
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const _recommentList = styled.div`
    display: flex;
    margin: 5px;
`;

const _oneComment = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const _commentWriterLine = styled.div`
    display: flex;
    justify-content: space-between;
`;

const _eachCommentWriter = styled.div`
    font-weight: 600;
`;

const _option = styled.div`
    display: flex;
`;

const _recomment = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const _recommentBox = styled.textarea`
    width: 80%;
    min-height: 100px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-right: 10px;
    resize: none;
    font-size: 16px;
`;

const _recommentSet = styled.div`
    display: flex;
    margin: 5px;
`;

export { CommentManipulate };
