import React, { useRef, useState, PropsWithChildren } from "react";
import { BoardStore } from "../store/storeT";
import styled from "styled-components";
import ReactQuill from "react-quill";
import AWS from "aws-sdk";
import axios from "axios";

function Modal() {
  let myRef = useRef<ReactQuill>(null);
  const { postModalOn, setPostModalOn } = BoardStore();
  const [content, setContent] = useState("");
  console.log(content);
  const [title, setTitle] = useState(" ");
  const handleTitleChange = (e: any) => {
    setTitle(e.currentTarget.value);
  };
  const handleSubmit = async () => {
    const date = new Date();
    //  try {
    //    await createPost({
    //      title: title,
    //      content,
    //      date,
    //    }).then((res) => console.log(res));
    //  } catch (error) {
    //    console.log(error);
    //  }
  };
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      //이미지를 담아 전송할 file을 만든다
      const file = input.files?.[0];
      try {
        //업로드할 파일의 이름으로 Date 사용
        const name = Date.now();
        //생성한 s3 관련 설정들
        // AWS.config.update({
        //   region: REGION,
        //   accessKeyId: ACCESS_KEY,
        //   secretAccessKey: SECRET_ACCESS_KEY,
        // });
        //앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
        const upload = new AWS.S3.ManagedUpload({
          params: {
            ACL: "public-read",
            Bucket: "itsmovietime", //버킷 이름
            Key: `upload/${name}`,
            Body: file,
          },
        });
        //이미지 업로드 후
        //곧바로 업로드 된 이미지 url을 가져오기
        const IMG_URL = await upload.promise().then((res) => res.Location);
        //useRef를 사용해 에디터에 접근한 후
        //에디터의 현재 커서 위치에 이미지 삽입
        if (myRef.current) {
          const editor = myRef.current.getEditor();
          const range: any = editor.getSelection();
          // 가져온 위치에 이미지를 삽입한다
          editor.insertEmbed(range.index, "image", IMG_URL);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  const modules = {
    toolbar: {
      container: [
        ["image"],
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline"],
      ],
      //   handlers: {
      //     image: imageHandler,
      //   },
    },
  };
  return (
    <_modalContainer>
      <_dialogBox>
        <_titleInput
          placeholder=" 제목을 입력하세요"
          id="title"
          type="text"
          onChange={handleTitleChange}
          spellCheck={false}
        />
        <ReactQuill
          ref={myRef}
          // 스타일 이거 반응형 맞춰야함
          style={{
            padding: 0,
            width: "100%",
            height: "500px",
            marginBottom: "80px",
          }}
          modules={modules}
          onChange={setContent}
        />
        <_buttonPlace>
          <button>작성</button>
        </_buttonPlace>
      </_dialogBox>
      <_backdrop
        onClick={() => {
          if (content.length > 0) {
            let confirmNotice = window.confirm(
              "창을 끄면 작성중인 내용이 삭제됩니다. 창을 끄시겠습니까?"
            );
            if (confirmNotice) {
              setPostModalOn(!postModalOn);
            }
          } else {
            setPostModalOn(!postModalOn);
          }
        }}
      />
    </_modalContainer>
  );
}

const _buttonPlace = styled.div`
  display: flex;
`;

const _titleInput = styled.input`
  outline: none;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
  height: 30px;
  padding: 0;
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

export { Modal };
