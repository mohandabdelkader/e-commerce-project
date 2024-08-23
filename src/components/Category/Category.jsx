import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { endPoint } from '../../enum/endpoint';
import createAxiosInstance from '../../library/api';

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
		<div className="py-20 flex flex-col gap-8">
			<h1 className="capitalize font-bold py-3 text-4xl">shop popular category</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{data.data.map((category) => (
					<div className="flex flex-col gap-4" key={category._id}>
						<img src={category.image} alt={category.name} className="w-full aspect-[3/4] object-cover border rounded-md" />
						<h6 className="text-center text-emerald-700 capitalize text-3xl">{category.name}</h6>
					</div>
				))}
			</div>
		</div>
	);
}

{
	/* <Link to={`/categorydetails/${cat._id}`}>
						<div key={cat._id} className="pb-8">
							<img src={cat.image} alt="" className="w-full h-[200px]" />
							<h3>{cat.name}</h3>
						</div>
					</Link> */
}
