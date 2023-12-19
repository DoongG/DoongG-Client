import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from '../pages/Main';
import { Board } from '../pages/Board-Each/Board';
import { Shopping } from '../pages/Shopping';
import { BoardUnited } from '../pages/Board-All/BoardUnited';
import { Header } from '../components/Header';
import { PostDetail } from '../pages/Post-Detail/PostDetail';
import { RoomreView } from '../pages/RoomReview';
import { PageNotFound } from '../pages/404';

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />}></Route>
                    <Route path="/board" element={<BoardUnited />}></Route>
                    <Route
                        path="/boards/search/:boardName"
                        element={<Board />}
                    ></Route>
                    <Route path="/board/:boardName" element={<Board />}></Route>
                    <Route path="/posts/:id" element={<PostDetail />}></Route>
                    <Route path="/shopping" element={<Shopping />}></Route>
                    <Route path="/roomreview" element={<RoomreView />}></Route>
                    <Route path="/*" element={<PageNotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export { Router };
