import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

// Add a new interface for the data you want to pass
interface WhatIWriteProps extends PropsWithChildren<ModalDefaultType> {
    myPosts: { postId: number; title: string; content: string }[];
}

function WhatIWrite({
    onClickToggleModal,
    children,
    myPosts,
}: WhatIWriteProps) {
    const [isModalOpen, setModalOpen] = useState(true);
    const modalClose = () => {
        setModalOpen(false);

        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };

    return (
        <ModalContainer>
            <DialogBox>
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>
                <_Title>내가 쓴 글</_Title>
                {/* Render the data received from props */}
                <_MyPosts>
                    {myPosts.map((post) => (
                        <_EachPost key={post.postId}>
                            <_EachPostTitle>
                                <_EachPostTitleWrapper>
                                    {post.title}
                                </_EachPostTitleWrapper>
                            </_EachPostTitle>
                            <_EachPostContent>
                                <_EachPostContentWrapper
                                    dangerouslySetInnerHTML={{
                                        __html: post.content,
                                    }}
                                ></_EachPostContentWrapper>
                            </_EachPostContent>
                        </_EachPost>
                    ))}
                </_MyPosts>
            </DialogBox>
            <Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();

                    if (onClickToggleModal) {
                        onClickToggleModal();
                    }
                }}
            />
        </ModalContainer>
    );
}

const _EachPostContentWrapper = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

const _EachPostTitleWrapper = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

const _EachPostTitle = styled.div`
    text-align: start;
    display: flex;
    align-items: center;
    border-right: 10px solid #ffca1d;
    width: 20%;
`;

const _EachPostContent = styled.p`
    text-align: start;
    margin: 5px;
    width: 80%;
    p {
        margin: 0;
    }
`;

const _EachPost = styled.div`
    display: flex;
    /* justify-content: space-between; */
    margin: 5px;
    border: 5px solid #1c393d;
    border-radius: 5px;
`;

const _MyPosts = styled.div`
    width: 90%;
`;

// 모달 닫기 부분
const _ModalClose = styled.div`
    font-size: 20px;
    margin-left: auto;
    &:hover {
        cursor: pointer;
    }
`;
// 모달 Title부분
const _Title = styled.div`
    @font-face {
        font-family: 'MBC1961GulimM';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/MBC1961GulimM.woff2')
            format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'MBC1961GulimM';
    font-size: 30px;
    margin-top: -20px;
`;

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10003 !important;
`;

const DialogBox = styled.dialog`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 10003 !important;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 10002 !important;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { WhatIWrite };
