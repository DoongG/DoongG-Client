import React, { ChangeEvent, PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { User, UserData } from './data/User';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

function FindPWModal({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) {
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
                <_Title>비밀번호 변경</_Title>
                <_FindIDForm>
                    <_FormTitle>이메일</_FormTitle>
                    <_CertificationForm>
                        <_FormInput type="id" placeholder="email@email.com" />
                        <_VerifyButton style={{ width: '30%' }}>인증</_VerifyButton>
                    </_CertificationForm>
                </_FindIDForm>
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
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/MBC1961GulimM.woff2') format('woff2');
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
// 회원가입 버튼
const _FindIDButton = styled.button`
    width: 100%;
    height: 35px;
    margin-top: 20px;
    background-color: white;
    border: 2px solid #daddb1;
    border-radius: 5px;
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
    &:hover {
        background-color: #daddb1;
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
    margin-top: -400px;
`;

const DialogBox = styled.dialog`
    width: 400px;
    height: 500px;
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
