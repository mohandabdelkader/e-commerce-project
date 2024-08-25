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




	if (isLoading) {
		return (
			<h1 className="  p-20 flex justify-center  items-center h-screen">
				<i className="fa-solid fa-spinner fa-spin text-7xl"></i>

			</h1>
		);
    }
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <>
            <h1 className="capitalize text-black-600 text-center font-bold my-3">My Products</h1>

            <div className="row">
                {data?.data.map((brand) => (
                    <div className="flex flex-row sm:   shadow-xl " key={brand._id}>
                        <div className="pro p-3 text-center shadow-slate-200 ">
                            <div className=' hover:shadow-xl shadow-slate-950'>
                            <Link to={`#`} className='hover:shadow-lg shadow-slate-400 '>
                                <img src={brand.image} alt="" className="w-full " />
                                <h3 className="text-emerald-500 font-bold capitalize text-xl ">
                                    {brand.name.split('').splice(0, 2).join('')}
                                </h3>
                            </Link>
                            </div>

                            <div className="py-3">

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
