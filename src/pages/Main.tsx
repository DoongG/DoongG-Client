import styled from 'styled-components';
import { IntroduceCarousel } from '../components/IntroduceCarousel';
import { IntroduceHotdeal } from '../components/IntroduceHotdeal';

const Main = (): JSX.Element => {
    return (
        <>
            <_Main>
                <br />
                {/* <IntroduceCarousel /> */}
                {/* <IntroduceHotdeal /> */}
            </_Main>
        </>
    );
};

const _Main = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export { Main };
