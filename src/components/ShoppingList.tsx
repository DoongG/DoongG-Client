import styled from "styled-components";
import shopping1 from "../assets/shopping1.jpg";
import shopping2 from "../assets/shopping2.jpg";
import shopping3 from "../assets/shopping3.jpg";
import shopping4 from "../assets/shopping4.jpg";
import shopping5 from "../assets/shopping5.jpg";

const tempdb = [
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "부침개 논라 종결 해물파전/김치전 반반",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "쇼핑 끝",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "shopping",
  },
  {
    title: "식품 시작",
    realCost: 10000,
    discountCost: 8600,
    likes: 12,
    img: shopping1,
    category: "foods",
  },
];

const _productListWrapper = styled.div`
  padding-right: 170px;
  padding-top: 70px;
  padding-left: 50px;
`;

const _categoryDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const _productDivWrapper = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
`;
const _productDiv = styled.div`
  width: 95%;
`;
const _imgDiv = styled.div`
  height: 50%;
`;
const _img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const _infosDiv = styled.div`
  margin-top: 15px;
  text-align: left;
`;

const _price = styled.div`
  display: flex;
  margin-top: 10px;
`;
const _per = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: red;
`;
const _priceDiv = styled.div`
  margin-left: 15px;
  margin-top: 5px;
`;

const _initPriceDiv = styled.div`
  text-decoration: line-through;
`;
const _realPriceDiv = styled.div`
  font-weight: 700;
  margin-top: 5px;
`;

const _ul = styled.ul`
  padding: 0;
  margin: 0;
`;
const _li = styled.li``;

export default function ShoppingList() {
  return (
    <>
      <_productListWrapper className="productListWrapper">
        <_categoryDiv className="beautyDiv">
          {tempdb
            .filter((item) => {
              return item.category === "shopping";
            })
            .map((item) => {
              return (
                <>
                  <_productDivWrapper className="productDivWrapper">
                    <_productDiv className="productDiv">
                      <_imgDiv className="imgDiv">
                        <_img src={item.img}></_img>
                      </_imgDiv>
                      <_infosDiv className="infosDiv">
                        <div className="title">{item.title}</div>
                        <_price className="price">
                          <_per className="per">14%</_per>
                          <_priceDiv>
                            <_initPriceDiv className="beforePrice">{item.realCost}</_initPriceDiv>
                            <_realPriceDiv className="afterPrice">{item.discountCost}</_realPriceDiv>
                          </_priceDiv>
                        </_price>
                      </_infosDiv>
                    </_productDiv>
                  </_productDivWrapper>
                </>
              );
            })}
        </_categoryDiv>
      </_productListWrapper>
      <div className="categoryBar">
        <_ul>
          <li>뷰티</li>
          <li>식품</li>
          <li>주방용품</li>
          <li>생활용품</li>
          <li>인테리어</li>
          <li>가전제품</li>
          <li>문구류</li>
          <li>스포츠</li>
          <li>공구류</li>
        </_ul>
      </div>
    </>
  );
}
