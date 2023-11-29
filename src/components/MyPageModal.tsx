import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { User } from './data/User';
import { PasswordChangeModal } from './PasswordChangeModal';
import originalImg from '../assets/Mascot.jpg';
import axios from 'axios';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

interface MyPageModalProps extends PropsWithChildren<ModalDefaultType> {
    user?: User;
}

function MyPageModal({ onClickToggleModal, children, user }: MyPageModalProps) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // 이 부분에서 로컬 스토리지에서 토큰을 가져와 상태로 관리합니다.
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);
    const [isModalOpen, setModalOpen] = useState(true);
    const [isPasswordChangeModalOpen, setPasswordChangeModalOpen] =
        useState(false);

    const [isEditingNickname, setEditingNickname] = useState(false);
    const [editedNickname, setEditedNickname] = useState(user?.nickname || '');

    const modalClose = () => {
        setModalOpen(false);

        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };
    // user가 undefined인 경우를 고려하여 코드 수정
    const _ProfileImgSrc = user ? user.profileImg || originalImg : '';
    const _ProfileEmailText = user ? user.email : '';

    // s3 업로드후 로딩 하는 로직
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const requestData = {};
    };

    const handleNicknameClick = () => {
        setEditingNickname(true);
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedNickname(e.target.value);
    };

    const handleNicknameSubmit = async () => {
        setEditingNickname(false);

        const requestData = {
            nickname: editedNickname,
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/userAuth/chNick',
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            const result = response.data;

            if (result) {
                alert('성공적으로 닉네임이 변경되었습니다~^^');
                setEditedNickname(requestData.nickname);
            }
        } catch (error) {
            console.log(error);
        }
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
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>
                <_Title>MyPage</_Title>
                <_ProfileSection>
                    <_ImgSection>
                        <_ProfileImg
                            src={_ProfileImgSrc}
                            alt={user ? user.nickname : ''}
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
                        <_ProfileEmail>{_ProfileEmailText}</_ProfileEmail>
                        {isEditingNickname ? (
                            <_ChangeSection>
                                <form onSubmit={handleNicknameSubmit}>
                                    <_NewNicknameInput
                                        type="text"
                                        value={editedNickname}
                                        onChange={handleNicknameChange}
                                    />
                                    <EditButton>수정</EditButton>
                                </form>
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
                <_ButtonHouse>
                    <_StyledButton2>내가 쓴 게시물</_StyledButton2>
                    <_StyledButton2>좋아요</_StyledButton2>
                    <_StyledButton2>자취방 리뷰</_StyledButton2>
                    <_StyledButton2>장바구니</_StyledButton2>
                    <_StyledButton2>주문내역</_StyledButton2>
                </_ButtonHouse>
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
const _ButtonHouse = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 150px;
    margin-top: 20px;
    justify-content: center;
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
const _StyledButton2 = styled.a`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    display: flex;
    font-size: 15px;
    margin: 15px 20px;
    padding: 5px 15px;
    background-color: rgb(28, 57, 61);
    border: 2px solid rgb(28, 57, 61);
    color: white;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    &:hover {
        color: rgb(255, 202, 29);
        cursor: pointer;
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
    border: 2px black solid;
    border-radius: 100%;
`;
const _ProfileSection = styled.div`
    justify-content: space-around;
    width: 400px;
    display: flex;
    align-items: center;
    text-align: left;
    background-color: rgb(28, 57, 61);
    border: 2px solid rgb(28, 57, 61);
    color: white;
    border-radius: 10px;
    padding-bottom: 5px;
`;
const _ProfileName = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    font-size: 15px;
    margin-bottom: 20px;
`;
const _ProfileEmail = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    font-size: 14px;
    margin-bottom: 5px;
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
        @font-face {
            font-family: 'JalnanGothic';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
                format('woff');
            font-weight: normal;
            font-style: normal;
        }
        font-family: 'JalnanGothic';
        display: inline-block;
        width: 140px;
        padding: 5px;
        background-color: none;
        color: black;
        cursor: pointer;
    }

    &:hover {
        background-color: none;
        cursor: pointer;
    }
`;

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 600px;
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
