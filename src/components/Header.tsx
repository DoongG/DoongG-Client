import { styled } from 'styled-components';

const _headerArea = styled.div`
    width: 100%;
    height: 100px;
    background-color: #96f296;
    font-size: 50px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
`;

const Header = () => {
    return <_headerArea>DoongG</_headerArea>;
};

export { Header };
