import React, {
    useRef,
    useState,
    PropsWithChildren,
    useMemo,
    useEffect,
} from 'react';
import { BoardStore } from '../store/storeT';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import AWS from 'aws-sdk';
import ReactS3Client from 'react-aws-s3-typescript';
import axios from 'axios';

function UpdateModal() {
    let myRef = useRef<ReactQuill>(null);
    let tagRef = useRef<any>(null);
    const {
        onePageData,
        postModalOn,
        setPostModalOn,
        setSignal,
        signal,
        updateModal,
        setUpdateModal,
        updatePostId,
    } = BoardStore();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [commentAllowed, setCommentAllowed] = useState(true);
    const [currentTag, setCurrentTag] = useState('');
    const [inputImage, setInputImage] = useState<any>(null);
    const [tagExsist, setTagExsist] = useState(false);
    const [tags, setTags] = useState<any>([]);
    const [images, setImages] = useState<any>([]);

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

    const imageSender = async (input: any, images: any) => {
        if (input) {
            const file: any = input.files?.[0];
            try {
                const s3 = new ReactS3Client(config);
                let fullName = file.name.split('.')[0] + Date.now();
                const res = await s3.uploadFile(file, fullName);
                if (myRef.current) {
                    const editor = myRef.current.getEditor();
                    const range: any = editor.getSelection();
                    editor.insertEmbed(range.index, 'image', res.location);
                    editor.setSelection(range.index + 1);
                    console.log(images);
                    const eachImage = {
                        url: res.location,
                        imageType: images.length > 0 ? 'contents' : 'thumbnail',
                        description: Date.now(),
                    };
                    setImages((prevList: any) => [...prevList, eachImage]);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        imageSender(inputImage, images);
    }, [inputImage]);

    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = () => {
            setInputImage(input);
        };
    };

    const modules = useMemo<any>(() => {
        return {
            toolbar: {
                container: [
                    ['image'],
                    [{ header: [1, 2, 3, 4, 5, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        };
    }, []);

    const postUpdatePost = async () => {
        let tagTempArr = [];
        for (let i = 0; i < tags.length; i++) {
            let newTag = {
                hashtagName: tags[i],
            };
            tagTempArr.push(newTag);
        }
        let data = {
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
            commentCount: 0,
            hashtags: tagTempArr,
            postImages: images,
        };
        let res = await axios({
            method: 'post',
            url: `http://localhost:8080/boardsAuth/updatePost/${updatePostId}`,
            data: data,
        });
        console.log(res);
        alert('글 수정 성공!');
        setSignal(!signal);
        setTitle('');
        setContent('');
        setTags([]);
        setUpdateModal(!updateModal);
    };

    useEffect(() => {
        setTitle(onePageData[0].title);
        setContent(onePageData[0].content);
        let tagTemps = [];
        for (let i = 0; i < onePageData[0].hashtags.length; i++) {
            tagTemps.push(onePageData[0].hashtags[i].hashtagName);
        }
        setTags(tagTemps);
        setImages(onePageData[0].postImages);
    }, [updateModal]);

    const chooseThumbnail = (type: any, id: any) => {
        if (type == 'contents') {
            let confirmer = window.confirm(
                '해당 이미지를 대표이미지로 선택하시겠습니까?',
            );
            if (confirmer) {
                let copy = images.slice(0);
                for (let i = 0; i < copy.length; i++) {
                    if (copy[i].imageType == 'thumbnail')
                        copy[i].imageType = 'contents';
                    else if (copy[i].description == id) {
                        copy[i].imageType = 'thumbnail';
                    }
                }
                setImages(copy);
            }
        }
    };

    const imageDelete = (type: any, id: any, url: any) => {
        let temp = [];
        for (let i = 0; i < images.length; i++) {
            if (images[i].description !== id) {
                temp.push(images[i]);
            }
        }
        if (myRef.current) {
            const editor = myRef.current.getEditor();
            const content = editor.getContents().ops;
            let renew: any = [];
            if (content) {
                for (let i = 0; i < content?.length; i++) {
                    if (content[i].insert?.image !== url) {
                        renew.push(content[i]);
                    }
                }
            }
            editor.setContents(renew);
        }
        setImages(temp);
    };

    return (
        <_modalContainer>
            <_dialogBox>
                <_titleInput
                    placeholder=" 제목을 입력하세요"
                    id="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    spellCheck={false}
                />
                <_customQuill
                    ref={myRef}
                    // 스타일 이거 반응형 맞춰야함
                    value={content}
                    modules={modules}
                    onChange={setContent}
                />
                <p
                    style={{
                        color: 'grey',
                        margin: 0,
                        width: '99%',
                        textAlign: 'start',
                    }}
                >
                    (이미지를 클릭하여 대표이미지를 정할 수 있습니다)
                </p>
                <div
                    style={{
                        width: '100%',
                        minHeight: '80px',
                        border: '1px solid #ccc',
                        margin: '5px',
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}
                >
                    {images.map((x: any) => {
                        return (
                            <div
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '5px',
                                }}
                                onClick={() => {
                                    chooseThumbnail(x.imageType, x.description);
                                }}
                            >
                                <img
                                    style={{
                                        position: 'relative',
                                        width: '90%',
                                        height: '90%',
                                        border:
                                            x.imageType == 'thumbnail'
                                                ? '1px solid blue'
                                                : '1px solid black',
                                    }}
                                    src={x.url}
                                ></img>
                                <div
                                    style={{
                                        cursor: 'pointer',
                                        position: 'absolute',
                                        marginTop: '-80px',
                                        marginLeft: '8px',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        let temper = window.confirm(
                                            '이미지를 삭제하시겠습니까? (복사된 이미지까지 전부 삭제됩니다)',
                                        );
                                        if (temper) {
                                            imageDelete(
                                                x.imageType,
                                                x.description,
                                                x.url,
                                            );
                                        }
                                    }}
                                >
                                    x
                                </div>
                            </div>
                        );
                    })}
                </div>
                <_belowPlace>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '60%',
                        }}
                    >
                        <_tagBox ref={tagRef}>
                            {tags.map((tagContent: any) => {
                                return (
                                    <_eachTag
                                        onClick={() =>
                                            tagSubtracter(tagContent)
                                        }
                                    >
                                        <b>#{tagContent}</b>
                                    </_eachTag>
                                );
                            })}
                        </_tagBox>
                        <_tagInput
                            placeholder="태그입력후 enter키를 눌러주세요"
                            onKeyDown={tagAdder}
                            onChange={(e) => {
                                setCurrentTag(e.currentTarget.value);
                            }}
                            type="text"
                            value={currentTag}
                        ></_tagInput>
                    </div>
                    <_buttonPlace>
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
                    <button onClick={postUpdatePost}>수정</button>
                </_belowPlace>
            </_dialogBox>
            <_backdrop
                onClick={() => {
                    if (content.length > 0) {
                        let confirmNotice = window.confirm(
                            '창을 끄면 작성중인 내용이 삭제됩니다. 창을 끄시겠습니까?',
                        );
                        if (confirmNotice) {
                            setUpdateModal(!updateModal);
                        }
                    } else {
                        setUpdateModal(!updateModal);
                    }
                }}
            />
        </_modalContainer>
    );
}

const _customQuill = styled(ReactQuill)`
    padding: 0;
    width: 100%;
    height: 280px;
    max-height: 500px;
    margin-bottom: 80px;
    & .ql-editor {
        max-height: 500px;
    }
`;

const _belowPlace = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const _tagInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
`;

const _tagBox = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
    min-height: 20px;
    max-height: 60px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
`;
const _eachTag = styled.div`
    height: 25px;
    margin: 5px;
    padding: 2px;
    border-radius: 5px;
    background-color: #daddb1;
    display: flex;
    justify-content: center;
    cursor: pointer;
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
    margin-top: -100px;
`;

const _backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { UpdateModal };
