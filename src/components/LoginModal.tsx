import React, { PropsWithChildren, useCallback, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import KakaoImg from '../assets/Kakao.png';
import Google from '../assets/Google.png';
import { SignUpModal } from './SignUpModal';
import { FindIDModal } from './FindIDModal';
import { FindPWModal } from './FindPWModal';
import axios from 'axios';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

function LoginModal({
    onClickToggleModal,
}: PropsWithChildren<ModalDefaultType>) {
    // 모달 열려 있나 없나 확인 스테이트
    const [isModalOpen, setModalOpen] = useState(true);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const [isFindIDModalOpen, setFindIDModalOpen] = useState(false);
    const [isFindPWModalOpen, setFindPWModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState<string | null>(null);

    // 모달을 닫는 함수
    const modalClose = () => {
        setModalOpen(false);

        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };

    const toggleSignUpModal = () => {
        setSignUpModalOpen(!isSignUpModalOpen);
    };

    const toggleFindIDModal = () => {
        setFindIDModalOpen(!isFindIDModalOpen);
    };

    const toggleFindPWModal = () => {
        setFindPWModalOpen(!isFindPWModalOpen);
    };

    // 로그인 로직
    // const handleLogin = () => {
    //     const user = UserData.find(
    //         (u) => u.email === email && u.password === password,
    //     );

    //     if (user) {
    //         setLoginError(null);

    //         window.location.replace('/');
    //     } else {
    //         setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
    //     }
    // };
    // 로그인 로직
    const handleLogin = () => {
        // 사용자 입력값
        const requestData = {
            email,
            password,
        };

        console.log(requestData);

        // axios를 사용하여 로그인 요청
        axios
            .post('${process.env.REACT_APP_API_KEY}/user/login', requestData)
            .then((response) => {
                const result = response.data;

                console.log(result);

                if (result == '1') {
                    setLoginError('비밀번호가 옳바르지 않습니다.');
                } else if (result == '0') {
                    setLoginError('존재하지 않는 사용자 입니다.');
                } else {
                    setLoginError(null);
                    const [token, nickname] = result.split(',');

                    // 로컬스토리지에 token과 nickname 저장
                    localStorage.setItem('token', token);
                    localStorage.setItem('nickname', nickname);

                    // 로그인 성공 시 처리
                    window.location.replace('/');
                }
            })
            .catch((error) => {
                console.error('로그인 요청 에러:', error);
                setLoginError('로그인 중 오류가 발생했습니다.');
            });
    };

    // 엔터 눌러도 로그인 되는 로직
    const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <_ModalContainer>
            <_DialogBoxOut>
                <_DialogBox>
                    <_ModalClose>
                        <AiOutlineClose onClick={modalClose} />
                    </_ModalClose>

                    <_Title>
                        D<span style={{ color: 'rgb(255, 202, 29)' }}>oo</span>
                        ngG
                    </_Title>
                    <br />
                    <_SubTitle>자취생들을 위한 플랫폼</_SubTitle>
                    <_ExplainService>
                        둥지가 제공하는 서비스를
                        <br />
                        하나의 계정으로 모두 이용할 수 있습니다.
                    </_ExplainService>

                    <_LoginForm>
                        <_ID>이메일</_ID>
                        <_IdInput
                            placeholder="이메일을 입력해주세요."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleOnKeyPress}
                        />
                        <_PW>비밀번호</_PW>
                        <_PwInput
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleOnKeyPress}
                        />
                        {loginError && (
                            <_ErrorMessage>{loginError}</_ErrorMessage>
                        )}
                        <_LoginButton onClick={handleLogin}>
                            로그인
                        </_LoginButton>
                    </_LoginForm>
                    <_GoSignUp>
                        {isFindIDModalOpen && (
                            <FindIDModal onClickToggleModal={toggleFindIDModal}>
                                Modal
                            </FindIDModal>
                        )}
                        <_GoSignUpText onClick={toggleFindIDModal}>
                            아이디 찾기
                        </_GoSignUpText>
                        <_GoSignUpText>|</_GoSignUpText>
                        {isFindPWModalOpen && (
                            <FindPWModal onClickToggleModal={toggleFindPWModal}>
                                Modal
                            </FindPWModal>
                        )}

                        <_GoSignUpText onClick={toggleFindPWModal}>
                            비밀번호 찾기
                        </_GoSignUpText>
                        <_GoSignUpText>|</_GoSignUpText>
                        {isSignUpModalOpen && (
                            <SignUpModal onClickToggleModal={toggleSignUpModal}>
                                Modal
                            </SignUpModal>
                        )}
                        <_GoSignUpText onClick={toggleSignUpModal}>
                            회원가입
                        </_GoSignUpText>
                    </_GoSignUp>
                </_DialogBox>
            </_DialogBoxOut>
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
const _DialogBoxOut = styled.div`
    width: 100%;
    height: 100%;
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
    font-size: 40px;
`;

// Title 아래 SubTitle부분
const _SubTitle = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    margin-top: -10px;
    font-size: 20px;
`;

// 서비스 설명 부분
const _ExplainService = styled.div`
    margin-top: 10px;
    font-weight: bold;
    color: gray;
`;

// Login Form 부분
const _LoginForm = styled.div`
    margin-top: 20px;
    text-align: left;
    width: 80%;
`;

// ID Title
const _ID = styled.div`
    margin-bottom: 5px;
    color: rgb(28, 57, 61);
    font-weight: bold;
`;

// PW Title
const _PW = styled.div`
    margin-top: 20px;
    margin-bottom: 5px;
    color: rgb(28, 57, 61);
    font-weight: bold;
`;

// ID input
const _IdInput = styled.input`
    width: 100%;
    height: 35px;
    border: 2px solid rgb(28, 57, 61);
    border-radius: 5px;
    padding: 0 0 0 2%;
    &:focus {
        border: 2px solid rgb(28, 57, 61);
    }
`;
// 비밀번호 입력
const _PwInput = styled.input`
    width: 100%;
    height: 35px;
    border: 2px solid rgb(28, 57, 61);
    border-radius: 5px;
    padding: 0 0 0 2%;
    &:focus {
        border: 2px solid rgb(28, 57, 61);
    }
`;

// 로그인 버튼
const _LoginButton = styled.button`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    color: white;
    width: 100%;
    height: 35px;
    margin-top: 20px;
    background-color: rgb(28, 57, 61);
    border: 2px solid rgb(28, 57, 61);
    border-radius: 5px;
    &:hover {
        color: rgb(255, 202, 29);
    }
`;

const _GoSignUp = styled.div`
    margin-top: 10px;
    width: 60%;
    display: flex;
    justify-content: space-between;
`;
const _GoSignUpText = styled.span`
    cursor: pointer;
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
    z-index: 10000 !important;
`;

const _DialogBox = styled.dialog`
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 10001 !important;
    margin-top: 60vh;
`;

const _Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
`;

// error message
const _ErrorMessage = styled.div`
    font-size: 5px;
    color: red;
    margin-top: 5px;
    margin-bottom: -10px;
`;

export { LoginModal };
