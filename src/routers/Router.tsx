import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "../pages/Main";
import { Board } from "../pages/Board";
import { Shopping } from "../pages/Shopping";
import { ShoppingDetail } from "../pages/ShoppingDetail";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/board" element={<Board />}></Route>
          <Route path="/shopping" element={<Shopping />}></Route>
          <Route path="/shopping/:category/:title" element={<ShoppingDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export { Router };
