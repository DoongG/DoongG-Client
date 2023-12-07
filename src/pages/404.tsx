import { styled } from 'styled-components';
import Mascot from '../assets/Mascot-fliped.png';

const _nothingHere = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1c393d;
`;

const _imagePlace = styled.div<{ img?: any }>`
    @font-face {
        font-family: 'TAEBAEKmilkyway';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/TAEBAEKmilkyway.woff2')
            format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'TAEBAEKmilkyway';
    background-image: url(${(props) => props.img});
    background-size: 100%;
    background-repeat: no-repeat;
    width: 400px;
    height: 400px;
    font-size: 35px;
    /* color: rgb(121, 180, 175); */
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageNotFound = () => {
    return (
        <_nothingHere style={{ height: window.innerHeight }}>
            <_imagePlace img={Mascot}>잘못된 페이지 접근입니다</_imagePlace>
        </_nothingHere>
    );
};

export { PageNotFound };
