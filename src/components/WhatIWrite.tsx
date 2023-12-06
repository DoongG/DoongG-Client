import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Post {
    postId: number;
    title: string;
    content: string;
}

interface ModalDefaultType {
    onClickToggleModal: () => void;
    posts: Post[];
}

function WhatIWrite({
    onClickToggleModal,
    children,
    posts,
}: PropsWithChildren<ModalDefaultType>) {
    const [isModalOpen, setModalOpen] = useState(true);
    const modalClose = () => {
        setModalOpen(false);

        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        // 이 부분에서 로컬 스토리지에서 토큰을 가져와 상태로 관리합니다.
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);
    useEffect(() => {
        console.log('게시물:', posts); // 여기에서 게시물 데이터 사용
    }, [posts]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <ModalContainer>
            <DialogBox>
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>
                <_Title>내가 쓴 글</_Title>
                <Slider {...settings}>
                    {posts.map((post) => (
                        <PostSlide key={post.postId}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </PostSlide>
                    ))}
                </Slider>
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

const PostSlide = styled.div`
    padding: 20px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
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
    width: 800px;
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
