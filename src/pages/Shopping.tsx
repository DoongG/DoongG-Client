import ShoppingHeaderSelectBar from "../components/ShoppingHeaderSelectBar";
import ShoppingSlideResent from "../components/ShoppingSlideResent";
import ShoppingSlideHot from "../components/ShoppingSlideHot";
import { useShoppingHeaderSelectBarStore } from "../store/shoppingHeaderSelectBarStore";
import ShoppingList from "../components/ShoppingList";
import ShoppingListTest from "../components/ShoppingListTest";
import styled from "styled-components";

const _hr = styled.hr`
  margin: 0;
  padding: 0.5em 0;
  background-color: white;
  border-bottom: none;
`;

//shopping
const Shopping = () => {
  const { selectButton, setSelectButton } = useShoppingHeaderSelectBarStore();
  console.log(selectButton);
  return (
    <>
      <ShoppingHeaderSelectBar />
      {selectButton === "최근" ? <ShoppingSlideResent /> : <ShoppingSlideHot />}
      <_hr></_hr>
      <ShoppingListTest />
    </>
  );
};

export { Shopping };
