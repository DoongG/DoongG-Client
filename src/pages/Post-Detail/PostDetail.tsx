import { styled } from 'styled-components';
import { CiShare2 } from 'react-icons/ci';
import { IoIosHeart } from 'react-icons/io';
import { TbHeart } from 'react-icons/tb';
import { TbHeartBroken } from 'react-icons/tb';
import { FaArrowRight } from 'react-icons/fa';
import { BoardStore } from '../../store/storeT';
import { useEffect, useState, useRef } from 'react';
import { ShareBalloon } from '../ShareBalloon/ShareBalloon';
import Mascot from '../../assets/Mascot-removebg-preview.png';
import { useLocation, useNavigate } from 'react-router';
import eyes from '../../assets/eyes.png';
import axios from 'axios';
import { Comment } from '../Comment/Comment';

// url로 접근해서 들어가는 페이지 컴포넌트
const PostDetail = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const { onePageData, setOnePageData } = BoardStore();
    const [shareBalloon, setShareBalloon] = useState(false);
    const [commentsList, setCommentsList] = useState([]);

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
        await axios({
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
    const share = () => {
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
                                <_MascotPlacer
                                    src={
                                        onePageData[0]?.user?.profileImg ||
                                        Mascot
                                    }
                                ></_MascotPlacer>
                            </div>
                        </_writer>
                    </_rightSide>
                    <_dateLine>
                        <_date>
                            {onePageData[0].createdAt.slice(0, 10)}{' '}
                            {onePageData[0].createdAt.slice(11, 16)}{' '}
                        </_date>
                        <_view>
                            <_eyesIcon src={eyes} />
                            {onePageData[0]?.views}
                        </_view>
                        <_like>
                            <span style={{ color: 'red' }}>
                                <IoIosHeart style={{ fontSize: '14px' }} />
                                {onePageData[0].likeCount}
                            </span>{' '}
                        </_like>
                        <_share onClick={share}>
                            <CiShare2 />
                            {shareBalloon === true ? (
                                <ShareBalloon pageData={onePageData[0]} />
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
                        {commentsList.map((comment: any) => {
                            if (!comment.parentCommentId) {
                                return <Comment comment={comment} />;
                            }
                        })}
                    </_commentsList>
                </_content>
            )}
        </_allArea>
    );
};

const _eyesIcon = styled.img`
    width: 15px;
    margin-right: 4px;
`;

const _MascotPlacer = styled.img`
    border-radius: 50%;
    width: 30px;
    height: 30px;
`;

const _moveToGallery = styled.div`
    margin-bottom: 20px;
    text-align: end;
    cursor: pointer;
`;

const _allArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const _dateLine = styled.div`
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

const _realContent = styled.div`
    margin-bottom: 20px;
`;

const _commentsList = styled.div`
    width: 100%;
    margin-bottom: 20px;
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
