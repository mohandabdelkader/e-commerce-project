import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import { endPoint } from '../../enum/endpoint';
import createAxiosInstance from '../../library/api';
import { useAddToCart } from '../../services/cart/useAddToCart';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductDetails() {
	const apiBase = createAxiosInstance();
	let { setCartNumber } = useContext(CartContext);
	const { addToCart ,loading } = useAddToCart();


	let { id, category } = useParams();
	const [pro, setPro] = useState(null);
	const [relatedData, setRelatedData] = useState([]);
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 1000
	};

	function getProduct() {
		apiBase
			.get(`${endPoint.PRODUCTS}/${id}`)
			.then((res) => {
				setPro(res.data.data);
			})
			.catch((res) => {});
	}
	function relatedProducts() {
		axios
			.get(`https://ecommerce.routemisr.com/api/v1/products`)
			.then((res) => {
				// Array of 40 products
				const related = res.data.data.filter((product) => product.category.name === category);
				setRelatedData(related);
			})
			.catch((res) => {});
	}

	useEffect(() => {
		getProduct();
		relatedProducts();
	}, [id, category]);


	if(pro == null){
		return (
			<h1 className="  p-20 flex justify-center  items-center h-screen">
				<i className="fa-solid fa-spinner fa-spin text-7xl"></i>

			</h1>
		);
	}
	if(relatedData.length <0){
		return (
			<h1 className="  p-20 flex justify-center  items-center h-screen">
				<i className="fa-solid fa-spinner fa-spin text-7xl"></i>

			</h1>
		);
	}

	return (
		<>
			{/* Product details */}

				<div className="row flex justify-center items-center my-16 ">
					<div className=" lg:w-1/4  md:w-1/2 sm:w-full max-w-xs px-4">
						<Slider {...settings}>
							{pro.images.map((src) => (
								<div key={pro._id}>
									<img src={src} alt="" />
								</div>
							))}
						</Slider>
						{/* <img src={pro.imageCover} alt="" className="w-full " /> */}
					</div>
					<div className="w-3/4 ">
						<h2 className="font-semibold capitalize py-3 my-8 ">{pro.title}</h2>
						<h3 className="text-slate-700 ">{pro.description}</h3>
						<div>
							<span>
								<i className="fas fa-star text-yellow-500 px-2 py-2"> {pro.ratingsAverage}</i>
							</span>
							<h4 className="py-3">{pro.price} EG</h4>
							<h4 className="py-3">{pro.category.name} </h4>
							<button
								onClick={() => addToCart(pro._id, setCartNumber)(pro._id)}
								className=" w-full bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
								{loading ? <i className="fa-solid fa-spinner fa-spin "></i>:"Add To Cart"}
							</button>
							<button className=" w-full bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
								Add to My WashList
							</button>
						</div>
					</div>
				</div>


			{/* Related products */}
			<div>

					<div className="row">
						{relatedData.map((product) => (
							<ProductCard product={product} key={product._id} />
						))}
					</div>

			</div>
		</>
	);
}
