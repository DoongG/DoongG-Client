export interface User {
    pk: number;
    email: string;
    password: string;
    nickname: string;
    profileImg: string | null;
    role: boolean;
    phone_number: string;
}

export const UserData: User[] = [
    {
        pk: 1,
        email: 'alenen0227@naver.com',
        password: '11111111',
        nickname: 'keeemhs',
        profileImg: '',
        role: false,
        phone_number: '01037380591',
    },
];
