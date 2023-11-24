import React, { useRef, useState, PropsWithChildren, useMemo } from 'react';
import { BoardStore } from '../store/storeT';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import AWS from 'aws-sdk';
import ReactS3Client from 'react-aws-s3-typescript';
import axios from 'axios';

function Modal() {
    let myRef = useRef<ReactQuill>(null);
    let tagRef = useRef<any>(null);
    const { postModalOn, setPostModalOn } = BoardStore();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState(' ');
    const [commentAllowed, setCommentAllowed] = useState(true);
    const [currentTag, setCurrentTag] = useState('');
    const [tagExsist, setTagExsist] = useState(false);
    const [tags, setTags] = useState<any>([]);

    const handleTitleChange = (e: any) => {
        setTitle(e.currentTarget.value);
    };
    const handleCommentAllow = (e: any) => {
        console.log(e.currentTarget.value);
        if (e.currentTarget.value == 'true') {
            setCommentAllowed(true);
        } else {
            setCommentAllowed(false);
        }
    };

    const handleTag = (e: any) => {
        setCurrentTag(e.current.value);
    };

    const tagAdder = (e: any) => {
        if (e.key == 'Enter') {
            if (tagRef.current) {
                if (currentTag.length > 0 && !tags.includes(currentTag)) {
                    setTags([...tags, currentTag]);
                    setCurrentTag('');
                } else {
                    setCurrentTag('');
                }
            }
        }
    };

    const tagSubtracter = (tagContent: any) => {
        let temp = [];
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] !== tagContent) {
                temp.push(tags[i]);
            }
        }
        setTags(temp);
    };

    const config: any = {
        bucketName: 'doongg-bucket',
        region: 'ap-northeast-2',
        accessKeyId: 'AKIAV64KNCLEKO47QYL4',
        secretAccessKey: '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',
    };
    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.addEventListener('change', async () => {
            const file: any = input.files?.[0];
            console.log(file);
            try {
                const s3 = new ReactS3Client(config);
                let fullName = file.name.split('.')[0] + Date.now();
                const res = await s3.uploadFile(file, fullName);
                console.log(res);
                if (myRef.current) {
                    const editor = myRef.current.getEditor();
                    const range: any = editor.getSelection();
                    editor.insertEmbed(range.index, 'image', res.location);
                }
            } catch (error) {
                console.log(error);
            }
        });
    };
    const modules = useMemo<any>(() => {
        return {
            toolbar: {
                container: [
                    ['image'],
                    [{ header: [1, 2, 3, 4, 5, false] }],
                    ['bold', 'underline'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        };
    }, []);

    const postComplete = async () => {
        let res = await axios({
            method: 'post',
            url: `http://localhost:8080/boards`,
            data: {
                title: title,
                content: content,
                views: 0,
                board: {
                    boardId: 1,
                },
                user: {
                    id: 1,
                },
                commentAllowed: commentAllowed ? 'true' : 'false',
            },
        });
        if (res.status == 201) {
            alert('글 작성 성공!');
            setPostModalOn(!postModalOn);
        }
        setTitle('');
        setContent('');
        setTags([]);
        setCommentAllowed(true);
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
                        width: '100%',
                        height: '500px',
                        marginBottom: '80px',
                    }}
                    modules={modules}
                    onChange={setContent}
                />
                <div>
                    <_tagBox ref={tagRef}>
                        {tags.map((tagContent: any) => {
                            return (
                                <_eachTag
                                    onClick={() => tagSubtracter(tagContent)}
                                >
                                    {tagContent}
                                </_eachTag>
                            );
                        })}
                    </_tagBox>
                    <input
                        onKeyDown={tagAdder}
                        onChange={(e) => {
                            setCurrentTag(e.currentTarget.value);
                        }}
                        type="text"
                        value={currentTag}
                    ></input>
                </div>
                <_buttonPlace>
                    <button onClick={postComplete}>작성</button>
                    <div>
                        <div>댓글허용</div>
                        <div>
                            <span>
                                허용
                                <input
                                    name="commentAllow"
                                    value="true"
                                    type="radio"
                                    onChange={handleCommentAllow}
                                ></input>
                            </span>
                            <span>
                                비허용
                                <input
                                    name="commentAllow"
                                    value="false"
                                    type="radio"
                                    onChange={handleCommentAllow}
                                ></input>
                            </span>
                        </div>
                    </div>
                </_buttonPlace>
            </_dialogBox>
            <_backdrop
                onClick={() => {
                    console.log(content);
                    if (content.length > 0) {
                        let confirmNotice = window.confirm(
                            '창을 끄면 작성중인 내용이 삭제됩니다. 창을 끄시겠습니까?',
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

const _eachTag = styled.div`
    height: 20px;
    margin: 5px;
    padding: 2px;
    border-radius: 5px;
    background-color: red;
    cursor: pointer;
`;

const _tagBox = styled.div`
    border: 1px solid black;
    width: 200px;
    min-height: 20px;
    max-height: 60px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
`;

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
