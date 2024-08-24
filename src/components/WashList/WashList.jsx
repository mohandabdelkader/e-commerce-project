import { useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { WashListContext } from '../../Context/WashListContext';
import { useAddToCart } from '../../services/cart/useAddToCart';

export default function WashList() {
	const { getLoggedUserWishlist, removeProductFromWishlist } = useContext(WashListContext);
	const [washListItem, setWashListItem] = useState([]);
	const { addToCart } = useAddToCart();

	const getWashList = useCallback(async () => {
		try {
			let response = await getLoggedUserWishlist();
			if (response.data.status === 'success') {
				setWashListItem(response.data.data);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error('Error fetching wishlist:', error);
		}
	}, [getLoggedUserWishlist]);

	useEffect(() => {
		getWashList();
	}, [getWashList]);

	async function removeItem(id) {
		let response = await removeProductFromWishlist(id);

		if (response.data.status == 'success') {
			toast.success('Item is removed');
			getWashList();
		}
	}

	if (!washListItem.length) {
		return (
			<div className="h-screen flex flex-col justify-center items-center">
				<p className="text-xl font-semibold">Loading products...</p>
			</div>
		);
	}

	return (
		<div className="product-list pt-20">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
				{washListItem?.map((product) => (
					<div key={product._id} className="product-item border flex flex-col rounded-lg p-4">
						<img src={product.imageCover} alt={product.title} className="w-full aspect-[3/4] object-cover mb-2" />
						<h2 className="text-xl font-semibold mb-2">{product.title}</h2>
						<p className="text-sm text-gray-500">{product.description}</p>
						<p className="text-lg font-bold mt-auto ">${product.price}</p>
						<Link to={`/productdetails/${product._id}/${product.category.name}`} className="text-blue-500 hover:underline ">
							View Details
						</Link>

						<div className="flex flex-col gap-2 mt-4">
							<button
								className="w-full bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 px-4 border border-[#1abc9c] hover:border-transparent rounded"
								onClick={() => addToCart(product._id)}>
								Add to My cart
							</button>
							<button
								onClick={() => removeItem(product._id)}
								className="w-full bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
								Remove from wishList
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
