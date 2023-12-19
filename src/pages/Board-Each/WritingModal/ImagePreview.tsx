import { styled } from 'styled-components';
import { useState } from 'react';
import { imageDataType } from '../../Type/Type';

const ImagePreview = (props: {
    thumbnailChooser: (type: string, id: string) => void;
    image: imageDataType;
    imageDeleter: (desc: string, url: string) => void;
}) => {
    const { imageType, description, url } = props.image;

    const imageDeleteHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        let temper = window.confirm(
            '이미지를 삭제하시겠습니까? (복사된 이미지까지 전부 삭제됩니다)',
        );
        if (temper) {
            props.imageDeleter(description, url);
        }
    };

    return (
        <_shelfImageWrapper
            onClick={() => {
                props.thumbnailChooser(imageType, description);
            }}
        >
            <_shelfImage
                style={{
                    border:
                        imageType == 'thumbnail'
                            ? '1px solid blue'
                            : '1px solid black',
                }}
                src={url}
            ></_shelfImage>
            <_imageDeleter onClick={imageDeleteHandler}>x</_imageDeleter>
        </_shelfImageWrapper>
    );
};

const _shelfImage = styled.img`
    position: relative;
    width: 90%;
    height: 90%;
`;

const _shelfImageWrapper = styled.div`
    width: 80px;
    height: 80px;
    margin: 5px;
`;

const _imageDeleter = styled.div`
    cursor: pointer;
    position: absolute;
    margin-top: -80px;
    margin-left: 8px;
`;

export { ImagePreview };
