import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "../pages/Main";
import { Board } from "../pages/Board";
import { Shopping } from "../pages/Shopping";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/board" element={<Board />}></Route>
          <Route path="/shopping" element={<Shopping />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export { Router };
