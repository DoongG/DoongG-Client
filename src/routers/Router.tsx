import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Board } from '../pages/Board';

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Board />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export { Router };
