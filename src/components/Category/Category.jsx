import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
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

	if (isLoading) {
		return <h1 className="bg-black text-white p-20">is Loading.......</h1>;
	}

	if (isError) {
		return <h1> we found error : {error.message}</h1>;
	}

	var settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 1000
	};






	return (
		<>
			<h1 className="capitalize font-bold py-3">shop popular category</h1>
			<Slider {...settings}>
				{data.data.map((cat) => (
					<Link to={`/categorydetails/${cat._id}`}>
						<div key={cat._id} className="pb-8">
							<img src={cat.image} alt="" className="w-full h-[200px]" />
							<h3>{cat.name}</h3>
						</div>
					</Link>
				))}
			</Slider>
		</>
	);
}
