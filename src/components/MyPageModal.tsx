import React, { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { User, UserData } from './data/User';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

interface MyPageModalProps extends PropsWithChildren<ModalDefaultType> {
    user: User;
}

function MyPageModal({ onClickToggleModal, children, user }: MyPageModalProps) {
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
                <_Title>MyPage</_Title>
                <_ProfileSection>
                    <_ProfileImg
                        src={user.profileImg || ''}
                        alt={user.nickname}
                    />
                    <_ProfileSpesific>
                        <_ProfileName>{user.nickname}</_ProfileName>
                        <div>{user.email}</div>
                    </_ProfileSpesific>
                </_ProfileSection>
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
`;

const _ProfileImg = styled.img`
    margin-top: 10px;
    width: 150px;
    border-radius: 100%;
`;
const _ProfileSection = styled.div`
    width: 600px;
    display: flex;
    justify-content: center;
`;
const _ProfileName = styled.div`
    font-size: 30px;
    font-family: sans-serif, 'Times New Roman', Times, serif;
    font-weight: 800;
`;
const _ProfileSpesific = styled.div`
    display: inline-block;
`;

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
`;

const DialogBox = styled.dialog`
    width: 800px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 10000;
`;

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { MyPageModal };
