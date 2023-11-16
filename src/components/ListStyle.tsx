import styled from "styled-components";
import { BoardStore } from "../store/storeT";
import { useEffect, useState } from "react";
import ramen from "../assets/ramen1.jpg";
import fox from "../assets/fox.jpg";
import { Search } from "./Search";

const _listContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 700px;
  background-color: #cccccc;
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

const ListStyle = () => {
  const { listData, setListData } = BoardStore();
  const [postNum, setPostNum] = useState(10);

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
          return <span>{x}</span>;
        })}
      </div>
    );
  };

  useEffect(() => {
    setListData([
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
    ]);
    // setPostNum()
  }, []);
  return (
    <_listContainer>
      <Search />
      <_listRow>
        <tr>
          <th style={{ width: "100px", borderBottom: "1px solid #000" }}>
            번호
          </th>
          <th style={{ borderBottom: "1px solid #000" }}>제목</th>
          <th style={{ borderBottom: "1px solid #000" }}>조회수</th>
          <th style={{ borderBottom: "1px solid #000" }}>추천수</th>
        </tr>
        {listData.map((x: any, index: number) => {
          return (
            <>
              <tr>
                <td style={{ borderBottom: "1px solid #000" }}>{index}</td>
                <td style={{ borderBottom: "1px solid #000" }} id="title">
                  {x.title} [{x.comments}]
                </td>
                <td style={{ borderBottom: "1px solid #000" }}>{x.visits}</td>
                <td style={{ borderBottom: "1px solid #000" }}>{x.likes}</td>
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
