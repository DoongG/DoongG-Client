import React, { PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

function SignUpModal({
    onClickToggleModal,
    children,
}: PropsWithChildren<ModalDefaultType>) {
    const [isModalOpen, setModalOpen] = useState(true);

    // 모달을 닫는 함수
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
                <_Title>회원가입</_Title>
                <_SignUpForm>
                    <_FormTitle>이메일</_FormTitle>
                    <_FormInput type="id" placeholder="email@email.com" />
                    <_FormTitle>닉네임</_FormTitle>
                    <_FormInput
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                    />
                    <_FormTitle>전화번호</_FormTitle>
                    <_CertificationForm>
                        <_PhoneNumInput placeholder="(예시) 01000000000" />
                        <_VerifyButton>인증번호 받기</_VerifyButton>
                    </_CertificationForm>
                    <_CertificationForm>
                        <_PhoneNumInput placeholder="인증번호를 입력해주세요" />
                        <_VerifyButton>인증번호 확인</_VerifyButton>
                    </_CertificationForm>
                    <_FormTitle>비밀번호</_FormTitle>
                    <_FormInput
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                    />
                    <_FormInput
                        style={{ marginTop: '5px' }}
                        type="password"
                        placeholder="비밀번호를 다시 한번 입력해주세요."
                    />
                    <_PasswordExplain>
                        영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해
                        8자 이상 16자 이하로 입력해주세요.
                    </_PasswordExplain>
                </_SignUpForm>
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

// 회원가입 폼
const _SignUpForm = styled.div`
    margin-top: 30px;
    text-align: left;
    width: 80%;
`;

const _FormTitle = styled.div`
    margin-bottom: 5px;
    color: gray;
    font-weight: bold;
    margin-top: 10px;
`;
const _FormInput = styled.input`
    width: 96.5%;
    height: 35px;
    border: 2px solid #daddb1;
    border-radius: 5px;
    padding: 0 0 0 2%;
`;
const _PhoneNumInput = styled.input`
    width: 80%;
    height: 35px;
    border: 2px solid #daddb1;
    border-radius: 5px;
    padding: 0 0 0 2%;
`;
const _CertificationForm = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
`;
const _VerifyButton = styled.button`
    width: 40%;
    background-color: white;
    border: 2px solid #daddb1;
    border-radius: 5px;
`;
const _PasswordExplain = styled.div`
    font-size: 10px;
    color: gray;
    margin-top: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const ModalContainer = styled.div`
    display: flex;
    /* align-items: center; */
    justify-content: center;
    margin-top: -500px;
`;

const DialogBox = styled.dialog`
    width: 400px;
    height: 700px;
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

export { SignUpModal };