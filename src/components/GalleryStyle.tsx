import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaRegComment } from "react-icons/fa";
import ramen from "../assets/ramen1.jpg";
import fox from "../assets/fox.jpg";
import eyes from "../assets/eyes.png";
import { BoardStore } from "../store/storeT";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { BoardUpperPart } from "./BoardUpperPart";
import { PostModal } from "./PostModal";

const _allArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const _cardContainer = styled.div`
  width: 95vw;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const _cardBox = styled.div`
  width: 300px;
  height: 320px;
  display: flex;
  margin: 20px;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  &:hover {
    box-shadow: 5px 5px 5px gray;
    & #title {
      text-decoration: underline;
    }
    & #img {
      width: 100%;
      height: 100%;
      object-fit: none;
    }
  }
  cursor: pointer;
`;

const _cardDisplay = styled.div`
  width: 300px;
  height: 210px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 10px;
`;

const _card = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 10px;
  object-fit: cover;
`;

const _cardTitle = styled.p`
  width: 90%;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: start;
  margin: 2px 2px 2px 0px;
`;

const _cardLike = styled.div`
  position: absolute;
  margin-top: 15px;
  margin-left: -200px;
  text-align: start;
  font-size: 25px;
  color: red;
`;

const _cardInst = styled.div`
  display: flex;
  margin-top: 5px;
`;

const _cardLeft = styled.div`
  padding: 10px;
`;

const _cardRight = styled.div``;

const _cardWriter = styled.div`
  width: 100%;
  font-size: 15px;
  text-align: start;
  font-weight: 600;
`;

const _cardProfileImg = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const _cardFooter = styled.div`
  width: 100%;
  display: flex;
  margin: 5px 5px 5px 25px;
`;

const _cardFooterSection = styled.div`
  margin: 0px 5px 0px 5px;
`;

const GalleryStyle = () => {
  const { detailModalOn, setDetailModalOn, onePageData, setOnePageData } =
    BoardStore();
  const [reference, inView] = useInView();
  const [loadedData, setLoadedData] = useState<any>([]);
  const [getCount, setGetCount] = useState(0);
  const [stop, setStop] = useState(false);
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
      id: 3,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 4,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 5,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 6,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 7,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 8,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 9,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 10,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 11,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 12,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 13,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 14,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 15,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 16,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 17,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 18,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 19,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 20,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 21,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 22,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 23,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 24,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 25,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 26,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      id: 27,
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
  ];
  const dataGenerate = () => {
    let addArr: any = [];
    let tempStop = stop;
    for (let i = 12 * getCount; i < 12 * (getCount + 1); i++) {
      if (sampledb[i]) {
        addArr.push(sampledb[i]);
      } else {
        if (tempStop == false) {
          addArr.push({ status: "dummy" });
          tempStop = true;
          setStop(true);
        }
      }
    }
    console.log(addArr);
    setLoadedData((prevState: any) => prevState.concat(addArr));
    setGetCount((prevState: any) => prevState + 1);
  };

  useEffect(() => {
    if (inView) {
      dataGenerate();
    }
  }, [inView]);

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
    <_allArea>
      <BoardUpperPart></BoardUpperPart>
      <_cardContainer>
        {loadedData?.map((x: any) => {
          return !x.status ? (
            <div>
              <_cardBox
                onClick={() => {
                  getOnePost(x.id);
                }}
              >
                <_cardLike>
                  <FontAwesomeIcon icon={faHeart} />
                  {x.likes}
                </_cardLike>
                <_cardDisplay>
                  <_card id="img" src={x.url} />
                </_cardDisplay>
                <_cardInst>
                  <_cardLeft>
                    <_cardProfileImg src={x.profileImg}></_cardProfileImg>
                  </_cardLeft>
                  <_cardRight>
                    <_cardTitle id="title">{x.title}</_cardTitle>
                    <_cardWriter>{x.writer}</_cardWriter>
                  </_cardRight>
                </_cardInst>
                <_cardFooter>
                  <_cardFooterSection>
                    <img style={{ width: "15px" }} src={eyes}></img>
                    {x.visits}
                  </_cardFooterSection>
                  <_cardFooterSection>
                    <FaRegComment
                      style={{ fontSize: "12px", marginTop: "5px" }}
                    />
                    {x.comments}
                  </_cardFooterSection>
                </_cardFooter>
              </_cardBox>
            </div>
          ) : (
            <div
              style={{ width: "300px", height: "320px", margin: "20px" }}
            ></div>
          );
        })}
      </_cardContainer>
      <div
        ref={reference}
        onClick={() => {
          console.log(loadedData);
        }}
      >
        더보기
      </div>
    </_allArea>
  );
};

export { GalleryStyle };
