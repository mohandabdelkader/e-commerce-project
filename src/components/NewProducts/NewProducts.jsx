import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import useProducts from '../../Hooks/useProducts';
import ProductCard from '../ProductCard/ProductCard';

//https://ecommerce.routemisr.com/api/v1/products

export default function NewProducts() {
	let { data, isError, error, isLoading } = useProducts();
	let { AddProductToCart } = useContext(CartContext);

	async function addCart(id) {
		let response = await AddProductToCart(id);
		if (response.data.message == 'success') {
			toast.success(response.data.message);
		} else {
			toast.success(response.data.message);
		}
	}

	if (isError) {
		return <h2 className="bg-black text-red-600 capitalize">{error}</h2>;
	}

	if (isLoading) {
		return <span className="loader">Loading</span>;
	}

	return (
		<>
			<div className="row">
				{data.map((product) => (
					<ProductCard product={product} key={product._id} />
				))}
			</div>
		</>
	);
}
