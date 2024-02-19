/* eslint-disable react/jsx-pascal-case */
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { LoginModal } from '../components/LoginModal';
import { useCallback, useEffect, useState } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { MyPageModal } from '../components/MyPageModal';
import { User } from './data/User';
import logo from '../assets/logo-removebg-preview.png';
import axios from 'axios';
import { validationCheck } from '../pages/Validation/Validation';
import CartIcon from './shopping-section/cart/CartIcon';

const _headerArea = styled.div`
    position: relative;
    font-size: 14px;
    width: 100%;
    height: 60px;
    background-color: rgb(28, 57, 61);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 7000 !important;
`;

const _Logo = styled.div``;

const _Menu = styled.div`
    margin: 20px;
`;

const _MenuSpecific = styled(Link)<{ isSelected: boolean }>`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    text-decoration: none;
    color: white;
    padding: 5px;
    padding-bottom: 15px;
    margin: 0 5px;
    &:hover {
        color: rgb(255, 202, 29);
        cursor: pointer;
    }
    ${({ isSelected }) =>
        isSelected &&
        `
        color: rgb(255, 202, 29);
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

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            if (localStorage.getItem('token')) {
                const storedToken = JSON.parse(
                    localStorage.getItem('token') || '',
                )?.value;
                setToken(storedToken);
            } else {
                setToken('');
            }
        };
        fetchToken();
    }, []);

    // 마이페이지 모달
    const [isMyPageModalOpen, setMyPageModalOpen] = useState(false);
    const [myPageUserInfo, setMyPageUserInfo] = useState<User | undefined>(
        undefined,
    );
    const onClickToggleMyPageModal = useCallback(() => {
        if (!token) {
            console.error('토큰이 없습니다.');
            return;
        }
        if (validationCheck()) {
            axios
                .get(`${process.env.REACT_APP_API_KEY}/userAuth`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    const result = response.data;
                    setMyPageUserInfo(result);
                    setMyPageModalOpen(!isMyPageModalOpen);
                })
                .catch((error) => {
                    console.error('에러 발생:', error);
                });
        }
    }, [isMyPageModalOpen, token]);

    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nickname');
        window.location.replace('/');
    };

    return (
        <_headerArea>
            <_Logo>
                <img
                    src={logo}
                    style={{
                        width: '70px',
                        height: '60px',
                        marginLeft: '20px',
                        // marginTop: '10px',
                    }}
                />
            </_Logo>
            <_Menu>
                <_MenuSpecific
                    style={{ fontSize: '20px' }}
                    to={'/'}
                    isSelected={location.pathname === '/'}
                >
                    홈
                </_MenuSpecific>
                <_MenuSpecific
                    style={{ fontSize: '20px' }}
                    to={'/shopping'}
                    isSelected={location.pathname === '/shopping'}
                >
                    핫딜
                </_MenuSpecific>
                <_MenuSpecific
                    style={{ fontSize: '20px' }}
                    to={'/board'}
                    isSelected={location.pathname.includes('/board')}
                >
                    게시판
                </_MenuSpecific>
                <_MenuSpecific
                    style={{ fontSize: '20px' }}
                    to={'/roomreview'}
                    isSelected={location.pathname === '/roomreview'}
                >
                    자취방
                </_MenuSpecific>
            </_Menu>
            {localStorage.getItem('token') ? (
                <div style={{ display: 'flex' }}>
                    {/* 장바구니 버튼 */}
                    <CartIcon />
                    {/* 마이페이지 버튼 */}
                    <LogoutButton onClick={onClickToggleMyPageModal}>
                        <FaUser
                            style={{
                                fontSize: '20px',
                                marginRight: '5px',
                                padding: '0px 8px',

                                color: 'rgb(121, 180, 175)',
                            }}
                        />
                    </LogoutButton>
                    {/* 로그아웃 버튼 */}
                    <LogoutButton onClick={handleLogout}>
                        <FaSignOutAlt
                            style={{
                                fontSize: '20px',
                                marginRight: '5px',
                                padding: '0px 8px',

                                color: 'rgb(121, 180, 175)',
                            }}
                        />
                    </LogoutButton>
                </div>
            ) : (
                <_User onClick={onClickToggleLoginModal}>
                    <FiLogIn
                        style={{
                            fontSize: '30px',
                            marginRight: '10px',
                            color: 'rgb(121, 180, 175)',
                        }}
                    />
                </_User>
            )}
            {isLoginModalOpen && (
                <LoginModal onClickToggleModal={onClickToggleLoginModal}>
                    Modal
                </LoginModal>
            )}
            {/* 마이페이지 모달 */}
            {isMyPageModalOpen && (
                <MyPageModal
                    onClickToggleModal={onClickToggleMyPageModal}
                    user={myPageUserInfo || undefined}
                />
            )}
        </_headerArea>
    );
};

export { Header };
