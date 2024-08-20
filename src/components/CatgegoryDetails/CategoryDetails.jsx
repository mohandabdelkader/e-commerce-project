import React from 'react';
import createAxiosInstance from '../../library/api';
import { endPoint } from '../../enum/endpoint';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function CategoryDetails() {
    const apiBase = createAxiosInstance();
    const { id } = useParams();

    function getSpecificCategory() {
        return apiBase.get(`${endPoint.CATEGORIES}/${id}`);
    }

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['specificCategory', id], // تأكد من تضمين id في queryKey
        queryFn: getSpecificCategory,
        select: (data) => data.data.data,
    });

    if (isLoading) {
        return <h1 className="bg-black text-white p-20">Loading.......</h1>;
    }

    if (isError) {
        return <h1 className="bg-red-500 text-white p-20">Error: {error.message}</h1>;
    }

    return (
        <>
            <div className="row items-center ">
                <div className="flex align-middle justify-center mt-16">
                    <img src={data?.image} alt="" className="w-[200px] h-[200px]" />
                    <div className="flex justify-center">
                        <h4 className="px-8 text-center capitalize font-bold">{data?.name} EG</h4>
                    </div>
                </div>
            </div>
        </>
    );
}
