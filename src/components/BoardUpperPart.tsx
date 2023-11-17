import styled from "styled-components";
import { Search } from "./Search";
import { IoIosCheckmark } from "react-icons/io";
import { useState } from "react";
import { BoardStore } from "../store/storeT";

const _listUpperPart = styled.div`
  position: sticky;
  top: 10px;
  display: flex;
  width: 80%;
  justify-content: space-between;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
`;

const _orderKind = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const _orderEach = styled.span`
  margin: 0px 5px 0px 5px;
  font-weight: 600;
  cursor: pointer;
`;

const _buttonPlace = styled.div`
  display: flex;
  align-items: center;
`;

const _postButton = styled.button`
  margin-right: 20px;
  width: 80px;
  height: 30px;
`;

const BoardUpperPart = () => {
  const [whichOrder, setWhichOrder] = useState(false);
  const { postModalOn, setPostModalOn } = BoardStore();

  const orderNew = () => {
    // 데이터 새로 받아와서 최신순정렬
    setWhichOrder(false);
  };

  const orderHot = () => {
    // 데이터 새로 받아와서 인기순정렬
    setWhichOrder(true);
  };
  return (
    <_listUpperPart>
      <_orderKind>
        {!whichOrder ? (
          <>
            <_orderEach onClick={orderNew}>최근순</_orderEach>
            <span>
              <IoIosCheckmark />
            </span>
            <_orderEach style={{ color: "#c1c1c1" }} onClick={orderHot}>
              인기순
            </_orderEach>
            <span style={{ color: "#c1c1c1" }}>
              <IoIosCheckmark />
            </span>
          </>
        ) : (
          <>
            <_orderEach style={{ color: "#c1c1c1" }} onClick={orderNew}>
              최근순
            </_orderEach>
            <span style={{ color: "#c1c1c1" }}>
              <IoIosCheckmark />
            </span>
            <_orderEach onClick={orderHot}>인기순</_orderEach>
            <span>
              <IoIosCheckmark />
            </span>
          </>
        )}
      </_orderKind>
      <Search />
      <_buttonPlace>
        <_postButton onClick={() => setPostModalOn(!postModalOn)}>
          작성
        </_postButton>
      </_buttonPlace>
    </_listUpperPart>
  );
};

export { BoardUpperPart };
