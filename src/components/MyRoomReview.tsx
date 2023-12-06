import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}
interface MyRoomReviewProps extends PropsWithChildren<ModalDefaultType> {
    myRoomReviewData: any[]; // 데이터를 받을 prop 추가
}

function MyRoomReview({
    onClickToggleModal,
    children,
    myRoomReviewData,
}: MyRoomReviewProps) {
    console.log('asfasdf', myRoomReviewData);
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
    return (
        <ModalContainer>
            <DialogBox>
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>
                <_Title>내가 쓴 리뷰</_Title>
                {myRoomReviewData.map((review) => (
                    <_MyReview key={review.id}>
                        <_Address>주소: {review.address}</_Address>
                        <_Content>후기: {review.content}</_Content>
                    </_MyReview>
                ))}
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
const _MyReview = styled.div`
    text-align: left;
    padding: 15px;
    width: 400px;
    margin: 10px 0;
    border: 2px solid rgb(28, 57, 61);
    border-radius: 8px;
    background-color: #f9f9f9;
`;

const _Address = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';

    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
`;

const _Content = styled.div`
    font-size: 14px;
    color: #555;
    word-wrap: break-word; /* 긴 단어나 텍스트를 적절하게 줄바꿈 */
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
    width: 500px;
    height: 600px;
    overflow-y: auto; // 세로 스크롤이 필요할 때만 표시
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 10px; // 더 둥근 테두리
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.2); // 더 부드러운 그림자
    box-sizing: border-box;
    background-color: #f5f5f5; // 변경된 배경색
    z-index: 10003 !important;
    transition: all 0.3s ease-in-out; // 모달 애니메이션 효과 추가
`;

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 10002 !important;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { MyRoomReview };
