import styled from 'styled-components';
import { Search } from './Search';
import { IoIosCheckmark } from 'react-icons/io';
import { useState } from 'react';
import { BoardStore } from '../store/storeT';
import { useLocation, useNavigate } from 'react-router';

const _listUpperPart = styled.div`
    position: sticky;
    top: 10px;
    display: flex;
    width: 80%;
    justify-content: center;
    z-index: 4996;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
`;

const _orderKind = styled.div`
    width: 40%;
    display: flex;
    align-items: center;
    margin-right: 20px;
    margin-left: 20px;
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
    margin-right: 20px;
    width: 80px;
    height: 30px;
`;

const BoardUpperPart = () => {
    const path = useLocation();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const {
        postModalOn,
        setPostModalOn,
        orderKind,
        setOrderKind,
        styleSwitch,
        isKeywordExsist,
    } = BoardStore();

    const orderNew = () => {
        // 데이터 새로 받아와서 최신순정렬
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

    const orderHot = () => {
        // 데이터 새로 받아와서 인기순정렬
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

    const handleSearchKeyword = (e: any) => {
        setKeyword(e.target.value);
    };
    return (
        <_listUpperPart>
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
            <Search />
            <_buttonPlace>
                <_postButton onClick={() => setPostModalOn(!postModalOn)}>
                    작성
                </_postButton>
            </_buttonPlace>
        </_listUpperPart>
    );
};

export { BoardUpperPart };
