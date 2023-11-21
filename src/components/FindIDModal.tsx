import React, { ChangeEvent, PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { User, UserData } from './data/User';
import axios from 'axios';

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

function FindIDModal({
    onClickToggleModal,
    children,
}: PropsWithChildren<ModalDefaultType>) {
    const [isModalOpen, setModalOpen] = useState(true);
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isFindIDClicked, setFindIDClicked] = useState(false);
    const [foundEmail, setFoundEmail] = useState<string | null>(null);
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

    const formatPhoneNumber = (phoneNumber: string): string => {
        if (phoneNumber.length >= 4 && phoneNumber.length <= 7) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        } else if (phoneNumber.length >= 8 && phoneNumber.length <= 11) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
                3,
                7,
            )}-${phoneNumber.slice(7)}`;
        } else {
            return phoneNumber;
        }
    };

    const handlePhoneNumChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawPhoneNumber = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        setPhoneNumber(rawPhoneNumber);

        const formatted = formatPhoneNumber(rawPhoneNumber);
        setFormattedPhoneNumber(formatted);
    };
    // 모달을 닫는 함수
    const modalClose = () => {
        setModalOpen(false);

        if (onClickToggleModal) {
            onClickToggleModal();
        }
    };

    // 아이디 찾기
    const handleFindID = () => {
        const user = UserData.find(
            (u) =>
                u.nickname === nickname &&
                u.phone_number === formattedPhoneNumber.replace(/-/g, ''),
        );

        if (user) {
            const maskedEmail = maskEmail(user.email);
            setFoundEmail(maskedEmail);
        } else {
            setFoundEmail(null);
        }

        setFindIDClicked(true);
    };

    // 백엔드 합칠때 코드
    // const handleFindID = async () => {
    //     try {
    //         // API 요청을 보내고 응답을 받아옴
    //         const response = await axios.post('/your-api-endpoint', {
    //             nickname: nickname,
    //             phoneNumber: formattedPhoneNumber.replace(/-/g, ''),
    //         });

    //         // 응답 데이터에서 이메일을 가져옴
    //         const userEmail = response.data;

    //         if (userEmail && userEmail !== 'false') {
    //             // 이메일이 존재하면 결과를 표시
    //             const maskedEmail = maskEmail(userEmail);
    //             setFoundEmail(maskedEmail);
    //         } else {
    //             // 이메일이 존재하지 않으면 결과를 표시
    //             setFoundEmail(null);
    //         }

    //         setFindIDClicked(true);
    //     } catch (error) {
    //         console.error('Error while fetching user information:', error);
    //         // 에러 발생 시 예외처리
    //     }
    // };

    // 이메일 가리기
    const maskEmail = (email: string): string => {
        const [username, domain] = email.split('@');
        const maskedUsername =
            username.substring(0, 3) + '*'.repeat(username.length - 3);
        return `${maskedUsername}@${domain}`;
    };

    return (
        <ModalContainer>
            <DialogBox>
                <_ModalClose>
                    <AiOutlineClose onClick={modalClose} />
                </_ModalClose>
                <_Title>아이디 찾기</_Title>
                <_FindIDForm>
                    <_FormTitle>닉네임</_FormTitle>
                    <_FormInput
                        type="text"
                        placeholder="닉네임을 입력해주세요."
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        disabled={isFindIDClicked && foundEmail !== null}
                    />
                    <_FormTitle>전화번호</_FormTitle>
                    <_PhoneNumInput
                        placeholder="(예시) 01000000000"
                        value={formattedPhoneNumber}
                        onChange={handlePhoneNumChange}
                        disabled={isFindIDClicked && foundEmail !== null}
                    />
                    <_FindIDButton onClick={handleFindID}>
                        아이디 찾기
                    </_FindIDButton>
                </_FindIDForm>
                <_Line />
                {/* 결과를 표시하는 부분 */}
                {isFindIDClicked &&
                    (foundEmail !== null ? (
                        <_IDResult>
                            <strong>{nickname}님의 아이디는</strong>
                            <br />
                            <br />
                            <_IDResultID>{foundEmail}</_IDResultID>
                            <br />
                            <strong>입니다.</strong>
                        </_IDResult>
                    ) : (
                        <_IDResultNULL>일치하는 정보가 없습니다.</_IDResultNULL>
                    ))}
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
// 구분선
const _Line = styled.hr`
    margin-top: 20px;
    margin-bottom: 20px;
    width: 80%;
`;
const _PhoneNumInput = styled.input`
    width: 96.5%;
    height: 35px;
    border: 2px solid #daddb1;
    border-radius: 5px;
    padding: 0 0 0 2%;
`;
const _IDResult = styled.div``;

const _IDResultID = styled.div`
    color: blue;
    font-size: 20px;
`;
const _IDResultNULL = styled.div`
    font-size: 20px;
    color: red;
    font-weight: 600;
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

export { FindIDModal };
