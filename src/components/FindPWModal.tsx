import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
let authNum: string;
let Email: string;

interface ModalDefaultType {
    onClickToggleModal: () => void;
    children?: React.ReactNode;
}

enum ModalStep {
    EmailInput,
    Verification,
    PasswordChange,
}

function FindPWModal({ onClickToggleModal }: ModalDefaultType) {
    const [isModalOpen, setModalOpen] = useState(true);
    const [step, setStep] = useState(ModalStep.EmailInput);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const modalClose = () => {
        setModalOpen(false);

        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };

    const handleEmailVerification = () => {
        // 여기에서 이메일이 존재하는지 확인하고,
        // 존재한다면 인증 단계로 이동
        Email = email;
        const requestData = {
            email,
        };
        axios
            .post(
                '${process.env.REACT_APP_API_KEY}/user/emailAuth',
                requestData,
            )
            .then((response) => {
                const result = response.data;
                console.log(result);
                if (!result) {
                    alert('존재하지 않는 이메일입니다.');
                } else {
                    setStep(ModalStep.Verification);
                    alert('인증번호가 전송되었습니다');
                    authNum = result;
                }
            });
    };

    const handleVerificationCheck = () => {
        // 여기에서 입력한 인증번호가 맞는지 확인하고,
        // 맞다면 비밀번호 변경 단계로 이동
        if (verificationCode == authNum) {
            alert('인증 성공');
            setStep(ModalStep.PasswordChange);
        } else {
            // 인증번호가 일치하지 않는 경우에 대한 처리
            alert('인증번호가 일치하지 않습니다.');
        }
    };

    const handlePasswordChange = () => {
        // 여기에서 새로운 비밀번호로 변경하는 로직을 구현
        const requestData = {
            email: Email,
            password: newPassword,
        };

        axios
            .post('${process.env.REACT_APP_API_KEY}/user/resetPw', requestData)
            .then((response) => {
                const result = response.data;

                if (result) {
                    alert('비밀번호가 변경되었습니다.');
                } else {
                    alert('오류');
                }
            });
        modalClose();
    };

    return (
        <ModalContainer>
            <DialogBox>
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>
                <_Title>비밀번호 변경</_Title>
                {step === ModalStep.EmailInput && (
                    <_FindIDForm>
                        <_FormTitle>이메일</_FormTitle>
                        <_CertificationForm>
                            <_FormInput
                                type="email"
                                placeholder="email@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <_VerifyButton onClick={handleEmailVerification}>
                                인증
                            </_VerifyButton>
                        </_CertificationForm>
                    </_FindIDForm>
                )}
                {step === ModalStep.Verification && (
                    <_FindIDForm>
                        <_FormTitle>인증번호</_FormTitle>
                        <_CertificationForm>
                            <_FormInput
                                type="text"
                                placeholder="인증번호 입력"
                                value={verificationCode}
                                onChange={(e) =>
                                    setVerificationCode(e.target.value)
                                }
                            />
                            <_VerifyButton onClick={handleVerificationCheck}>
                                확인
                            </_VerifyButton>
                        </_CertificationForm>
                    </_FindIDForm>
                )}
                {step === ModalStep.PasswordChange && (
                    <_FindIDForm>
                        <_FormTitle>새로운 비밀번호</_FormTitle>
                        <_CertificationForm>
                            <_FormInput
                                type="password"
                                placeholder="새로운 비밀번호 입력"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <_VerifyButton onClick={handlePasswordChange}>
                                변경
                            </_VerifyButton>
                        </_CertificationForm>
                    </_FindIDForm>
                )}
            </DialogBox>
            <Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    modalClose();
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
const _FindIDForm = styled.div`
    margin-top: 10px;
    text-align: left;
    width: 80%;
`;
const _FormTitle = styled.div`
    margin-bottom: 5px;
    color: rgb(28, 57, 61);
    font-weight: bold;
    margin-top: 10px;
`;
const _FormInput = styled.input`
    width: 96.5%;
    height: 35px;
    border: 2px solid rgb(28, 57, 61);
    border-radius: 5px;
    padding: 0 0 0 2%;
`;

const _CertificationForm = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
`;
const _VerifyButton = styled.button`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    color: white;
    width: 30%;
    background-color: rgb(28, 57, 61);
    border: 2px solid rgb(28, 57, 61);
    border-radius: 5px;
    &:hover {
        color: rgb(255, 202, 29);
        cursor: pointer;
    }
`;
// 구분선
const _Line = styled.hr`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 80%;
`;

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: -350px;
`;

const DialogBox = styled.dialog`
    width: 400px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: white;
    z-index: 10001;
`;

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { FindPWModal };
