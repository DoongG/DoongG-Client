/* eslint-disable react/jsx-pascal-case */
// MUI 컴포넌트
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import styled from 'styled-components';

interface Props {
    item: {
        content: string;
        createdAt: string;
        nickname: string;
    };
    index: number;
    fetchData: any;
}
export default function Review(props: Props) {
    const { item, index, fetchData } = props;
    console.log(fetchData);
    return (
        <>
            <_reviewBox className="reviewBox">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography
                            style={{
                                padding: '0px 10px',
                            }}
                        >
                            {fetchData.reviews.length - index}
                        </Typography>
                        <div
                            style={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography className="content">
                                {item.content}
                            </Typography>
                            <Typography
                                style={{
                                    width: '20%',
                                }}
                            >
                                {item.nickname}
                            </Typography>
                            <Typography style={{ width: '30%' }}>
                                {item.createdAt.split(' ')[0]}
                            </Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            style={{
                                textAlign: 'left',
                                fontSize: '14px',
                            }}
                        >
                            {item.content}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </_reviewBox>
        </>
    );
}

const _reviewBox = styled.div`
    width: 70%;
    border-bottom: 1px solid lightgrey;
    .content {
        text-align: left;
        width: 50%;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        margin: 0px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
`;
