import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { WashListContext } from '../../Context/WashListContext';

export default function WashList() {
	const { getLoggedUserWishlist } = useContext(WashListContext);
	const [washListItem, setWashListItem] = useState(null);



const getWashList = async () => {
	try {
		let response = await getLoggedUserWishlist();
		if (response.data.status === 'success') {
			setWashListItem(response.data.data);
			// console.log(response.data.data);
		} else {
			toast.error(response.data.message);
		}
	} catch (error) {
		console.error('Error fetching wishlist:', error);
	}
};
console.log(washListItem);

useEffect(() => {
	getWashList();
}, []);

// async function removeItem(id) {
//   let response = await removeProductFromWishlist(id);
//   if (response.data.status == 'success') {
//     setWashListItem(response.data.data);

//     toast.success('Item is removed');
//   }
// }
// }

return (
	<div className="product-list">
		{washListItem?.length > 0 ? (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{washListItem?.map((product) => (
					<div key={product._id} className="product-item border rounded-lg p-4">
						<img src={product.imageCover} alt={product.title} className="w-full h-32 object-cover mb-2" />
						<h2 className="text-xl font-semibold">{product.title}</h2>
						<p>{product.description}</p>
						<p className="text-lg font-bold">${product.price}</p>
						<Link to={`/productdetails/${product._id}/${product.category.name}`} className="text-blue-500 hover:underline">
							View Details
						</Link>

						<div>
							<button className=" w-full bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
								Add to My cart
							</button>
							<button
								onClick={() => removeItem(product._id)}
								className=" w-full bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
								Remove in My WashList
							</button>
						</div>
					</div>
				))}
			</div>
		) : (
			<p>Loading products...</p>
		)}
	</div>
);
