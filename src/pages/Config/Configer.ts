import { imageHandlerConfig } from '../Type/Type';

export const Configer: imageHandlerConfig = {
    bucketName: 'doongg-bucket',
    region: 'ap-northeast-2',
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID || 'none',
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || 'none',
};
