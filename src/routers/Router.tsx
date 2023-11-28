import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from '../pages/Main';
import { Board } from '../pages/Board';
import { Shopping } from '../pages/Shopping';
import { BoardUnited } from '../pages/BoardUnited';
import { PostDetail } from '../pages/PostDetail';

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/board" element={<BoardUnited />}></Route>
                    <Route path="/board/:boardName" element={<Board />}></Route>
                    {/* <Route
                        path="/board/:boardName/:page"
                        element={<Board />}
                    ></Route> */}
                    <Route path="/posts/:id" element={<PostDetail />}></Route>
                    <Route path="/shopping" element={<Shopping />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export { Router };
