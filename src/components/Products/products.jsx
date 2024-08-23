import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { WashListContext } from '../../Context/WashListContext';
import useProducts from '../../Hooks/useProducts';
import { useAddToCart } from '../../services/cart/useAddToCart';
import ProductCard from '../ProductCard/ProductCard';
//https://ecommerce.routemisr.com/api/v1/products

export default function Products() {
	const [addData, setAddData] = useState(null);
	let { setCartNumber } = useContext(CartContext);
	const [washListItem, setWashListItem] = useState(null);
	const { addToCart } = useAddToCart();

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
					<ProductCard product={product} key={product._id} />
				))}
			</div>
		</>
	);
}
