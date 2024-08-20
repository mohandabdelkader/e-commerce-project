import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from './../../Context/CartContext';

export default function Cart() {
	const [cartData, setCartData] = useState(null);

	let { getLoggedUserCart, UpdateCartProductQuantity, removeSpecificCartItem } = useContext(CartContext);

	async function getCart() {
		let response = await getLoggedUserCart();
		setCartData(response.data.data);
		console.log(response);
	}

	useEffect(() => {
		getCart();
	}, []);

	async function updateCount(id, newCount) {
		if (newCount == 0) {
			removeItem(id);
		} else {
			let response = await UpdateCartProductQuantity(id, newCount);

			if (response.data.status == 'success') {
				setCartData(response.data.data);
			}
		}
	}

	async function removeItem(id) {
		let response = await removeSpecificCartItem(id);
		if (response.data.status == 'success') {
			setCartData(response.data.data);
			toast.success('Item is removed');
		}
	}

	return (
		<>
			{cartData != null ? (
				<div className="relative overflow-x-auto shadow-lg sm:rounded-lg my-28 ">
					<h1 className="text-center capitalize text-2xl font-bold my-3">total price {cartData.totalCartPrice}</h1>
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="px-16 py-3">
									<span className="sr-only">Image</span>
								</th>
								<th scope="col" className="px-6 py-3">
									Product
								</th>
								<th scope="col" className="px-6 py-3">
									Qty
								</th>
								<th scope="col" className="px-6 py-3">
									Price
								</th>
								<th scope="col" className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{cartData?.products.map((product) => (
								<tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
									<td className="p-4">
										<img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="iPhone 12" />
									</td>
									<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.product.title.split(' ').slice(0, 2).join(' -')}</td>
									<td className="px-6 py-4">
										<div className="flex items-center">
											<button
												onClick={() => updateCount(product.product.id, product.count - 1)}
												className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
												type="button">
												<span className="sr-only">Quantity button</span>
												<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
													<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
												</svg>
											</button>
											<div className="ms-3">
												<span>{product.count}</span>
											</div>
											<button
												onClick={() => updateCount(product.product.id, product.count + 1)}
												className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
												type="button">
												<span className="sr-only">Quantity button</span>
												<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
													<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
												</svg>
											</button>
										</div>
									</td>
									<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.price}$</td>
									<td className="px-6 py-4">
										<Link onClick={() => removeItem(product.product._id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">
											Remove
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<Link to={'/checkout'}>
						<button className=" w-full bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
							Checkout
						</button>
					</Link>
				</div>
			) : (
				<span className="loader">Loading</span>
			)}
		</>
	);
}
