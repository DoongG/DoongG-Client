import styled from 'styled-components';
import { Search } from './Search';
import { IoIosCheckmark } from 'react-icons/io';
import { useState, useEffect } from 'react';
import { BoardStore } from '../store/storeT';
import { useLocation, useNavigate } from 'react-router';
import { HiRefresh } from 'react-icons/hi';

const _listUpperPart = styled.div`
    position: sticky;
    top: 10px;
    display: flex;
    width: 80%;
    justify-content: center;
    z-index: 4996;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    @media (max-width: 500px) {
        align-items: center;
        flex-direction: column;
        .forApp {
            display: block;
        }
        .forWeb {
            display: none;
        }
    }
`;

const _orderKind = styled.div`
    /* width: 40%; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-left: 10px;
`;

const _orderEach = styled.span`
    margin: 0px 0px 0px 5px;
    min-width: 60px;
    font-weight: 600;
    cursor: pointer;
`;

const _buttonPlace = styled.div`
    display: flex;
    align-items: center;
`;

const _postButton = styled.button`
    @font-face {
        font-family: 'MBC1961GulimM';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/MBC1961GulimM.woff2')
            format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    height: 44px;
    width: 80px;
    font-family: 'MBC1961GulimM';
    border-radius: 20px;
    background-color: transparent;
    margin-right: 10px;
    margin-left: 10px;
    padding: 10px;
`;

const _postButton2 = styled.button`
    display: none;
    @font-face {
        font-family: 'MBC1961GulimM';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/MBC1961GulimM.woff2')
            format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    height: 44px;
    width: 80px;
    font-family: 'MBC1961GulimM';
    border-radius: 20px;
    background-color: transparent;
    margin-right: 10px;
    margin-left: 10px;
    padding: 10px;
`;

const _refreshButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    min-width: 45px;
    font-size: 30px;
`;

// 검색창 섹션 컴포넌트
const BoardUpperPart = () => {
    const path = useLocation();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [forNext, setForNext] = useState(false);
    const {
        setSignal,
        postModalOn,
        setPostModalOn,
        orderKind,
        setOrderKind,
        styleSwitch,
        isKeywordExsist,
        setIsKeywordExsist,
    } = BoardStore();

    // 데이터 새로 받아와서 최신순정렬
    const orderNew = () => {
        if (styleSwitch == false) {
            if (isKeywordExsist) {
                navigate(
                    `/boards/search/${
                        path.pathname.split('/')[3]
                    }?keyword=${isKeywordExsist}&page=${1}&order=latest`,
                );
            } else {
                navigate(
                    `/board/${
                        path.pathname.split('/')[2]
                    }?page=${1}&order=latest`,
                );
            }
        }

        setOrderKind(false);
    };

    // 데이터 새로 받아와서 인기순정렬
    const orderHot = () => {
        if (styleSwitch == false) {
            if (isKeywordExsist) {
                navigate(
                    `/boards/search/${
                        path.pathname.split('/')[3]
                    }?keyword=${isKeywordExsist}&page=${1}&order=views`,
                );
            } else {
                navigate(
                    `/board/${
                        path.pathname.split('/')[2]
                    }?page=${1}&order=views`,
                );
            }
        }

        setOrderKind(true);
    };

    const refresh = () => {
        setOrderKind(false);
        setIsKeywordExsist('');
        setSignal(true);
    };

    // useEffect(() => {
    //     if (isKeywordExsist == '') setForNext(true);
    // }, [isKeywordExsist]);

    // useEffect(() => {
    //     if (forNext == true) {
    //         setForNext(false);
    //     }
    // }, [forNext]);

    return (
        <_listUpperPart>
            <div style={{ display: 'flex' }}>
                <_refreshButton onClick={refresh}>
                    <HiRefresh />
                </_refreshButton>
                <_orderKind>
                    {!orderKind ? (
                        <>
                            <_orderEach onClick={orderNew}>최근순</_orderEach>
                            <span>
                                <IoIosCheckmark />
                            </span>
                            <_orderEach
                                style={{ color: '#c1c1c1' }}
                                onClick={orderHot}
                            >
                                조회순
                            </_orderEach>
                            <span style={{ color: '#c1c1c1' }}>
                                <IoIosCheckmark />
                            </span>
                        </>
                    ) : (
                        <>
                            <_orderEach
                                style={{ color: '#c1c1c1' }}
                                onClick={orderNew}
                            >
                                최근순
                            </_orderEach>
                            <span style={{ color: '#c1c1c1' }}>
                                <IoIosCheckmark />
                            </span>
                            <_orderEach onClick={orderHot}>조회순</_orderEach>
                            <span>
                                <IoIosCheckmark />
                            </span>
                        </>
                    )}
                </_orderKind>
                <_postButton2
                    className="forApp"
                    onClick={() => setPostModalOn(!postModalOn)}
                >
                    작성
                </_postButton2>
            </div>
            <Search />
            <_buttonPlace>
                <_postButton
                    className="forWeb"
                    onClick={() => setPostModalOn(!postModalOn)}
                >
                    작성
                </_postButton>
            </_buttonPlace>
        </_listUpperPart>
    );
};

export { BoardUpperPart };
