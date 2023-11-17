import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaRegComment } from "react-icons/fa";
import ramen from "../assets/ramen1.jpg";
import fox from "../assets/fox.jpg";
import eyes from "../assets/eyes.png";
import { BoardStore } from "../store/storeT";
import axios from "axios";
import { useInView } from "react-intersection-observer";

const _allArea = styled.div``;

const _cardContainer = styled.div`
  width: 90vw;
  display: flex;
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
  margin-top: -200px;
  margin-left: 100px;
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
  const [reference, inView] = useInView();
  const [loadedData, setLoadedData] = useState<any>([]);
  const [getCount, setGetCount] = useState(0);
  const sampledb = [
    {
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
      url: fox,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
      url: ramen,
      profileImg: fox,
      writer: "여우",
      title: "미쳐버린개존맛라면레시피와이건히트다ㄹㅇ로",
      comments: 12,
      likes: 12,
      visits: 121,
    },
    {
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
    for (let i = 12 * getCount; i < 12 * (getCount + 1); i++) {
      if (sampledb[i]) {
        addArr.push(sampledb[i]);
      }
    }
    setLoadedData((prevState: any) => prevState.concat(addArr));
    setGetCount((prevState: any) => prevState + 1);
  };

  useEffect(() => {
    if (inView) {
      dataGenerate();
    }
  }, [inView]);

  return (
    <_allArea>
      <_cardContainer>
        {loadedData?.map((x: any) => {
          return (
            <div>
              {/* <_cardLike>♥{x.likes}</_cardLike> */}
              <_cardBox>
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
          );
        })}
      </_cardContainer>
      <div ref={reference}>더보기</div>
    </_allArea>
  );
};

export { GalleryStyle };
