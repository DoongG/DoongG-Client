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

const ListStyle = () => {
  const { listData, setListData } = BoardStore();
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

  return (
    <_listContainer>
      <BoardUpperPart />
      <_listRow>
        <tr>
          <_th style={{ width: "100px" }}>번호</_th>
          <_th>제목</_th>
          <_th>조회수</_th>
          <_th>추천수</_th>
        </tr>
        {listData.map((x: any, index: number) => {
          return (
            <>
              <tr>
                <_td>{index}</_td>
                <_td id="title">
                  <span style={{ color: "orange" }}>
                    {x.url && <IoMdPhotos />}
                  </span>{" "}
                  {x.title} [{x.comments}]
                </_td>
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
