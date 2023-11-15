import ShoppingHeaderSelectBar from "../components/ShoppingHeaderSelectBar";
import ShoppingSlideResent from "../components/ShoppingSlideResent";
import ShoppingSlideHot from "../components/ShoppingSlideHot";
import useShoppingHeaderSelectBarStore from "../store/shoppingHeaderSelectBar";
import ShoppingList from "../components/ShoppingList";

//shopping
const Shopping = () => {
  const { selectButton, setSelectButton } = useShoppingHeaderSelectBarStore();
  console.log(selectButton);
  return (
    <>
      <ShoppingHeaderSelectBar />
      {selectButton === "최근" ? <ShoppingSlideResent /> : <ShoppingSlideHot />}
      <hr></hr>
      <ShoppingList />
    </>
  );
};

export { Shopping };
