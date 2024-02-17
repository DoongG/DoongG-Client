import { useEffect, useState } from 'react';

export default function useFetchToken() {
    const [token, setToken] = useState<string | null>(null); // 사용자 인증 토큰

    //jwt 토큰 가져오는 함수
    useEffect(() => {
        const fetchToken = async () => {
            if (localStorage.getItem('token')) {
                const storedToken = JSON.parse(
                    localStorage.getItem('token') || '',
                )?.value;
                setToken(storedToken);
            } else {
                setToken('');
            }
        };
        fetchToken();
    }, []);
    return token;
}
