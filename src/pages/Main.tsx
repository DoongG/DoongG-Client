import styled from 'styled-components';
import { IntroduceHotdeal1 } from '../components/IntroduceHotdeal1';

const Main = (): JSX.Element => {
    return (
        <AppContainer>
            <_Main>
                <IntroduceHotdeal1 />
            </_Main>
        </AppContainer>
    );
};

const _Main = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* overflow: hidden; */
`;

const AppContainer = styled.div`
    height: 100%;
`;

export { Main };
