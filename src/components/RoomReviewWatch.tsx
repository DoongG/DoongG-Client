import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RoomReviewWatch = () => {
    return (
        <>
            <_RoomReviewWatchWrapper>
                <h1>전체리뷰 보기 컴포넌트</h1>
            </_RoomReviewWatchWrapper>
        </>
    );
};

const _RoomReviewWatchWrapper = styled.div`
    width: 20%;
    background-color: #daddb1;
`;
export { RoomReviewWatch };
