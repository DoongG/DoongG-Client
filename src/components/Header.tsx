import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { LoginModal } from '../components/LoginModal';
import { useCallback, useState } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { IoLogInSharp } from 'react-icons/io5';

const _headerArea = styled.div`
    width: 100%;
    height: 50px;
    background-color: #daddb1;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const _Logo = styled.div``;

const _Menu = styled.div`
    margin: 20px;
`;

const _MenuSpecific = styled(Link)<{ isSelected: boolean }>`
    @font-face {
        font-family: 'Cafe24Moyamoya-Regular-v1.0';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/Cafe24Moyamoya-Regular-v1.0.woff2')
            format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'Cafe24Moyamoya-Regular-v1.0';
    text-decoration: none;
    padding: 5px;
    padding-bottom: 15px;
    margin: 0 5px;
    &:hover {
        background-color: white;
    }
    ${({ isSelected }) =>
        isSelected &&
        `
        background-color: white;
        color: black;
    `}
`;

const _User = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

const LogoutButton = styled.div`
    &:hover {
        cursor: pointer;
        color: red;
    }
`;

const Header = () => {
    // 로그인 모달
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const onClickToggleLoginModal = useCallback(() => {
        setLoginModalOpen(!isLoginModalOpen);
    }, [isLoginModalOpen]);

    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.replace('/');
    };

    return (
        <_headerArea>
            <_Logo>
                <h4>DoongG</h4>
            </_Logo>
            <_Menu>
                <_MenuSpecific to={'/'} isSelected={location.pathname === '/'}>
                    Home
                </_MenuSpecific>
                <_MenuSpecific
                    to={'/shopping'}
                    isSelected={location.pathname === '/shopping'}
                >
                    Shopping
                </_MenuSpecific>
                <_MenuSpecific
                    to={'/board'}
                    isSelected={location.pathname === '/board'}
                >
                    Board
                </_MenuSpecific>
                <_MenuSpecific
                    to={'/roomreview'}
                    isSelected={location.pathname === '/roomreview'}
                >
                    RoomReview
                </_MenuSpecific>
            </_Menu>
            {localStorage.getItem('token') ? (
                <>
                    <LogoutButton onClick={handleLogout}>
                        <FaSignOutAlt
                            style={{
                                fontSize: '20px',
                                marginRight: '5px',
                                color: 'red',
                            }}
                        />
                    </LogoutButton>
                </>
            ) : (
                <_User onClick={onClickToggleLoginModal}>
                    <IoLogInSharp
                        style={{
                            fontSize: '30px',
                            marginRight: '10px',
                            color: 'purple',
                        }}
                    />
                </_User>
            )}
            {isLoginModalOpen && (
                <LoginModal onClickToggleModal={onClickToggleLoginModal}>
                    Modal
                </LoginModal>
            )}
        </_headerArea>
    );
};

export { Header };
