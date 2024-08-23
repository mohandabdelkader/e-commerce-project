import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { endPoint } from '../../enum/endpoint';
import createAxiosInstance from '../../library/api';
import line from "../../assets/slider1.jpeg"

export default function Category() {
	const apiBase = createAxiosInstance();

	function getAllCategory() {
		return apiBase.get(`${endPoint.CATEGORIES}`);
	}

	let { data, isError, error, isLoading } = useQuery({
		queryKey: ['category'],
		queryFn: getAllCategory,
		select: (data) => data.data
	});
	console.log(data);

	if (isLoading) {
		return <h1 className="bg-black text-white p-20">is Loading.......</h1>;
	}

	if (isError) {
		return <h1> we found error : {error.message}</h1>;
	}







	return (
		<>
			<h1 className="capitalize font-bold py-3">shop popular category</h1>
			{data.data.map((category) => (
				<div className='bg-red-400 grid-rows-2 md:grid-rows-2 lg:grid-rows-2  '>
  <div className="mt-24 pb-12 w-[30%] bg-slate-500" key={category._id}>
    <ul className="">
      <li className="p-2 border rounded-md shadow-md transition hover:shadow-xl hover:border-gray-400 ">
        <img src={category.image} alt="" className="w-full" />
        <h6 className="text-center text-emerald-700 capitalize text-3xl">
          {category.name}
        </h6>
      </li>
    </ul>
  </div>
  </div>
))}


		</>
	);
}


{/* <Link to={`/categorydetails/${cat._id}`}>
						<div key={cat._id} className="pb-8">
							<img src={cat.image} alt="" className="w-full h-[200px]" />
							<h3>{cat.name}</h3>
						</div>
					</Link> */}