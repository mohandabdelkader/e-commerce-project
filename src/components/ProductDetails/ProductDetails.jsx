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
	const { addToCart } = useAddToCart();

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

	return (
		<>
			{/* Product details */}
			{pro ? (
				<div className="row items-center ">
					<div className="w-1/4 px-4">
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
						<h2 className="font-semibold capitalize py-3">{pro.title}</h2>
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
								Add to cart
							</button>
							<button className=" w-full bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
								Add to My WashList
							</button>
						</div>
					</div>
				</div>
			) : (
				<span className="loader "></span>
			)}

			{/* Related products */}
			<div>
				{relatedData.length > 0 ? (
					<div className="row">
						{relatedData.map((product) => (
							<ProductCard product={product} key={product._id} />
						))}
					</div>
				) : (
					<span className="loader "></span>
				)}
			</div>
		</>
	);
}
