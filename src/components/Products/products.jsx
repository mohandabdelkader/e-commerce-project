import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import useProducts from '../../Hooks/useProducts';
import { WashListContext } from '../../Context/WashListContext';


//https://ecommerce.routemisr.com/api/v1/products

export default function Products() {
	const [addData, setAddData] = useState(null);
	let { AddProductToCart, setCartNumber, CartNumber } = useContext(CartContext);
	const [washListItem, setWashListItem] = useState(null);

	const { addProductToWishlist } = useContext(WashListContext);

	async function addWashList(id) {
		try {
			const response = await addProductToWishlist(id);
			if (response.data.status === 'success') {
				toast.success(response.data.message);
				setWashListItem(response.data.data);
				console.log(response.data.data);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			toast.error('An error occurred while adding to the wishlist');
			console.error(error);
		}
	}

	async function addProducts(id) {
		let response = await AddProductToCart(id);
		if (response.data.status == 'success') {
			toast.success(response.data.message);
			setCartNumber(CartNumber + 1);
			setAddData(response.data.data);
		} else {
			toast.error(response.data.message);
		}
	}

	let { error, isError, isLoading, data } = useProducts();

	if (isError) {
		return <h2 className="bg-black text-red-600 capitalize">{error}</h2>;
	}

	if (isLoading) {
		return <span className="loader">Loading</span>;
	}

	// async function addWashList(id) {
	// 	try {
	// 		const response = await addProductToWishlist(id);
	// 		if (response && response.data.status === 'success') {
	// 			toast.success(response.data.message);
	// 			console.log(response);
	// 		} else {
	// 			toast.error(response.data.message);
	// 		}
	// 	} catch (error) {
	// 		toast.error("An error occurred while adding to the wishlist");
	// 		console.log(error);
	// 	}
	// }

	return (
		<>
			<h1 className="capitalize text-black-600 text-center font-bold my-3"> my products</h1>
			<div className="row">
				{data.map((product) => (
					<div className="w-1/6" key={product._id}>
						<div className="pro p-3 text-center">
							<Link to={`/productdetails/${product._id}/${product.category.name}`}>
								<img src={product.imageCover} alt="" className="w-full" />
								<h3 className="text-emerald-500">{product.category.name}</h3>
								<h3 className="text-emerald-500">{product.title.split('').splice(0, 2).join('')}</h3>
							</Link>

							<div className="py-3">
								<span>
									<i className="fas fa-star text-yellow-500 px-2">{product.ratingsAverage}</i>
								</span>
								<h6 className="py-3">{product.price} EG</h6>

								<button
									onClick={() => addProducts(product._id)}
									className="bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
									Add to card
								</button>
								<button
									onClick={() => addWashList(product._id)}
									className="bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
									Add to My WashList
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
