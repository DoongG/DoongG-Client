import { BoardStore } from "../store/storeT";
import { styled } from "styled-components";

const _modalArea = styled.div`
  position: absolute;
  width: 100%;
  height: 400px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  z-index: 9999;
`;

const _modal = styled.div`
  width: 70%;
  height: 400px;
  background-color: red;
`;

const PostModal = () => {
  const { postModalOn, setPostModalOn } = BoardStore();
  return (
    <_modalArea
      onClick={() => {
        setPostModalOn(!postModalOn);
      }}
    >
      <_modal></_modal>
    </_modalArea>
  );
};

export { PostModal };
