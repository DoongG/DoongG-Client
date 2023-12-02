import styled from 'styled-components';
import { useShoppingDetailSelectBarStore } from '../store/shoppingHeaderSelectBarStore';

const tempDB = [
    {
        name: '조진형',
        createAt: '2023.05.07',
        content:
            '가성비 좋구~ 배송 무지 빠릅니다. 처음 해보는분들도 누구나 할수있도록 자세한 설명을 해주셔서 쉽게 할수 있었어요. 현관, 욕실, 뒤베란다, 앞베란다를 설명서대로 하니까 모두잘되었어요.감사합니다.',
    },
    {
        name: '심재운',
        createAt: '2023.03.10',
        content: '가성비최고입니다♡♡',
    },
    {
        name: '류승기',
        createAt: '2023.01.22',
        content: 'I am 신뢰에요',
    },
];

interface Props {
    isSelect: string;
}
interface DefaultProps {
    description: string; // 추가
    review: Array<{
        name: string;
        createAt: string;
        content: string;
    }>; // 추가
}

const ShoppingDetailSelectBar: React.FC<DefaultProps> = ({
    description,
    review,
}) => {
    // selectBar 상태
    const { isSelect, setIsSelect } = useShoppingDetailSelectBarStore();

    // 클릭시 isSelect 상태 변화 함수
    const handleButtonClick = (button: string) => {
        setIsSelect(button);
    };
    console.log(description, review);

    return (
        <>
            <_selectWrapperBox>
                <_selectTitleBar className="selectTitleBox">
                    <_descriptionSelectBox
                        className="descriptionSelectBox"
                        onClick={() => handleButtonClick('설명')}
                        isSelect={isSelect}
                    >
                        Description
                    </_descriptionSelectBox>
                    <_reviewSelectBox
                        className="reviewSelectBox"
                        onClick={() => handleButtonClick('리뷰')}
                        isSelect={isSelect}
                    >
                        Review ({review.length})
                    </_reviewSelectBox>
                </_selectTitleBar>
                <_descriptionBox className="descriptionBox" isSelect={isSelect}>
                    {description}
                </_descriptionBox>
                <_reviewBox className="reviewBox" isSelect={isSelect}>
                    {review.map((item) => {
                        return (
                            <>
                                <_privateContentBox className="privateContentBox">
                                    <_name className="name">{item.name}</_name>
                                    <_date className="date">
                                        {item.createAt}
                                    </_date>
                                    <_content className="content">
                                        {item.content}
                                    </_content>
                                </_privateContentBox>
                            </>
                        );
                    })}
                </_reviewBox>
            </_selectWrapperBox>
        </>
    );
};

export { ShoppingDetailSelectBar };

const _selectWrapperBox = styled.div`
    margin-top: 30px;
    padding: 0px 80px;
    @media (max-width: 1200px) {
        padding: 0px 50px;
    }
    @media (max-width: 991px) {
        padding: 0px 30px;
        margin-top: 20px;
    }
    @media (max-width: 767px) {
        padding: 0px 0px;
    }
`;
const _selectTitleBar = styled.div`
    display: flex;

    div {
        cursor: default;
    }
`;
const _descriptionSelectBox = styled.div<Props>`
    min-width: 100px;
    @media (max-width: 991px) {
        font-size: 14px;
    }
    border-bottom: ${(props) =>
        props.isSelect === '설명' ? '1px solid black' : 'none'};
    padding-bottom: 10px;
    color: ${(props) => (props.isSelect === '설명' ? 'black' : 'grey')};
`;
const _reviewSelectBox = styled.div<Props>`
    @media (max-width: 991px) {
        font-size: 14px;
    }
    padding-bottom: 10px;
    min-width: 100px;
    border-bottom: ${(props) =>
        props.isSelect === '리뷰' ? '1px solid black' : 'none'};
    color: ${(props) => (props.isSelect === '리뷰' ? 'black' : 'grey')};
`;

const _descriptionBox = styled.div<Props>`
    @media (max-width: 991px) {
        font-size: 14px;
    }
    text-align: left;
    margin-top: 15px;
    display: ${(props) => (props.isSelect === '설명' ? 'block' : 'none')};
`;

const _reviewBox = styled.div<Props>`
    @media (max-width: 991px) {
        font-size: 14px;
    }
    margin-top: 15px;
    display: ${(props) => (props.isSelect === '리뷰' ? 'block' : 'none')};
`;

const _privateContentBox = styled.div`
    padding-bottom: 20px;
    border-bottom: 1px solid grey;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
`;

const _name = styled.div`
    padding-bottom: 5px;
`;

const _date = styled.div`
    padding-bottom: 5px;
    color: grey;
`;
const _content = styled.div`
    text-align: left;
`;
