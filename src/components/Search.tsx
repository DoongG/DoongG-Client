import { hover } from '@testing-library/user-event/dist/hover';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';

const Search = () => {
    const handleSearch = () => {
        const inputElement = document.querySelector('.input_search');
        if (inputElement) {
            const inputValue = (inputElement as HTMLInputElement).value;
            if (inputValue === '') {
                alert('검색어를 입력해 주세요!!');
            } else {
                alert('검색어 : ' + inputValue);
            }
        }
    };

    return (
        <_SearchSection>
            <_SearchBox>
                <_InputContainer>
                    <BiSearch style={{ marginLeft: '5px', marginRight: '5px' }} className="search_icon" size={20} />
                    <_InputSearch placeholder="검색어를 입력해주세요" />
                </_InputContainer>
                <_SearchButton onClick={handleSearch}>검색</_SearchButton>
            </_SearchBox>
        </_SearchSection>
    );
};

// 검색 전체 부분
const _SearchSection = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 100px;
`;

// 검색창 부분
const _SearchBox = styled.div`
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    border: 2px solid black;
    border-radius: 10px;
`;

// 돋보기와 input 부분
const _InputContainer = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
`;

const _InputSearch = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    &:focus {
        outline: none;
    }
`;

// 검색 버튼
const _SearchButton = styled.button`
    @font-face {
        font-family: 'MBC1961GulimM';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/MBC1961GulimM.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'MBC1961GulimM';
    background-color: white;
    color: black;
    border: none;
    cursor: pointer;
`;
export { Search };
