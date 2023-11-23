import { Header } from '../components/Header';
import { styled } from 'styled-components';

const _hr = styled.hr`
    /* width: 100%; */
`;

const _rightSection = styled.div`
    width: 150px;
    height: 200px;
    border: 1px solid black;
`;

const _backArea = styled.div`
    width: 100%;
    background-color: white;
    display: flex;
`;

const _allBoardArea = styled.div`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
`;

const _eachBoardArea = styled.div`
    min-width: 40%;
    text-align: start;
    margin: 5px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* height: 200px; */
`;

const _boardTitleArea = styled.div`
    padding: 5px 5px 5px 5px;
    width: 100%;
    border: 2px solid #cbffd3;
    border-radius: 20px;
`;

const _eachPost = styled.div`
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BoardUnited = () => {
    const sampleDB = [
        {
            name: '라면 게시판',
            recentPost: [
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
            ],
        },
        {
            name: '냉면 게시판',
            recentPost: [
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
            ],
        },
        {
            name: '짬뽕 게시판',
            recentPost: [
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
            ],
        },
        {
            name: '쫄면 게시판',
            recentPost: [
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
            ],
        },
        {
            name: '우동 게시판',
            recentPost: [
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
                {
                    title: '아오이거뭐냐',
                    date: '23-11-22 11/22',
                },
            ],
        },
    ];
    return (
        <>
            <Header></Header>
            <_backArea>
                <_allBoardArea>
                    {sampleDB.map((x) => {
                        return (
                            <_eachBoardArea>
                                <_boardTitleArea>{x.name}</_boardTitleArea>
                                {x.recentPost.map((y, index) => {
                                    return (
                                        <>
                                            <_eachPost>
                                                <div>{y.title}</div>
                                                <div>{y.date}</div>
                                            </_eachPost>
                                            {x.recentPost.length !==
                                            index + 1 ? (
                                                <_hr></_hr>
                                            ) : null}
                                        </>
                                    );
                                })}
                            </_eachBoardArea>
                        );
                    })}
                </_allBoardArea>
                <_rightSection></_rightSection>
            </_backArea>
        </>
    );
};

export { BoardUnited };
