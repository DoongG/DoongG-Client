import { useCallback, useState } from 'react';
import { LoginModal } from '../components/LoginModal';
import styled from 'styled-components';
import { Search } from '../components/Search';

const Main = () => {
    const [isOpenModal, setOpemModal] = useState<Boolean>(false);

    const onClickToggleModal = useCallback(() => {
        setOpemModal(!isOpenModal);
    }, [isOpenModal]);

    return (
        <>
            <TAG>
                <Title>LoginModal</Title>
                {isOpenModal && <LoginModal onClickToggleModal={onClickToggleModal}>Modal</LoginModal>}
                <DialogButton onClick={onClickToggleModal}>Open Modal</DialogButton>
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
