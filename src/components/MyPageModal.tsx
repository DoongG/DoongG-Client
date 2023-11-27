import React, { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { User } from './data/User';
import { PasswordChangeModal } from './PasswordChangeModal';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

interface MyPageModalProps extends PropsWithChildren<ModalDefaultType> {
    user: User;
}

function MyPageModal({ onClickToggleModal, children, user }: MyPageModalProps) {
    const [isModalOpen, setModalOpen] = useState(true);
    const [isPasswordChangeModalOpen, setPasswordChangeModalOpen] =
        useState(false);

    const [isEditingNickname, setEditingNickname] = useState(false);
    const [editedNickname, setEditedNickname] = useState(user.nickname);

    const modalClose = () => {
        setModalOpen(false);

        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 이미지 업로드 로직을 처리합니다.
        // 필요한 경우 FileReader를 사용하여 선택한 이미지를 미리보기할 수 있습니다.
    };

    const handleNicknameClick = () => {
        setEditingNickname(true);
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedNickname(e.target.value);
    };

    const handleNicknameBlur = () => {
        setEditingNickname(false);
        // 여기에서 수정된 닉네임을 저장
    };
    const handleNicknameSubmit = () => {
        // 여기에서 수정된 닉네임을 처리
    };

    const openPasswordChangeModal = () => {
        setPasswordChangeModalOpen(true);
    };

    const closePasswordChangeModal = () => {
        setPasswordChangeModalOpen(false);
    };

    return (
        <ModalContainer>
            <DialogBox>
                <_SecondDialogBox>
                    <_ModalClose>
                        <AiOutlineClose onClick={modalClose} />
                    </_ModalClose>
                    <_Title>MyPage</_Title>
                    <_ProfileSection>
                        <_ImgSection>
                            <_ProfileImg
                                src={user.profileImg || ''}
                                alt={user.nickname}
                            />
                            <ImageUploadButton>
                                <label htmlFor="imageUpload">편집</label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </ImageUploadButton>
                        </_ImgSection>
                        <_ProfileSpesific>
                            <_ProfileEmail>{user.email}</_ProfileEmail>
                            {isEditingNickname ? (
                                <_ChangeSection>
                                    <_NewNicknameInput
                                        type="text"
                                        value={editedNickname}
                                        onChange={handleNicknameChange}
                                        onBlur={handleNicknameBlur}
                                    />
                                    <EditButton onClick={handleNicknameSubmit}>
                                        수정
                                    </EditButton>
                                </_ChangeSection>
                            ) : (
                                <_ProfileName onClick={handleNicknameClick}>
                                    {editedNickname}
                                </_ProfileName>
                            )}
                            {/* <button>비밀번호 변경</button> */}
                            <_StyledButton onClick={openPasswordChangeModal}>
                                비밀번호 변경
                            </_StyledButton>
                        </_ProfileSpesific>
                    </_ProfileSection>
                </_SecondDialogBox>
            </DialogBox>
            <Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();

                    if (onClickToggleModal) {
                        onClickToggleModal();
                    }
                }}
            />
            {isPasswordChangeModalOpen && (
                <PasswordChangeModal
                    onClickToggleModal={closePasswordChangeModal}
                />
            )}
        </ModalContainer>
    );
}
const _SecondDialogBox = styled.div`
    width: 460px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid purple;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: #daddb1;
`;
const _StyledButton = styled.a`
    position: relative;
    display: inline-block;
    font-size: 18px;
    padding: 5px 15px;
    color: white;
    border-radius: 6px;
    text-align: center;
    transition: top 0.01s linear;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
    background-color: #82c8a0;
    text-decoration: none;
    box-shadow: 0 0 0 1px #82c8a0 inset,
        0 0 0 2px rgba(255, 255, 255, 0.15) inset,
        0 8px 0 0 rgba(126, 194, 155, 0.7), 0 8px 0 1px rgba(0, 0, 0, 0.4),
        0 8px 8px 1px rgba(0, 0, 0, 0.5);

    &:hover {
        background-color: #80c49d;
        cursor: pointer;
    }

    &:active {
        top: 9px;
        box-shadow: 0 0 0 1px #82c8a0 inset,
            0 0 0 2px rgba(255, 255, 255, 0.15) inset,
            0 0 0 1px rgba(0, 0, 0, 0.4);
    }
`;
const _ChangeSection = styled.div``;

const _NewNicknameInput = styled.input`
    width: 100px;
`;
const EditableNickname = styled.span`
    font-size: 20px;
    font-family: sans-serif, 'Times New Roman', Times, serif;
    font-weight: 800;
    cursor: pointer;
    display: inline-block;
`;

const EditButton = styled.button`
    cursor: pointer;
`;
const _ImgSection = styled.div``;
// 모달 닫기 부분
const _ModalClose = styled.div`
    font-size: 20px;
    margin-left: auto;
    margin-right: 5px;
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
    margin-top: -10px;
`;

const _ProfileImg = styled.img`
    margin-top: 10px;
    width: 150px;
    border-radius: 100%;
`;
const _ProfileSection = styled.div`
    justify-content: space-around;
    width: 400px;
    display: flex;
    align-items: center;
    text-align: left;
    background-color: white;
    border: 2px solid purple;
    border-radius: 10px;
    padding-bottom: 5px;
`;
const _ProfileName = styled.div`
    font-size: 20px;
    font-family: sans-serif, 'Times New Roman', Times, serif;
    font-weight: 800;
`;
const _ProfileEmail = styled.div`
    font-size: 16px;
    margin-top: 5px;
`;
const _ProfileSpesific = styled.div`
    display: inline-block;
`;

const ImageUploadButton = styled.div`
    position: absolute;
    top: 0;
    left: 29%;
    transform: translateX(-50%);
    margin-top: 210px;
    text-align: center;

    label {
        display: inline-block;
        width: 140px;
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.3);
        color: black;
        cursor: pointer;
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
    }
`;

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-top: -100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1000;
`;

const DialogBox = styled.dialog`
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 1000;
`;

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 900;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { MyPageModal };
