import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Suspense, lazy } from 'react';

// 라우트 기반 코드 분할
const Main = lazy(() =>
    import('../pages/Main').then(({ Main }) => ({ default: Main })),
);
const Board = lazy(() =>
    import('../pages/Board-Each/Board').then(({ Board }) => ({
        default: Board,
    })),
);
const Shopping = lazy(() =>
    import('../pages/Shopping').then(({ Shopping }) => ({ default: Shopping })),
);
const BoardUnited = lazy(() =>
    import('../pages/Board-All/BoardUnited').then(({ BoardUnited }) => ({
        default: BoardUnited,
    })),
);
const Header = lazy(() =>
    import('../components/Header').then(({ Header }) => ({ default: Header })),
);
const PostDetail = lazy(() =>
    import('../pages/Post-Detail/PostDetail').then(({ PostDetail }) => ({
        default: PostDetail,
    })),
);
const RoomreView = lazy(() =>
    import('../pages/RoomReview').then(({ RoomreView }) => ({
        default: RoomreView,
    })),
);
const PageNotFound = lazy(() =>
    import('../pages/404').then(({ PageNotFound }) => ({
        default: PageNotFound,
    })),
);
const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Suspense>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />}></Route>
                        <Route path="/board" element={<BoardUnited />}></Route>
                        <Route
                            path="/boards/search/:boardName"
                            element={<Board />}
                        ></Route>
                        <Route
                            path="/board/:boardName"
                            element={<Board />}
                        ></Route>
                        <Route
                            path="/posts/:id"
                            element={<PostDetail />}
                        ></Route>
                        <Route path="/shopping" element={<Shopping />}></Route>
                        <Route
                            path="/roomreview"
                            element={<RoomreView />}
                        ></Route>
                        <Route path="/*" element={<PageNotFound />}></Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
};

export { Router };
