import React, {
    PropsWithChildren,
    useState,
    ChangeEvent,
    useEffect,
} from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';

let authNum: string | undefined;

interface ModalDefaultType {
    onClickToggleModal: () => void;
}

function SignUpModal({
    onClickToggleModal,
    children,
}: PropsWithChildren<ModalDefaultType>) {
    const [isModalOpen, setModalOpen] = useState(true);
    const [isEmailChecked, setEmailChecked] = useState(false);

    // checkboxes
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [firstChecked, setFirstChecked] = useState(false);
    const [secondChecked, setSecondChecked] = useState(false);
    const [thirdChecked, setThirdChecked] = useState(false);

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isNicknameChecked, setNicknameChecked] = useState(false);
    const [isEmailAvailable, setEmailAvailable] = useState(true);
    const [isNicknameAvailable, setNicknameAvailable] = useState(true);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nicknameError, setNicknameError] = useState('');

    const [isPasswordValid, setPasswordValid] = useState(true);
    const [isPasswordMatch, setPasswordMatch] = useState(true);

    const [nicknameFormatError, setNicknameFormatError] = useState('');

    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

    const [signupSuccess, setSignupSuccess] = useState(false);
    const [enteredAuthNum, setEnteredAuthNum] = useState('');

    // 다음과 같이 상태 변수를 추가합니다.
    const [isEmailInputDisabled, setEmailInputDisabled] = useState(false);
    const [isNicknameInputDisabled, setNicknameInputDisabled] = useState(false);
    const [isPhoneNumberInputDisabled, setPhoneNumberInputDisabled] =
        useState(false);
    const [isAccessKeyInputDisabled, setAccessKeyInputDisabled] =
        useState(false);

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

    //이메일 중복 검사
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // setEmailAvailable(true);
    };
    const handleEmailDuplicateCheck = async () => {
        // 이메일 형식이 올바른지 확인
        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
            // 이메일 형식이 잘못된 경우 에러 메시지
            alert('이메일 형식이 잘못되었습니다.');
            return; // 중복 검사를 진행하지 않고 함수 종료
        } else {
            const requestData = {
                email,
            };

            axios
                .post(
                    `${process.env.REACT_APP_API_KEY}/user/emailCheck`,
                    requestData,
                )
                .then((response) => {
                    const result = response.data;

                    if (result) {
                        alert('사용 가능한 이메일입니다');
                        // document
                        //     .getElementById('emailInput')
                        //     ?.setAttribute('disabled', 'true');
                        setEmailInputDisabled(true);
                    } else {
                        alert('중복되는 이메일입니다.');
                    }
                })
                .catch((error) => {});
        }
    };
    // 이메일 형식 검사 함수
    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // 닉네임 입력 폼 처리
    const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newNickname = e.target.value;

        // 최소 3글자에서 최대 8글자까지만 허용
        if (newNickname.length === 0) {
            setNicknameFormatError('닉네임은 빈 값일 수 없습니다.');
        } else if (newNickname.length < 3 || newNickname.length > 8) {
            setNicknameFormatError('닉네임은 3글자에서 8글자까지 가능합니다.');
        } else {
            setNicknameFormatError('');
        }

        setNickname(newNickname);
    };

    // 닉네임 중복 검사
    const handleNicknameDuplicateCheck = async () => {
        // 공백 확인 추가
        if (!nickname || nickname.trim() === '') {
            alert('닉네임을 확인하세요.');

            return;
        } else if (nickname.length < 3 || nickname.length > 8) {
            // 에러 메시지 표시
            setNicknameError('닉네임은 3글자에서 8글자까지 가능합니다.');
            return;
        } else {
            const requestData = {
                nickname,
            };

            axios
                .post(
                    `${process.env.REACT_APP_API_KEY}/user/nicknameCheck`,
                    requestData,
                )
                .then((res) => {
                    const result = res.data;

                    if (result) {
                        alert('사용가능한 닉네임 입니다.');
                        // document
                        //     .getElementById('nicknameInput')
                        //     ?.setAttribute('disabled', 'true');
                        setNicknameInputDisabled(true);
                    } else {
                        alert('중복되는 닉네임입니다.');
                    }
                });
        }
    };

    // 핸드폰 인증번호 받기
    const getAccessKey = async () => {
        const phoneNumber = formattedPhoneNumber.replace(/-/g, '');

        if (phoneNumber.length == 11) {
            const requestData = {
                phoneNumber,
            };

            axios
                .post(
                    `${process.env.REACT_APP_API_KEY}/user/smsAuth`,
                    requestData,
                )
                .then((response) => {
                    const result = response.data;

                    if (!result) {
                        alert('존재하는 번호입니다.');
                    } else {
                        authNum = result;
                        alert('인증번호가 발송되었습니다.');
                        // document
                        //     .getElementById('phonenumber')
                        //     ?.setAttribute('disabled', 'true');
                        setPhoneNumberInputDisabled(true);
                    }
                });
        } else {
            alert('전화번호를 정확하게 입력해주세요');
        }
    };

    const checkAccessKey = async () => {
        // 입력값 가져오기
        const enteredAuthNum = (
            document.getElementById('accessKey') as HTMLInputElement
        )?.value;

        if (authNum == enteredAuthNum) {
            alert('인증성공');
            // document
            // .getElementById('accessKey')
            // ?.setAttribute('disabled', 'true');
            setAccessKeyInputDisabled(true);
        } else {
            alert('인증번호가 옳바르지 않습니다.');
        }
    };

    // 비밀번호 검사 영 대영 특문 포함 함수
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordValid(true);
        setPasswordMatch(true);
    };
    const handlePasswordBlur = () => {
        const isValid = validatePassword(password);
        setPasswordValid(isValid);

        const doPasswordsMatch = password === confirmPassword;
        setPasswordMatch(doPasswordsMatch);
    };
    const validatePassword = (password: string): boolean => {
        const regex =
            /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return regex.test(password);
    };

    // 비밀번호 일치 여부
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setConfirmPassword(newPassword);

        const doPasswordsMatch =
            password === newPassword && password !== '' && newPassword !== '';
        setPasswordMatch(doPasswordsMatch);
    };

    // 엔터 눌러도 로그인 되는 로직
    const handleOnKeyPressEmail = (
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === 'Enter') {
            handleEmailDuplicateCheck();
        }
    };
    const handleOnKeyPressNickname = (
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === 'Enter') {
            handleNicknameDuplicateCheck();
        }
    };

    const [checkboxResult, setCheckboxResult] = useState(false);

    useEffect(() => {
        setCheckboxResult(selectAllChecked);
    }, [selectAllChecked]);
    const handleSelectAllChange = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSelectAllChecked(isChecked);
        setFirstChecked(isChecked);
        setSecondChecked(isChecked);
        setThirdChecked(isChecked);
    };

    const signup = () => {
        const isAllFieldsDisabled =
            isEmailInputDisabled &&
            isNicknameInputDisabled &&
            isPhoneNumberInputDisabled &&
            isAccessKeyInputDisabled;
        const isPasswordMatchAndEmailAvailable =
            isPasswordMatch && isEmailAvailable;

        if (isAllFieldsDisabled) {
            if (isPasswordMatchAndEmailAvailable) {
                if (password === '' || confirmPassword === '') {
                    alert('비밀번호 및 비밀번호 확인을 입력해주세요.');
                } else {
                    if (checkboxResult) {
                        const requestData = {
                            email,
                            password,
                            nickname,
                            phoneNumber: formattedPhoneNumber,
                            profileImg: '',
                        };
                        axios
                            .post(
                                `${process.env.REACT_APP_API_KEY}/user/join`,
                                requestData,
                            )
                            .then((response) => {
                                const result = response.data;
                                if (result) {
                                    alert('회원가입 완료!');
                                    window.location.replace('/');
                                } else {
                                    alert('error');
                                }
                            });
                    } else {
                        alert('하단 체크박스를 모두 선택해 주세요');
                    }
                }
            } else {
                alert('비밀번호를 확인해 주세요');
            }
        } else {
            alert('모든 필드의 중복검사 및 인증번호 확인을 해주세요.');
        }
    };

    // 뒤의 [] 값들이 바뀔때 발동하는 것
    useEffect(() => {
        if (
            firstChecked == true &&
            secondChecked == true &&
            thirdChecked == true
        ) {
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
                    {/* 이메일 입력 폼 */}
                    <_FormTitle>이메일</_FormTitle>
                    <_CertificationForm>
                        <_FormInput
                            id="emailInput"
                            type="id"
                            placeholder="email@email.com"
                            value={email}
                            onChange={handleEmailChange}
                            onKeyPress={handleOnKeyPressEmail}
                            disabled={isEmailInputDisabled}
                        />
                        <_VerifyButton
                            onClick={handleEmailDuplicateCheck}
                            style={{ width: '30%' }}
                        >
                            중복검사
                        </_VerifyButton>
                    </_CertificationForm>
                    {/* 이메일 중복 검사 결과 표시 */}
                    {isEmailChecked && !isEmailAvailable && (
                        <_ErrorText>
                            이미 사용 중입니다.{' '}
                            {email !== '' && (
                                <span
                                    onClick={() =>
                                        document
                                            .getElementById('emailInput')
                                            ?.removeAttribute('disabled')
                                    }
                                >
                                    수정하기
                                </span>
                            )}
                        </_ErrorText>
                    )}
                    {isEmailChecked && isEmailAvailable && email !== '' && (
                        <_Available>사용 가능한 이메일입니다.</_Available>
                    )}

                    {/* 닉네임 입력 폼 */}
                    <_FormTitle>닉네임</_FormTitle>
                    <_CertificationForm>
                        <_FormInput
                            id="nicknameInput"
                            type="text"
                            placeholder="닉네임을 입력해주세요."
                            value={nickname}
                            onChange={handleNicknameChange}
                            onKeyPress={handleOnKeyPressNickname}
                            disabled={isNicknameInputDisabled}
                        />

                        <_VerifyButton
                            onClick={handleNicknameDuplicateCheck}
                            style={{ width: '30%' }}
                        >
                            중복검사
                        </_VerifyButton>
                    </_CertificationForm>
                    {/* 닉네임 중복 검사 결과 표시 */}
                    {isNicknameChecked && !isNicknameAvailable && (
                        <_ErrorText>
                            {nicknameFormatError || '이미 사용 중입니다.'}
                        </_ErrorText>
                    )}
                    {isNicknameChecked &&
                        isNicknameAvailable &&
                        nickname !== '' && (
                            <_Available>사용 가능한 닉네임입니다.</_Available>
                        )}
                    {isNicknameChecked && nicknameFormatError && (
                        <_ErrorText>{nicknameFormatError}</_ErrorText>
                    )}

                    <_FormTitle>전화번호</_FormTitle>
                    <_CertificationForm>
                        <_PhoneNumInput
                            id="phonenumber"
                            placeholder="(예시) 01000000000"
                            value={formattedPhoneNumber}
                            onChange={handlePhoneNumChange}
                            disabled={isPhoneNumberInputDisabled}
                        />
                        <_VerifyButton onClick={getAccessKey}>
                            인증번호 받기
                        </_VerifyButton>
                    </_CertificationForm>
                    <_CertificationForm>
                        <_PhoneNumInput
                            id="accessKey"
                            placeholder="인증번호를 입력해주세요"
                            disabled={isAccessKeyInputDisabled}
                        />
                        <_VerifyButton onClick={checkAccessKey}>
                            인증번호 확인
                        </_VerifyButton>
                    </_CertificationForm>

                    <_FormTitle>비밀번호</_FormTitle>
                    <_FormInput
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                    />
                    {!isPasswordValid && (
                        <_ErrorText>
                            영문 대소문자, 숫자, 특수문자를 3가지 이상으로
                            조합해 8자 이상 16자 이하로 입력해주세요.
                        </_ErrorText>
                    )}
                    <_FormInput
                        style={{ marginTop: '5px' }}
                        type="password"
                        placeholder="비밀번호를 다시 한번 입력해주세요."
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        onBlur={handlePasswordBlur}
                    />
                    {password !== '' &&
                        confirmPassword !== '' &&
                        !isPasswordMatch && (
                            <_ErrorText>
                                비밀번호가 일치하지 않습니다.
                            </_ErrorText>
                        )}
                    {password !== '' &&
                        confirmPassword !== '' &&
                        isPasswordMatch && (
                            <_Available>비밀번호가 일치합니다.</_Available>
                        )}
                    <_PasswordExplain>
                        영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합해
                        8자 이상 16자 이하로 입력해주세요.
                    </_PasswordExplain>

                    {/* 동의 부분 */}
                    <_Agree>
                        <_AgreeCheckBox
                            type="checkbox"
                            checked={selectAllChecked}
                            onChange={handleSelectAllChange}
                        />
                        <_AgreeCheckBoxText>전체동의</_AgreeCheckBoxText>
                    </_Agree>
                    <hr style={{ color: 'gray' }} />
                    <_Agree style={{ marginTop: '-5px' }}>
                        <_AgreeCheckBox
                            type="checkbox"
                            checked={firstChecked}
                            onChange={() => setFirstChecked(!firstChecked)}
                        />
                        <_AgreeCheckBoxText style={{ color: 'gray' }}>
                            만 14세 이상입니다. (필수)
                        </_AgreeCheckBoxText>
                    </_Agree>
                    <_Agree style={{ marginTop: '5px' }}>
                        <_AgreeCheckBox
                            type="checkbox"
                            checked={secondChecked}
                            onChange={() => setSecondChecked(!secondChecked)}
                        />
                        <_AgreeCheckBoxText style={{ color: 'gray' }}>
                            DoongG 이용약관 동의 (필수)
                        </_AgreeCheckBoxText>
                    </_Agree>
                    <_Agree style={{ marginTop: '5px' }}>
                        <_AgreeCheckBox
                            type="checkbox"
                            checked={thirdChecked}
                            onChange={() => setThirdChecked(!thirdChecked)}
                        />
                        <_AgreeCheckBoxText style={{ color: 'gray' }}>
                            DoongG 개인정보 수집 및 이용 동의 (필수)
                        </_AgreeCheckBoxText>
                    </_Agree>

                    {/* 회원가입 버튼 */}
                    <_SignupButton onClick={signup}>회원가입</_SignupButton>
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

// 회원가입 폼
const _SignUpForm = styled.div`
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
    width: 100%;
    height: 35px;
    border: 2px solid rgb(28, 57, 61);
    border-radius: 5px;
    padding: 0 0 0 2%;
`;
const _PhoneNumInput = styled.input`
    width: 80%;
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
    width: 40%;
    background-color: rgb(28, 57, 61);
    border: 2px solid rgb(28, 57, 61);
    border-radius: 5px;
    color: white;
    font-size: 13px;
    &:hover {
        color: rgb(255, 202, 29);
        cursor: pointer;
    }
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
    color: white;
    background-color: rgb(28, 57, 61);
    border: 2px solid rgb(28, 57, 61);
    border-radius: 5px;
    &:hover {
        color: rgb(255, 202, 29);
        cursor: pointer;
    }
`;
// 에러 메시지
const _ErrorText = styled.div`
    color: red;
    font-size: 10px;
    margin-top: 3px;
    margin-bottom: -5px;
    margin-left: 5px;
`;
// 사용가능
const _Available = styled.div`
    color: blue;
    font-size: 10px;
    margin-top: 3px;
    margin-bottom: -5px;
    margin-left: 5px;
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
