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

const ShoppingDetailSelectBar = () => {
    // selectBar 상태
    const { isSelect, setIsSelect } = useShoppingDetailSelectBarStore();

    // 클릭시 isSelect 상태 변화 함수
    const handleButtonClick = (button: string) => {
        setIsSelect(button);
    };

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
                        Review ({tempDB.length})
                    </_reviewSelectBox>
                </_selectTitleBar>
                <_descriptionBox className="descriptionBox" isSelect={isSelect}>
                    Privact Filter는 우리 눈에 해로운 자외선 등 외부 광원을
                    차단합니다. 또한 hard coation이 되어 있어 외부의 스크래치 및
                    충격을 방지하며 모니터를 보다 안전하게 지켜줍니다.기존
                    필름의 경우 양면테이프 또는 커치탭을 이용하여야 하는 불편한
                    수고는 이제 안녕! 본재품의 경우 간편하게 모니터에 걸치기만
                    하면 설치가 완료되어 빠르고 손쉽게 사용할 수 있습니다.
                </_descriptionBox>
                <_reviewBox className="reviewBox" isSelect={isSelect}>
                    {tempDB.map((item) => {
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
`;
const _selectTitleBar = styled.div`
    display: flex;

    div {
        cursor: default;
    }
`;
const _descriptionSelectBox = styled.div<Props>`
    min-width: 100px;
    border-bottom: ${(props) =>
        props.isSelect === '설명' ? '1px solid black' : 'none'};
    padding-bottom: 10px;
    color: ${(props) => (props.isSelect === '설명' ? 'black' : 'grey')};
`;
const _reviewSelectBox = styled.div<Props>`
    padding-bottom: 10px;
    min-width: 100px;
    border-bottom: ${(props) =>
        props.isSelect === '리뷰' ? '1px solid black' : 'none'};
    color: ${(props) => (props.isSelect === '리뷰' ? 'black' : 'grey')};
`;

const _descriptionBox = styled.div<Props>`
    text-align: left;
    margin-top: 15px;
    display: ${(props) => (props.isSelect === '설명' ? 'block' : 'none')};
`;

const _reviewBox = styled.div<Props>`
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
