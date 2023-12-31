import React, { PropsWithChildren, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

function PasswordChangeModal({
    onClickToggleModal,
    children,
}: PropsWithChildren<ModalDefaultType>) {
    const [isModalOpen, setModalOpen] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [nickname, setNickname] = useState<string | null>('');

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setNickname(localStorage.getItem('nickname'));
    }, []);

    const modalClose = () => {
        setModalOpen(false);

        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };

    const handleChangePW = () => {
        if (newPassword !== newPasswordCheck) {
            setPasswordMatchError(true);
            return;
        }

        const requestData = {
            password: newPassword,
        };

        axios
            .post(
                `${process.env.REACT_APP_API_KEY}/userAuth/chPw`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then((response) => {
                const result = response.data;

                if (result) {
                    alert('성공');
                    window.location.replace('/');
                }
            })
            .catch((error) => {});
    };

    return (
        <ModalContainer>
            <DialogBox>
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>
                <_Title>비밀번호 변경</_Title>
                <_PasswordChangeForm>
                    <_FormTitle>새로운 비밀번호</_FormTitle>
                    <_CertificationForm>
                        <_FormInput
                            id="newPassword"
                            type="password"
                            placeholder="새로운 비밀번호를 입력하세요."
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </_CertificationForm>
                    <_FormTitle>새로운 비밀번호 확인</_FormTitle>
                    <_CertificationForm>
                        <_FormInput
                            id="newPasswordCheck"
                            type="password"
                            placeholder="비밀번호를 다시한번 입력하세요."
                            value={newPasswordCheck}
                            onChange={(e) =>
                                setNewPasswordCheck(e.target.value)
                            }
                        />
                    </_CertificationForm>
                    {passwordMatchError && (
                        <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
                    )}
                    <_ChangeButton onClick={handleChangePW}>
                        비밀번호 변경
                    </_ChangeButton>
                </_PasswordChangeForm>
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

const ErrorText = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;
const _ChangeButton = styled.button`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    width: 100%;
    height: 35px;
    margin-top: 20px;
    background-color: rgb(28, 57, 61);
    border: 2px solid rgb(28, 57, 61);
    color: white;
    border-radius: 5px;
    &:hover {
        color: rgb(255, 202, 29);
        cursor: pointer;
    }
`;

const _PasswordChangeForm = styled.div`
    margin-top: 10px;
    text-align: left;
    width: 80%;
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
const _CertificationForm = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
`;
const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10002 !important;
`;

const DialogBox = styled.dialog`
    width: 400px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 10002 !important;
`;

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 10001 !important;
    background-color: rgba(0, 0, 0, 0.2);
`;

const _FormTitle = styled.div`
    margin-bottom: 5px;
    color: rgb(28, 57, 61);
    font-weight: bold;
    margin-top: 10px;
`;
const _FormInput = styled.input`
    width: 100%;
    height: 35px;
    border: 2px solid rgb(28, 57, 61);
    border-radius: 5px;
    padding: 0 0 0 2%;
`;
export { PasswordChangeModal };
