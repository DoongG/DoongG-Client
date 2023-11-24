import { useCallback, useState } from 'react';
import { LoginModal } from '../components/LoginModal';
import styled from 'styled-components';
import { MyPageModal } from '../components/MyPageModal';
import { UserData, User } from '../components/data/User';

const Main = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const onClickToggleLoginModal = useCallback(() => {
        setLoginModalOpen(!isLoginModalOpen);
    }, [isLoginModalOpen]);

    const [isMyPageModalOpen, setMyPageModalOpen] = useState(false);
    const onClickToggleMyPageModal = useCallback(() => {
        setMyPageModalOpen(!isMyPageModalOpen);
    }, [isMyPageModalOpen]);

    const user: User = UserData[0];

    return (
        <>
            <TAG>
                <Title>LoginModal</Title>

                <br />
                <br />
                {isMyPageModalOpen && (
                    <MyPageModal
                        onClickToggleModal={onClickToggleMyPageModal}
                        user={user}
                    >
                        Modal
                    </MyPageModal>
                )}
                <DialogButton onClick={onClickToggleMyPageModal}>
                    MyPage
                </DialogButton>
            </TAG>
        </>
    );
};

const TAG = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h3`
    text-align: center;
`;

const DialogButton = styled.button`
    width: 160px;
    height: 48px;
    background-color: blueviolet;
    color: white;
    font-size: 1.2rem;
    font-weight: 400;
    border-radius: 4px;
    border: none;
    cursor: pointer;

    &:hover {
        transform: translateY(-1px);
    }
`;

export { Main };
