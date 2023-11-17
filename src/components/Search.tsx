import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';

const Search = () => {
    const [selectedOption, setSelectedOption] = useState('All');
    const [inputHashTag, setInputHashTag] = useState('');
    const [hashTags, setHashTags] = useState<string[]>([]);
    const [hashTagBoxes, setHashTagBoxes] = useState<JSX.Element[]>([]);

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

    // 해시태그 선택
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);

        // 선택된 옵션이 해시태그가 아닌 경우 해시태그 관련 상태 초기화
        if (event.target.value !== 'HashTag') {
            setHashTags([]);
            setHashTagBoxes([]);
        }
    };

    // 해시태그 입력 제한 개수
    const maxHashTagCount = 8;

    // 해시태그 입력
    const addHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement;
        const allowedCommand = ['Comma', 'Space'];

        if (!allowedCommand.includes(e.code)) return;

        if (!inputElement.value.trim()) {
            return setInputHashTag('');
        }

        let newHashTag = inputElement.value.trim();
        const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
        if (regExp.test(newHashTag)) {
            newHashTag = newHashTag.replace(regExp, '');
        }
        if (newHashTag.includes(',')) {
            newHashTag = newHashTag.split(',').join('');
        }

        if (!newHashTag.trim()) return;

        // 중복 체크
        if (hashTags.includes(newHashTag)) {
            alert('이미 입력된 해시태그입니다.');
            setInputHashTag('');
            return;
        }

        if (hashTags.length >= maxHashTagCount) {
            // 개수 제한에 도달하면 입력을 제한
            setInputHashTag('');
            alert('해시태그는 8개까지밖에 입력할 수 없습니다.');
            return;
        }

        setHashTags((prevHashTags: string[] | undefined) => {
            if (!prevHashTags) return [newHashTag];

            // 새로운 해시태그가 추가될 때마다 네모칸 생성
            const newHashTagBoxes = (
                <HashTagBoxContainer key={newHashTag}>
                    <HashTagBox>#{newHashTag}</HashTagBox>
                </HashTagBoxContainer>
            );

            // 기존 네모칸에 새로운 해시태그의 네모칸 추가
            setHashTagBoxes((prevBoxes) => [...prevBoxes, newHashTagBoxes]);

            return [...prevHashTags, newHashTag] as string[];
        });

        setInputHashTag('');
    };

    const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement;

        if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
        e.preventDefault();

        const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
        if (!regExp.test(inputElement.value)) {
            setInputHashTag('');
        }
    };

    const changeHashTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputHashTag(e.target.value);
    };

    return (
        <_SearchSection>
            <_HashTagBoxesContainer>{hashTagBoxes}</_HashTagBoxesContainer>
            <_SearchBox>
                <_InputContainer>
                    <_SelectOptionBox value={selectedOption} onChange={handleSelectChange}>
                        <_SelectOption value="All">전체</_SelectOption>
                        <_SelectOption value="Title">제목</_SelectOption>
                        <_SelectOption value="Writer">작성자</_SelectOption>
                        <_SelectOption value="HashTag">해쉬태그</_SelectOption>
                    </_SelectOptionBox>
                    {selectedOption === 'HashTag' ? (
                        <>
                            <_InputHashTag value={inputHashTag} onChange={changeHashTagInput} onKeyUp={addHashTag} onKeyDown={keyDownHandler} placeholder="#해시태그를 등록해보세요. (최대 10개)" className="hashTagInput" />
                        </>
                    ) : (
                        <_InputSearch placeholder="검색어를 입력해주세요" className="input_search" />
                    )}
                </_InputContainer>
                <_SearchButton onClick={handleSearch}>검색</_SearchButton>
            </_SearchBox>
        </_SearchSection>
    );
};

const _SelectOptionBox = styled.select`
    text-align: center;
    border: none;
    outline: none;
`;
const _SelectOption = styled.option`
    border: none;
`;

// 검색 전체 부분
const _SearchSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column; /* 수정된 부분: 세로로 정렬 */
    justify-content: center;
    align-items: center; /* 가로 중앙 정렬 */
    margin-top: 10px;
`;

// 검색창 부분
const _SearchBox = styled.div`
    background-color: white;
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

const _InputHashTag = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    &:focus {
        outline: none;
    }
`;

const _HashTagBoxesContainer = styled.div`
    display: flex;
    margin-top: 10px;
`;

const HashTagBoxContainer = styled.div`
    display: flex;
    margin-right: 4px;
`;

const HashTagBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; /* 해시태그 네모칸의 너비 조절 */
    height: 24px;
    border: 2px solid #daddb1;
    border-radius: 4px;
    background-color: #daddb1;
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
