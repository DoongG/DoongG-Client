import { styled } from 'styled-components';
import { IoCopyOutline } from 'react-icons/io5';
import { useState } from 'react';

const ShareBalloon = (props: { pageData: any }) => {
    const { postId } = props.pageData;
    const [copiedCheck, setCopiedCheck] = useState(false);

    const shareBalloonGenerator = async (
        e: React.MouseEvent<HTMLDivElement>,
    ) => {
        e.stopPropagation();
        await navigator.clipboard.writeText(
            `https://doongg.site/posts/${postId}`,
        );
        setCopiedCheck(true);
        setTimeout(() => {
            setCopiedCheck(false);
        }, 3000);
    };

    return (
        <>
            <_shareBalloon onClick={shareBalloonGenerator}>
                <div style={{ display: 'flex' }}>
                    <p style={{ margin: '5px' }}>
                        https://doongg.site/posts/
                        {postId}
                    </p>
                    <_shareIconWrapper>
                        <IoCopyOutline />
                    </_shareIconWrapper>
                </div>
                {copiedCheck && <_copiedAlert>복사되었습니다</_copiedAlert>}
            </_shareBalloon>
        </>
    );
};

const _shareIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const _shareBalloon = styled.div`
    position: absolute;
    flex-direction: column;
    display: flex;
    font-size: 10px;
    background-color: #ffe066;
    color: #333;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    top: 25px;
    right: 1px;
`;

const _copiedAlert = styled.div`
    text-align: center;
    color: green;
    animation: fadeOut 4s linear;
    top: -20px;
    right: 140px;
    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;

export { ShareBalloon };
