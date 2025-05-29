import React, { useState } from 'react';

const usePagination = () => {
    const [queryParams, setQueryParams] = useState({
        offset: 0,
        limit: 10,
        search: '',
        status: '',
    });

    const PAGE_SIZES = [10, 20, 30, 40, 50];

    const handlePageChange = (newPage: number) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            offset: (newPage - 1) * prevParams.limit,
        }));
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            limit: newPageSize,
            offset: 0, // Reset to the first page
        }));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            search: e.target.value,
            offset: 0, // Reset to the first page
        }));
    };

    const page = queryParams.offset / queryParams.limit +1;

    return { queryParams, handlePageChange, handlePageSizeChange, handleSearch, PAGE_SIZES, page };
};

export default usePagination;
