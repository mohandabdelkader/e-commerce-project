import React from 'react';
import createAxiosInstance from '../../library/api';
import { endPoint } from '../../enum/endpoint';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function Brands() {
    const apiBase = createAxiosInstance();

    const getAllBrands = async () => {
        const response = await apiBase.get(`${endPoint.BRANDS}`);
        return response.data;
    }

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['allBrands'],
        queryFn: getAllBrands,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <>
            <h1 className="capitalize text-black-600 text-center font-bold my-3">My Products</h1>
            <div className="row">
                {data?.data.map((brand) => (
                    <div className="w-1/6" key={brand._id}>
                        <div className="pro p-3 text-center">
                            <Link to={`/brandsdetails/${brand._id}`}>
                                <img src={brand.image} alt="" className="w-full" />
                                <h3 className="text-emerald-500">
                                    {brand.name.split('').splice(0, 2).join('')}
                                </h3>
                            </Link>
                            <div className="py-3">
                                <button
                                    className="bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
