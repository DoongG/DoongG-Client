import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from '../pages/Main';
import { Board } from '../pages/Board';
import { Shopping } from '../pages/Shopping';
import { BoardUnited } from '../pages/BoardUnited';
import { Header } from '../components/Header';
import { PostDetail } from '../pages/PostDetail';
import { RoomreView } from '../pages/RoomReview';

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
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
                    <Route path="/roomreview" element={<RoomreView />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export { Router };
