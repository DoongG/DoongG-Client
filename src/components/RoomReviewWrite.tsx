import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useButtonHoverd } from '../store/shoppingHeaderSelectBarStore';

interface Props {
    address: string;
    mylat: number;
    mylng: number;
}
interface CssProps {
    isButtonHovered: boolean;
}
const RoomReviewWrite: React.FC<Props> = ({ address, mylat, mylng }) => {
    const [content, setContent] = useState('');
    const [modalShow, setModalShow] = useState(false);
    // false = input이 클릭되어 있지 않을 때, true = input이 클릭되어 있을 때
    let [isInputClicked, setIsInputClicked] = useState(false);
    // 글쓰는 컴포넌트 활성화 상태
    const { isButtonHovered, setIsButtonHovered } = useButtonHoverd();

    // content 변경함수
    const onChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = (
        e,
    ) => {
        setContent(e.target.value);
    };

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
        };
        fetchToken();
    }, []);

    //모달 창
    function MyVerticallyCenteredModal(props: any) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        경고❗
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>당신의 자취방이 맞으신가요?</h4>
                    <p>
                        만약 거짓으로 작성된 내용이 금전적 이득을 얻기 위한
                        사기행위의 일부로 여겨진다면, 사기에 대한 형사 책임이
                        발생할 수 있습니다. 또한, 허위 진술에 대한 법적 책임도
                        발생할 수 있습니다.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>취소</Button>
                    <Button onClick={submitAddress}>확인</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    // 주소,리뷰 post 함수
    const submitAddress = () => {
        console.log(token);
        axios
            .post(
                `${process.env.REACT_APP_API_KEY}/roomRivewWrite`,
                {
                    address: address,
                    content: content,
                    latitude: mylat,
                    longitude: mylng,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )
            .then(function (response) {
                setContent('');
                setModalShow(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <_reviewComponent
                className="reviewComponent"
                isButtonHovered={isButtonHovered}
            >
                <form>
                    <_reviewBox className="reviewBox">
                        <div className="titleBox">
                            <_title className="title">
                                자취방 후기 남기기
                            </_title>
                        </div>

                        <_infosBox className="infosBox">
                            <_addressBox className="addressBox">
                                <_addressTitle className="addressTitle">
                                    주소
                                </_addressTitle>
                                :
                                <_address className="address">
                                    {address}
                                </_address>
                            </_addressBox>
                            <_contentBox className="contentBox">
                                <_contentLabel htmlFor="content">
                                    후기
                                </_contentLabel>
                                :
                                <_content
                                    id="content"
                                    name="content"
                                    className="content"
                                    placeholder={
                                        isInputClicked === true
                                            ? ''
                                            : '소중한 후기를 남겨주세요.'
                                    }
                                    rows={10}
                                    onChange={onChangeContent}
                                    value={content}
                                    // onfocus="this.placeholder = ''"
                                    // 클릭될 때 작동
                                    onFocus={() => {
                                        setIsInputClicked(true);
                                    }}
                                />
                            </_contentBox>
                        </_infosBox>
                        <_ButtonBox className="buttonBox">
                            <button
                                type="button"
                                onClick={() => {
                                    setModalShow(true);
                                }}
                            >
                                리뷰 달기
                            </button>
                        </_ButtonBox>
                    </_reviewBox>
                </form>
            </_reviewComponent>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};
const _reviewComponent = styled.div<CssProps>`
    background-color: white;
    width: 20%;
    ${(props) => props.isButtonHovered && `opacity: 0.5;`}
    @media (max-width: 991px) {
        width: 25%;
    }
    @media (max-width: 767px) {
        width: 38%;
    }
`;
const _reviewBox = styled.div`
    margin-top: 10px;
    padding: 0px 10px;

    > div {
        border-radius: 5px;
    }
`;
const _title = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    background-color: rgb(28, 57, 61);
    border-radius: 5px;
    color: white;
    padding: 10px 0px;
    @media (max-width: 767px) {
        font-size: 14px;
    }
    @media (max-width: 575px) {
        font-size: 10px;
        padding: 7px 0px;
    }
`;
const _infosBox = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    margin-top: 5px;
    padding: 10px 0px;
    border-radius: 5px;
    border: 2px solid rgb(28, 57, 61);
    font-weight: 300;

    > div {
        font-size: 13px;
        display: flex;
        justify-content: center;
        @media (max-width: 575px) {
            font-size: 10px;
        }
    }
`;
const _addressBox = styled.div`
    padding-bottom: 10px;
    position: relative;

    &::before {
        background-color: #00000040;
        content: '';
        position: absolute;
        bottom: -3px;
        width: 90%;
        height: 3px;
    }
`;
const _addressTitle = styled.div`
    width: 30%;
`;
const _address = styled.div`
    width: 70%;
    padding: 0px 10px;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    margin: 0px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;
const _contentBox = styled.div`
    margin-top: 10px;
    @media (max-width: 767px) {
        height: 120px;
    }
    @media (max-width: 575px) {
        height: 70px;
    }
`;
const _contentLabel = styled.label`
    width: 30%;
`;
const _content = styled.textarea`
    width: 70%;
    padding: 3px 10px;
    border: none;
    resize: none;
    outline: none;
    font-weight: 300;
`;
const _ButtonBox = styled.div`
    @font-face {
        font-family: 'JalnanGothic';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'JalnanGothic';
    background-color: rgb(28, 57, 61);
    border-radius: 5px;
    color: white;
    /* background-color: #b3a492 !important; */
    margin-top: 10px;
    /* border: 1px solid grey; */
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid black;
    @media (max-width: 575px) {
        padding: 5px;
    }
    button {
        border: none;
        color: white;
        background-color: rgb(28, 57, 61);
        width: 100%;
        text-align: center;
        border-radius: 3px;
        font-size: 17px;
        width: 100%;
        cursor: pointer;
        @media (max-width: 767px) {
            font-size: 14px;
        }
        @media (max-width: 575px) {
            font-size: 10px;
        }
    }
`;
export { RoomReviewWrite };
