import { styled } from 'styled-components';
import { BoardStore } from '../store/storeT';

const TodayFoodModal = () => {
    const { gameModalOn, setGameModalOn } = BoardStore();

    const sampledb = [
        '한식',
        '한식',
        '한식',
        '한식',
        '한식',
        '한식',
        '한식',
        '한식',
        '한식',
    ];
    return (
        <_modalContainer>
            <_dialogBox>
                <_gameSpace>
                    <div>오늘 뭐 먹지</div>
                    <_itemSpace>
                        {sampledb.map((x) => {
                            return (
                                <_item>
                                    <p>{x}</p>
                                </_item>
                            );
                        })}
                    </_itemSpace>
                </_gameSpace>
            </_dialogBox>
            <_backdrop
                onClick={() => {
                    setGameModalOn(false);
                }}
            />
        </_modalContainer>
    );
};

const _gameSpace = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const _itemSpace = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; // 복수의 행
`;

const _item = styled.div`
    width: 30%;
    aspect-ratio: auto 1 / 1;
    border: 1px solid black;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const _modalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10001;
`;

const _dialogBox = styled.dialog`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 10000;
    overflow: hidden;
`;

const _backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { TodayFoodModal };
