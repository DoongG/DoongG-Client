import { styled } from 'styled-components';
import { CiShare2 } from 'react-icons/ci';
import { IoIosHeart } from 'react-icons/io';
import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { TbHeart } from 'react-icons/tb';
import { TbHeartBroken } from 'react-icons/tb';
import { IoCopyOutline } from 'react-icons/io5';
import { BoardStore } from '../store/storeT';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router';
import eyes from '../assets/eyes.png';
import axios from 'axios';

const PostDetail = () => {
    const location = useLocation();
    const { detailModalOn, setDetailModalOn, onePageData, setOnePageData } =
        BoardStore();
    const [recommentOn, setRecommentOn] = useState(false);
    const [targetComment, setTargerComment] = useState(-1);
    const [shareBalloon, setShareBalloon] = useState(false);
    const [copiedCheck, setCopiedCheck] = useState(false);
    const iscopied = useRef<any>(null);
    const getOnePage = async () => {
        console.log(location.pathname);
        let pathKey = location.pathname.split('/')[2];
        console.log(pathKey);
        let res = await axios({
            method: 'get',
            url: `http://localhost:8080/boards/${pathKey}`,
        });
        let page = res.data;
        console.log(res.data);
        setOnePageData([page]);
        return res.data;
    };
    useEffect(() => {
        getOnePage();
    }, []);

    const share = (id: number) => {
        setShareBalloon(!shareBalloon);
    };
    return (
        <_allArea>
            {onePageData.length > 0 && (
                <_content>
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
                                    src={onePageData[0]?.user?.profileImg}
                                ></img>
                            </div>
                        </_writer>
                    </_rightSide>
                    <_dateLine>
                        <_date>{onePageData[0]?.createdAt}</_date>
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
                                            `http://localhost:3000/board/${onePageData[0]?.postId}`,
                                        );
                                        setCopiedCheck(true);
                                        setTimeout(() => {
                                            setCopiedCheck(false);
                                        }, 3000);
                                    }}
                                >
                                    <div style={{ display: 'flex' }}>
                                        <p style={{ margin: '5px' }}>
                                            http://localhost:3000/board/
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
                            좋아요
                        </_likeBox>
                        <_likeBox>
                            <TbHeartBroken style={{ fontSize: '36px' }} />
                            싫어요
                        </_likeBox>
                    </_likeLine>
                    <h4>댓글 {onePageData[0]?.comments?.length}</h4>
                    <_commentsList>
                        <hr></hr>
                        {onePageData[0]?.comments?.map(
                            (x: any, index: number) => {
                                return (
                                    <div>
                                        <_oneComment>
                                            <_commentWriterLine>
                                                <_eachCommentWriter>
                                                    {x.writer}
                                                </_eachCommentWriter>
                                                <_option>
                                                    <_recomment
                                                        onClick={() => {
                                                            setTargerComment(
                                                                index,
                                                            );
                                                            setRecommentOn(
                                                                true,
                                                            );
                                                        }}
                                                    >
                                                        답글
                                                    </_recomment>
                                                    {/* 로그인기능완성되면 이 버튼은 댓글작성자 본인에게만 보임 */}
                                                    <_recomment>
                                                        삭제
                                                    </_recomment>
                                                </_option>
                                            </_commentWriterLine>
                                            <div>{x.content}</div>
                                            <div>{x.date}</div>
                                            {x.childCommentsList.map(
                                                (y: any) => {
                                                    return (
                                                        <_recommentList>
                                                            <MdSubdirectoryArrowRight />
                                                            <div>
                                                                <_commentWriterLine>
                                                                    <_eachCommentWriter>
                                                                        {
                                                                            y.writer
                                                                        }
                                                                    </_eachCommentWriter>
                                                                    로그인기능완성되면
                                                                    이 버튼은
                                                                    댓글작성자
                                                                    본인에게만
                                                                    보임
                                                                    <_recomment>
                                                                        삭제
                                                                    </_recomment>
                                                                </_commentWriterLine>
                                                                <div>
                                                                    {y.content}
                                                                </div>
                                                                <div>
                                                                    {y.date}
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
                                                    <_recommentBox placeholder="답글쓰기"></_recommentBox>
                                                    <button>작성</button>
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
                            },
                        )}
                    </_commentsList>
                    <_commentArea>
                        <_commentWriter>
                            여우님
                            <_comment>작성</_comment>
                        </_commentWriter>
                        <_commentContents></_commentContents>
                    </_commentArea>
                </_content>
            )}
        </_allArea>
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
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
    cursor: pointer;
`;

export { PostDetail };
