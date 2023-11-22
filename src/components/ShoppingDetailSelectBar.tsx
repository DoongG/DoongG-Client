import styled from "styled-components";
import { useShoppingDetailSelectBarStore } from "../store/shoppingHeaderSelectBarStore";

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
            onClick={() => handleButtonClick("설명")}
            isSelect={isSelect}
          >
            Description
          </_descriptionSelectBox>
          <_reviewSelectBox className="reviewSelectBox" onClick={() => handleButtonClick("리뷰")} isSelect={isSelect}>
            Review (5)
          </_reviewSelectBox>
        </_selectTitleBar>
        <_descriptionBox className="descriptionBox" isSelect={isSelect}>
          Privact Filter는 우리 눈에 해로운 자외선 등 외부 광원을 차단합니다. 또한 hard coation이 되어 있어 외부의
          스크래치 및 충격을 방지하며 모니터를 보다 안전하게 지켜줍니다.기존 필름의 경우 양면테이프 또는 커치탭을
          이용하여야 하는 불편한 수고는 이제 안녕! 본재품의 경우 간편하게 모니터에 걸치기만 하면 설치가 완료되어 빠르고
          손쉽게 사용할 수 있습니다.
        </_descriptionBox>
        <_reviewBox className="reviewBox" isSelect={isSelect}>
          1000자를 세 문단으로 나눴으면, 각 문단은 문항에서 묻는 내용을 채워 넣습니다. SK 브로드밴드의 2019년 기출
          문항을 예로 들어보겠습니다. '최고 수준의 목표를 세우고 자발적으로 성취한 경험'을 1000자로 적어야 합니다. '최고
          수준의 목표'와 '성취한 경험'이 핵심 키워드겠네요. 일단 세 문단으로 구성하기로 계획합니다. 첫 문단에 '최고
          수준의 목표'에 대한 내용을, 두세 번째 문단에 '성취한 경험'을 구체적으로 적어주면 완결성이 있는 글이 나올 것
          같네요. ​ 경험이 조금 부족하다면, 하나의 경험을 디테일하게 분해해야 합니다. SK 브로드밴드에 지원한다고 하죠.
          저는 첫 문단에 '최고 수준의 목표는 무엇이었고, 왜 그것을 목표로 삼았는지'에 대한 이야기로 333자를
          채우겠습니다. ​ 두 번째 문단에는 '목표를 이루려면 어떤 노력을 해야 했는지, 최대 장애물은 무엇인지, 장애물을
          극복하려면 어떤 방법이 필요했는지'에 대한 이야기로 333자를 채우겠습니다. '경험'은 '에피소드'가 많이 발생할
          것이기 때문에, 그때 있었던 에피소드도 넣겠습니다. ​ 세 번째 문단에는 '어떤 성취가 있었는지, 성취를 통해 무엇을
          배웠는지, 어떤 차기 목표가 생겼는지'에 대한 이야기로 333자를 채우겠습니다. 이렇게 적으면 별다른 기교가
          들어가지 않아도, 성장스토리를 또렷하게 드러낼 수 있습니다. ​ 1000자를 서론-본론-결론으로 나눠서 접근하면, 글이
          상당히 지루하고 난해해집니다. 그저 처음부터 '회사가 궁금해하는 것'을 문항에서 읽은 후, 대답을 해줘야 합니다.
          먼저 1000자를 세 문단으로 구성합니다. 경험이 많으면 그 경험들 세 개 정도 추려서 모두 적습니다. 경험이 적으면,
          하나의 경험을 디테일하게 분해해서 적습니다. 이렇게 적으면 막막하게만 보이던 1000자가 조금은 가까워 보이기
          시작할 겁니다.
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
  border-bottom: ${(props) => (props.isSelect === "설명" ? "1px solid black" : "none")};
  padding-bottom: 10px;
  color: ${(props) => (props.isSelect === "설명" ? "black" : "grey")};
`;
const _reviewSelectBox = styled.div<Props>`
  padding-bottom: 10px;
  min-width: 100px;
  border-bottom: ${(props) => (props.isSelect === "리뷰" ? "1px solid black" : "none")};
  color: ${(props) => (props.isSelect === "리뷰" ? "black" : "grey")};
`;

const _descriptionBox = styled.div<Props>`
  text-align: left;
  margin-top: 15px;
  display: ${(props) => (props.isSelect === "설명" ? "block" : "none")};
`;

const _reviewBox = styled.div<Props>`
  margin-top: 15px;
  display: ${(props) => (props.isSelect === "리뷰" ? "block" : "none")};
`;
