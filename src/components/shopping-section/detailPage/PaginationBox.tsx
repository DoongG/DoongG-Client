/* eslint-disable react/jsx-pascal-case */
import styled from 'styled-components';
// pagination mui
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { useEffect, useState } from 'react';
import { Product_t } from 'types/shoppingDetail';
import { usePagination } from 'store/shoppingHeaderSelectBarStore';

export default function PaginationBox(props: Product_t) {
    const { setPageArr } = usePagination();
    const { ...fetchData } = props;
    const [page, setPage] = useState(1); // 시작 페이지
    const reveiwLength = fetchData.reviews.length; // 총 리뷰수
    const itemCountPerPage = 6; // 페이지당 보여줄 데이터 개수
    const totalPages = Math.ceil(reveiwLength / itemCountPerPage); // 총 페이지

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        setPageArr(fetchData.reviews.slice((page - 1) * 6, (page - 1) * 6 + 6));
    }, [page]);
    return (
        <>
            <_customStack>
                <Pagination
                    count={totalPages}
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    page={page}
                    onChange={handleChange}
                />
            </_customStack>
        </>
    );
}
//pagination
const _customStack = styled(Stack)`
    left: 50%;
    transform: translate(-50%, 0%);
    position: absolute;
    bottom: 30px;
    align-items: center;
    margin-top: 20px;
`;
