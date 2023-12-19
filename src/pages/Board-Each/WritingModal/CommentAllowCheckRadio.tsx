import { useState } from 'react';

const CommentAllowCheckRadio = (props: {
    isAllowed: boolean;
    setIsAllowed: (input: boolean) => void;
}) => {
    const handleCommentAllow = (e: React.MouseEvent<HTMLInputElement>) => {
        if (e.currentTarget.value == 'true') {
            props.setIsAllowed(true);
        } else {
            props.setIsAllowed(false);
        }
    };

    return (
        <div>
            <div>댓글허용</div>
            <div>
                <span>
                    허용
                    <input
                        name="commentAllow"
                        value="true"
                        type="radio"
                        checked={props.isAllowed ? true : false}
                        onClick={handleCommentAllow}
                    ></input>
                </span>{' '}
                <span>
                    비허용
                    <input
                        name="commentAllow"
                        value="false"
                        type="radio"
                        checked={!props.isAllowed ? true : false}
                        onClick={handleCommentAllow}
                    ></input>
                </span>
            </div>
        </div>
    );
};

export { CommentAllowCheckRadio };
