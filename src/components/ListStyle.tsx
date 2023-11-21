import styled from "styled-components";
import { BoardStore } from "../store/storeT";
import { useEffect, useState } from "react";
import ramen from "../assets/ramen1.jpg";
import fox from "../assets/fox.jpg";
import { IoMdPhotos } from "react-icons/io";
import { BoardUpperPart } from "./BoardUpperPart";

const _listContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: auto;
  /* background-color: #cccccc; */
  margin: 0px 0px 20px 0px;
`;

const _listRow = styled.table`
  width: 80%;
  font-size: 16px;
  border-spacing: 0 10px;
  cursor: pointer;
  & #title {
    text-align: start;
  }
  & #title:hover {
    text-decoration: underline;
  }
`;

const _th = styled.th`
  border-bottom: 1px solid #000;
`;

const _td = styled.td`
  border-bottom: 1px solid #000;
`;

const _titleTd = styled.td`
  border-bottom: 1px solid #000;
  display: flex;
  flex-direction: row;
`;

const ListStyle = () => {
  const {
    listData,
    setListData,
    detailModalOn,
    setDetailModalOn,
    onePageData,
    setOnePageData,
  } = BoardStore();
  const [postNum, setPostNum] = useState(0);
  const [whichOrder, setWhichOrder] = useState(false);

  const pagination = (num: number) => {
    let data = [];
    for (let i = 1; i <= num; i++) {
      data.push(i);
    }

    return (
      <div
        style={{
          margin: "10px",
          width: "60%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {data.map((x) => {
          return (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                generatePage(x);
              }}
            >
              {x}
            </span>
          );
        })}
      </div>
    );
  };

  const sampledb = [
    {
      id: 1,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title:
        "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 2,
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
  ];

  const generatePage = (e: number) => {
    let addArr: any = [];
    for (let i = 16 * (e - 1); i < 16 * e; i++) {
      if (sampledb[i]) {
        addArr.push(sampledb[i]);
      }
    }
    setListData(addArr);
  };

  useEffect(() => {
    generatePage(1);
    setPostNum(10); // 여기에 숫자받은거 계산하는 로직짜기
  }, []);

  const getOnePost = async (id: number) => {
    console.log(id);
    const tempData: any = [
      {
        id: id,
        profileImg: fox,
        title:
          "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
        writer: "여우여우여우여우여우여우여우여우여우",
        date: "2023-11-21 02:23",
        likes: 12,
        views: 121,
        content:
          "일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다일단은사실확인이다v",
        comments: [
          {
            id: 1,
            writer: "늑대",
            date: "2023-11-21 02:25",
            content: "뭐래씹",
            childCommentsList: [
              {
                id: 1,
                writer: "늑대",
                date: "2023-11-21 02:25",
                content: "뭐래씹",
              },
              {
                id: 2,
                writer: "늑대",
                date: "2023-11-21 02:25",
                content: "걍뒤져",
              },
            ],
          },
          {
            id: 2,
            writer: "늑대",
            date: "2023-11-21 02:25",
            content: "걍뒤져",
            childCommentsList: [
              {
                id: 1,
                writer: "늑대늑대늑대늑대늑대늑대늑대늑대",
                date: "2023-11-21 02:25",
                content: "뭐래씹",
              },
              {
                id: 2,
                writer: "늑대",
                date: "2023-11-21 02:25",
                content: "걍뒤져",
              },
            ],
          },
        ],
      },
    ];
    setOnePageData(tempData);
  };

  useEffect(() => {
    if (onePageData.length > 0) {
      setDetailModalOn(true);
    }
  }, [onePageData]);

  return (
    <_listContainer>
      <BoardUpperPart />
      <_listRow>
        <tr>
          <_th style={{ width: "100px" }}>번호</_th>
          <_th>제목</_th>
          <_th style={{ width: "100px" }}>조회수</_th>
          <_th style={{ width: "100px" }}>추천수</_th>
        </tr>
        {listData.map((x: any, index: number) => {
          return (
            <>
              <tr
                onClick={() => {
                  getOnePost(x.id);
                }}
              >
                <_td>{index}</_td>
                <_titleTd id="title">
                  <div style={{ color: "orange" }}>
                    {x.url && <IoMdPhotos />}
                  </div>
                  <div>
                    {x.title} [{x.comments}]
                  </div>
                </_titleTd>
                <_td>{x.visits}</_td>
                <_td>{x.likes}</_td>
              </tr>
            </>
          );
        })}
      </_listRow>
      {pagination(postNum)}
    </_listContainer>
  );
};

export { ListStyle };
