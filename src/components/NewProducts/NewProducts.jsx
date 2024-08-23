import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import useProducts from '../../Hooks/useProducts';

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
									onClick={() => addCart(product._id)}
									className="bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
									Add to cart
								</button>
								<button className="bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
									Add to My WashList
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			: ( )
		</>
	);
}
