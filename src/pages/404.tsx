import { styled } from 'styled-components';

const _nothingHere = styled.div`
    width: 100%;
    display: center;
    align-items: center;
    justify-content: center;
`;

const PageNotFound = () => {
    return (
        <_nothingHere>
            <h1>잘못된 페이지 접근입니다</h1>
        </_nothingHere>
    );
};

export { PageNotFound };
