export type BoardAll = {
    boardName: string;
    posts: EachPost[];
};

export type EachPost = {
    boardName: string;
    postId: number;
    title: string;
    createdAt: string;
};

export type imageDataType = {
    description: string;
    url: string;
    imageType: string;
};

export type imageHandlerConfig = {
    bucketName: string;
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
};

export type boardType = {
    boardDefaultType: string;
    boardId: number;
    boardName: string;
};

export type commentType = {
    commentId: number;
    commenter: userType;
    content: string;
    createdAt: string;
    parentCommentId: number | null;
    post: null;
    updatedAt: string;
};

export type userType = {
    nickname: string;
    profileImg: string;
};

export type hashtagType = {
    hashtagName: string;
};

export type eachDataType = {
    board: boardType;
    commentAllowed: string;
    commentCount: number;
    comments: commentType[];
    content: string;
    createdAt: string;
    dislikeCount: number;
    hashtags: hashtagType[];
    likeCount: number;
    postCount: number;
    postId: number;
    postImages: imageDataType[];
    title: string;
    updatedAt: string;
    user: userType;
    views: number;
};

export type ingredientType = {
    id: number;
    name: string;
};
