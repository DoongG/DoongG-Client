import React, { PropsWithChildren, useCallback, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import Kakao from '../assets/Kakao.png';
import Google from '../assets/Google.png';
import { SignUpModal } from './SignUpModal';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

function LoginModal({
    onClickToggleModal,
}: PropsWithChildren<ModalDefaultType>) {
    // 모달 열려 있나 없나 확인 스테이트
    const [isModalOpen, setModalOpen] = useState(true);

    // 모달을 닫는 함수
    const modalClose = () => {
        setModalOpen(false);

        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };
    const [isOpenModal, setOpemModal] = useState<Boolean>(false);

    const onClickToggleSignUp = useCallback(() => {
        setOpemModal(!isOpenModal);
    }, [isOpenModal]);

    return (
        <_ModalContainer>
            <_DialogBox>
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>

                <_Title>DoongG</_Title>
                <br />
                <_SubTitle>자취생들을 위한 플랫폼</_SubTitle>
                <_ExplainService>
                    둥지가 제공하는 서비스를
                    <br />
                    하나의 계정으로 모두 이용할 수 있습니다.
                </_ExplainService>

                <_LoginForm>
                    <_ID>이메일</_ID>
                    <_IdInput placeholder="이메일을 입력해주세요." />
                    <_PW>비밀번호</_PW>
                    <_PwInput
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                    />
                    <_LoginButton>로그인</_LoginButton>
                </_LoginForm>
                <_GoSignUp>
                    <_GoSignUpText>아이디 찾기</_GoSignUpText>
                    <_GoSignUpText>|</_GoSignUpText>
                    <_GoSignUpText>비밀번호 찾기</_GoSignUpText>
                    <_GoSignUpText>|</_GoSignUpText>
                    {isOpenModal && (
                        <SignUpModal onClickToggleModal={onClickToggleSignUp}>
                            Modal
                        </SignUpModal>
                    )}
                    <_GoSignUpText onClick={onClickToggleSignUp}>
                        회원가입
                    </_GoSignUpText>
                </_GoSignUp>
                <_Line />
                <_SocialLogin>
                    <_SocialImg src={Kakao} />
                    <_SocialImg src={Google} />
                </_SocialLogin>
            </_DialogBox>
            <_Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault();

                    if (onClickToggleModal) {
                        onClickToggleModal();
                    }
                }}
            />
        </_ModalContainer>
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
    margin-top: 20px;
    font-size: 40px;
`;

// Title 아래 SubTitle부분
const _SubTitle = styled.div`
    margin-top: -10px;
    font-size: 20px;
    font-weight: bold;
`;

// 서비스 설명 부분
const _ExplainService = styled.div`
    margin-top: 30px;
    font-weight: bold;
    color: gray;
`;

// Login Form 부분
const _LoginForm = styled.div`
    margin-top: 30px;
    text-align: left;
    width: 80%;
`;

// ID Title
const _ID = styled.div`
    margin-bottom: 5px;
    color: gray;
    font-weight: bold;
`;

// PW Title
const _PW = styled.div`
    margin-top: 20px;
    margin-bottom: 5px;
    color: gray;
    font-weight: bold;
`;

// ID input
const _IdInput = styled.input`
    width: 96.5%;
    height: 35px;
    border: 2px solid #daddb1;
    border-radius: 5px;
    padding: 0 0 0 2%;
`;
// 비밀번호 입력
const _PwInput = styled.input`
    width: 96.5%;
    height: 35px;
    border: 2px solid #daddb1;
    border-radius: 5px;
    padding: 0 0 0 2%;
`;

// 로그인 버튼
const _LoginButton = styled.button`
    width: 100%;
    height: 35px;
    margin-top: 20px;
    background-color: white;
    border: 2px solid #daddb1;
    border-radius: 5px;
`;

const _GoSignUp = styled.div`
    margin-top: 10px;
    width: 60%;
    display: flex;
    justify-content: space-between;
`;
const _GoSignUpText = styled.span`
    margin-top: 5px;
    font-size: 10px;
`;

// 구분선
const _Line = styled.hr`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 80%;
`;

// 소셜로그인 파트
const _SocialLogin = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`;

// 소셜 로그인 로고 이미지
const _SocialImg = styled.img`
    width: 45%;
    height: 30px;
`;

const _ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
`;

const _DialogBox = styled.dialog`
    width: 400px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 10000 !important;
`;

const _Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { LoginModal };
