import React, { PropsWithChildren, useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

function SignUpModal({ onClickToggleModal, children }: PropsWithChildren<ModalDefaultType>) {
    const [isModalOpen, setModalOpen] = useState(true);

    // checkboxes
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [firstChecked, setFirstChecked] = useState(false);
    const [secondChecked, setSecondChecked] = useState(false);
    const [thirdChecked, setThirdChecked] = useState(false);

    // 모달을 닫는 함수
    const modalClose = () => {
        setModalOpen(false);

        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };

    const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSelectAllChecked(isChecked);
        setFirstChecked(isChecked);
        setSecondChecked(isChecked);
        setThirdChecked(isChecked);
    };
    // 뒤의 [] 값들이 바뀔때 발동하는 것
    useEffect(() => {
        if (firstChecked == true && secondChecked == true && thirdChecked == true) {
            setSelectAllChecked(true);
        } else {
            setSelectAllChecked(false);
        }
    }, [firstChecked, secondChecked, thirdChecked]);

    return (
        <ModalContainer>
            <DialogBox>
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>
                <_Title>회원가입</_Title>
                <_SignUpForm>
                    <_FormTitle>이메일</_FormTitle>
                    <_CertificationForm>
                        <_FormInput type="id" placeholder="email@email.com" />
                        <_VerifyButton style={{ width: '30%' }}>중복검사</_VerifyButton>
                    </_CertificationForm>
                    <_FormTitle>닉네임</_FormTitle>
                    <_CertificationForm>
                        <_FormInput type="text" placeholder="닉네임을 입력해주세요." />
                        <_VerifyButton style={{ width: '30%' }}>중복검사</_VerifyButton>
                    </_CertificationForm>
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
                    <_FormInput type="password" placeholder="비밀번호를 입력해주세요." />
                    <_FormInput style={{ marginTop: '5px' }} type="password" placeholder="비밀번호를 다시 한번 입력해주세요." />
                    <_PasswordExplain>영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해 8자 이상 16자 이하로 입력해주세요.</_PasswordExplain>

                    {/* 동의 부분 */}
                    <_Agree>
                        <_AgreeCheckBox type="checkbox" checked={selectAllChecked} onChange={handleSelectAllChange} />
                        <_AgreeCheckBoxText>전체동의</_AgreeCheckBoxText>
                    </_Agree>
                    <hr style={{ color: 'gray' }} />
                    <_Agree style={{ marginTop: '-5px' }}>
                        <_AgreeCheckBox type="checkbox" checked={firstChecked} onChange={() => setFirstChecked(!firstChecked)} />
                        <_AgreeCheckBoxText style={{ color: 'gray' }}>만 14세 이상입니다. (필수)</_AgreeCheckBoxText>
                    </_Agree>
                    <_Agree style={{ marginTop: '5px' }}>
                        <_AgreeCheckBox type="checkbox" checked={secondChecked} onChange={() => setSecondChecked(!secondChecked)} />
                        <_AgreeCheckBoxText style={{ color: 'gray' }}>DoongG 이용약관 동의 (필수)</_AgreeCheckBoxText>
                    </_Agree>
                    <_Agree style={{ marginTop: '5px' }}>
                        <_AgreeCheckBox type="checkbox" checked={thirdChecked} onChange={() => setThirdChecked(!thirdChecked)} />
                        <_AgreeCheckBoxText style={{ color: 'gray' }}>DoongG 개인정보 수집 및 이용 동의 (필수)</_AgreeCheckBoxText>
                    </_Agree>

                    {/* 회원가입 버튼 */}
                    <_SignupButton>회원가입</_SignupButton>
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
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/MBC1961GulimM.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'MBC1961GulimM';
    font-size: 30px;
`;

// 회원가입 폼
const _SignUpForm = styled.div`
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

// 전체동의 부분
const _Agree = styled.div`
    margin-top: 20px;
    margin-bottom: -5px;
    display: flex;
    align-items: center;
`;
const _AgreeCheckBox = styled.input``;
const _AgreeCheckBoxText = styled.span`
    font-size: 13px;
    margin-left: 5px;
`;

// 회원가입 버튼
const _SignupButton = styled.button`
    width: 100%;
    height: 35px;
    margin-top: 20px;
    background-color: white;
    border: 2px solid #daddb1;
    border-radius: 5px;
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
