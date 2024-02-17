/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';

export default function EmptyReviewBox() {
    return (
        <>
            <_wrapper>
                <_title>
                    리뷰가 없습니다. <br />
                    리뷰를 작성해 주세요
                </_title>
            </_wrapper>
        </>
    );
}
const _wrapper = styled.div`
    line-height: 1.7;
    min-height: 200px;
    color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const _title = styled.span``;
