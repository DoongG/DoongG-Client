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
import { IoIosClose } from 'react-icons/io';

// 글 수정 모달 컴포넌트
function UpdateModal() {
    let myRef = useRef<ReactQuill>(null);
    let tagRef = useRef<any>(null);
    const {
        onePageData,
        setOnePageData,
        postModalOn,
        setPostModalOn,
        setSignal,
        signal,
        updateModal,
        setUpdateModal,
        updatePostId,
        boardId,
    } = BoardStore();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [commentAllowed, setCommentAllowed] = useState(true);
    const [currentTag, setCurrentTag] = useState('');
    const [inputImage, setInputImage] = useState<any>(null);
    const [tagExsist, setTagExsist] = useState(false);
    const [tags, setTags] = useState<any>([]);
    const [images, setImages] = useState<any>([]);
    const [token, setToken] = useState<any>('');

    // 제목 핸들러
    const handleTitleChange = (e: any) => {
        console.log(e.currentTarget.value.length);
        if (e.currentTarget.value.length <= 50) setTitle(e.currentTarget.value);
        else alert('최대 50글자까지 가능합니다');
    };

    // 내용 핸들러
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

    // 태그 추가하는 함수
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

    // 태그 빼는 함수
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

    // 이미지 링크 생성기 및 게시글 창에 이미지 띄우는 함수
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

    // 이미지 핸들러 작동 완료시 이미지 url 생성하는 함수 발생하는 이펙트
    useEffect(() => {
        imageSender(inputImage, images);
    }, [inputImage]);

    // 이미지 핸들러
    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = () => {
            setInputImage(input);
        };
    };

    // react-quill 모듈
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

    // 글 업데이트 함수
    const postUpdatePost = async () => {
        if (!localStorage.getItem('token')) {
            alert('로그인 된 상태가 아닙니다');
            return;
        }
        console.log(token);
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
                boardId: boardId,
                // boardId: 1,
            },
            // user: {
            //     id: 1,
            // },
            commentAllowed: commentAllowed ? 'true' : 'false',
            commentCount: 0,
            hashtags: tagTempArr,
            postImages: images,
        };
        let res = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_KEY}/boardsAuth/updatePost/${updatePostId}`,
            data: data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);

        let res2 = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_KEY}/boards/posts/${onePageData[0]?.postId}`,
        });
        console.log(res2);
        setOnePageData([res2.data]);

        alert('글 수정 성공!');
        setSignal(!signal);
        setTitle('');
        setContent('');
        setTags([]);
        setUpdateModal(!updateModal);
    };

    // 이미지 업데이트 모달 발동시 기존 데이터 세팅 이펙트
    useEffect(() => {
        setTitle(onePageData[0].title);
        setContent(onePageData[0].content);
        let tagTemps = [];
        for (let i = 0; i < onePageData[0].hashtags.length; i++) {
            tagTemps.push(onePageData[0].hashtags[i].hashtagName);
        }
        setTags(tagTemps);
        setImages(onePageData[0].postImages);
        setCommentAllowed(
            onePageData[0].commentAllowed == 'true' ? true : false,
        );
    }, [updateModal]);

    // 썸네일 고르는 함수
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

    // 이미지 삭제 함수
    const imageDelete = (type: any, id: any, url: any) => {
        let temp = [];
        let typeCheck = [];
        for (let i = 0; i < images.length; i++) {
            if (images[i].description !== id) {
                temp.push(images[i]);
                typeCheck.push(images[i].imageType);
            }
        }
        if (!typeCheck.includes('thumbnail')) {
            if (temp.length > 0) {
                temp[0].imageType = 'thumbnail';
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

    // 렌더링시 토큰 등록
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    return (
        <_modalContainer>
            <_dialogBox>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <IoIosClose
                        style={{
                            cursor: 'pointer',
                            fontSize: '20px',
                            marginBottom: '10px',
                        }}
                        onClick={() => {
                            let confirmNotice = window.confirm(
                                '창을 끄면 작성중인 내용이 삭제됩니다. 창을 끄시겠습니까?',
                            );
                            if (confirmNotice) {
                                setUpdateModal(!updateModal);
                            }
                        }}
                    />
                </div>
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
                                        checked={commentAllowed ? true : false}
                                        onChange={handleCommentAllow}
                                    ></input>
                                </span>{' '}
                                <span>
                                    비허용
                                    <input
                                        name="commentAllow"
                                        value="false"
                                        type="radio"
                                        checked={commentAllowed ? false : true}
                                        onChange={handleCommentAllow}
                                    ></input>
                                </span>
                            </div>
                        </div>
                    </_buttonPlace>
                    <_postButton onClick={postUpdatePost}>수정</_postButton>
                </_belowPlace>
            </_dialogBox>
            <_backdrop
                onClick={() => {
                    let confirmNotice = window.confirm(
                        '창을 끄면 작성중인 내용이 삭제됩니다. 창을 끄시겠습니까?',
                    );
                    if (confirmNotice) {
                        setUpdateModal(!updateModal);
                    }
                }}
            />
        </_modalContainer>
    );
}

const _postButton = styled.button`
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 5px;
    /* &:hover {
        background-color: #1c393d;
    } */
`;

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
    z-index: 4999;
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
    z-index: 4998;
    overflow: hidden;
    margin-top: -100px;
`;

const _backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 4997;
    background-color: rgba(0, 0, 0, 0.2);
`;

export { UpdateModal };
