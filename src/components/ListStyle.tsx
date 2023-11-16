import styled from "styled-components";
import { BoardStore } from "../store/storeT";
import { useEffect, useState } from "react";
import ramen from "../assets/ramen1.jpg";
import fox from "../assets/fox.jpg";

const _listContainer = styled.div`
  display: flex;
  justify-content: center;
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
  const [postNum, setPostNum] = useState();

  const pagination = () => {
    return <></>;
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
      <_listRow>
        <tr>
          <th style={{ width: "120px" }}>번호</th>
          <th>제목</th>
          <th>댓글</th>
          <th>조회수</th>
        </tr>
        {listData.map((x: any, index: number) => {
          return (
            <tr>
              <td>{index}</td>
              <td id="title">{x.title}</td>
              <td>{x.comments}</td>
              <td>{x.visits}</td>
            </tr>
          );
        })}
      </_listRow>
    </_listContainer>
  );
};

export { ListStyle };
