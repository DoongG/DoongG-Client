import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const _Error = styled.div`
    position: absolute;
    background: #5677f4;
    color: #fff;
    padding: 13px;
    border-radius: 20rem;
    top: 135px;
    right: 15px;
    font-size: 11pt;
    box-shadow: 2px 2px 3px #d1d1d1;
    visibility: visible; /* 초기 가시성 설정 */
    z-index: 100;
    &::after {
        bottom: 100%;
        transform: translate(-1px, 3px);
        left: 251px;
        border: solid transparent;
        content: ' ';
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(56, 77, 157, 0);
        border-bottom-color: #5677f4;
        border-width: 11px;
        margin-left: -20px;
    }

    /* 추가된 부분: fade-out 클래스가 적용될 때 가시성이 서서히 사라지도록 설정 */
    &.fade-out {
        visibility: hidden;
        transition: visibility 1s ease-in-out;
    }
`;
const SearchComponent: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        console.log(showWarning);
        let timeoutId: NodeJS.Timeout;

        if (showWarning) {
            timeoutId = setTimeout(() => {
                setShowWarning(false);
            }, 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [showWarning]);

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setShowWarning(true);
        } else {
            setShowWarning(false);
            // ...검색 로직 추가...
        }
    };

    return (
        <div>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="검색어를 입력하세요" />
            <button onClick={handleSearch}>검색</button>

            {showWarning && <_Error className="fade-out">검색어를 입력하세요!</_Error>}
        </div>
    );
};

export { SearchComponent };
