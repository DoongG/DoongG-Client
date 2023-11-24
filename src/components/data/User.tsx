import profileImg from '../../assets/shopping2.jpg';
export interface User {
    pk: number;
    email: string;
    password: string;
    nickname: string;
    profileImg: string | null;
    phone_number: string;
}

export const UserData: User[] = [
    {
        pk: 1,
        email: 'alenen0227@naver.com',
        password: '11111111',
        nickname: 'keeemhs',
        profileImg: profileImg,
        phone_number: '01037380591',
    },
    {
        pk: 2,
        email: 'uhting2@naver.com',
        password: '11111111',
        nickname: 'gyu',
        profileImg: '',
        phone_number: '01011111111',
    },
];
