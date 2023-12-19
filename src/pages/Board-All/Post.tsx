import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BoardStore } from '../../store/storeT';
import { EachPost } from '../Type/Type';
import { useEffect } from 'react';

const Post = (props: { post: EachPost; boardName: string }) => {
    const { postId, title, createdAt } = props.post;
    const boardName = props.boardName;
    const { setModalSignal } = BoardStore();
    const navigate = useNavigate();

    // 통합게시판에서 특정 게시물 하나로 들어가는 함수
    const goToOnePage = async (id: string, postId: number) => {
        setModalSignal(postId);
        navigate(`/board/${id}`);
    };

    return (
        <_eachPostWrapper>
            <_eachPost
                onClick={(e) => {
                    goToOnePage(boardName, postId);
                }}
            >
                <_titleWrapper>{title}</_titleWrapper>
                <_dateWrapper>
                    {createdAt?.slice(0, 10)} {createdAt?.slice(11, 16)}{' '}
                </_dateWrapper>
            </_eachPost>
        </_eachPostWrapper>
    );
};

const _eachPostWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const _eachPost = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    padding: 5px;
    cursor: pointer;
`;

const _titleWrapper = styled.div`
    min-width: 140px;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const _dateWrapper = styled.div`
    min-width: 128px;
`;

export default Post;
