import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RoomReviewWrite } from '../components/RoomReviewWrite';
import { RoomReviewWatch } from '../components/RoomReviewWatch';
import {
    useButtonStore,
    useReviewDateStore,
} from '../store/shoppingHeaderSelectBarStore';
import { RoomReviewWriteMap } from '../components/RoomReviewWriteMap';
import { RoomReviewWatchMap } from '../components/RoomReviewWatchMap';

const { kakao } = window;

declare global {
    interface Window {
        kakao: any;
    }
}

const RoomreView = () => {
    const { button, setButton } = useButtonStore();
    const { address, mylat, mylng } = useReviewDateStore();
    return (
        <>
            <_WrapperBox className="wrapperBox">
                {button === true ? (
                    <RoomReviewWriteMap />
                ) : (
                    <RoomReviewWatchMap />
                )}

                {button === true ? (
                    <RoomReviewWrite
                        address={address}
                        mylat={mylat}
                        mylng={mylng}
                    />
                ) : (
                    <RoomReviewWatch />
                )}
            </_WrapperBox>
        </>
    );
};
const _WrapperBox = styled.div`
    display: flex;
    height: calc(100vh - 50px);
`;

export { RoomreView };
