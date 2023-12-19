import { MdSubdirectoryArrowRight } from 'react-icons/md';
import { styled } from 'styled-components';

const Comment = (props: { comment: any }) => {
    const { commenter, content, createdAt, childCommentsList } = props.comment;

    return (
        <div>
            <_oneComment>
                <_commentWriterLine>
                    <_eachCommentWriter>
                        {commenter.nickname}
                    </_eachCommentWriter>
                </_commentWriterLine>
                <div>{content}</div>
                <div>
                    {createdAt.slice(0, 10)} {createdAt.slice(11, 16)}{' '}
                </div>
                {childCommentsList.map((recomment: any) => {
                    return (
                        <_recommentList>
                            <MdSubdirectoryArrowRight />
                            <div>
                                <_commentWriterLine
                                    style={{ justifyContent: 'start' }}
                                >
                                    <_eachCommentWriter>
                                        {recomment.commenter.nickname}
                                    </_eachCommentWriter>
                                </_commentWriterLine>
                                <div>{recomment.content}</div>
                                <_date>
                                    {recomment.createdAt.slice(0, 10)}{' '}
                                    {recomment.createdAt.slice(11, 16)}{' '}
                                </_date>
                            </div>
                        </_recommentList>
                    );
                })}
            </_oneComment>
            <hr></hr>
        </div>
    );
};

const _recommentList = styled.div`
    display: flex;
    margin: 5px;
`;

const _oneComment = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const _commentWriterLine = styled.div`
    display: flex;
    justify-content: space-between;
`;

const _eachCommentWriter = styled.div`
    font-weight: 600;
`;

const _date = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 5px 0px 5px;
`;

export { Comment };
