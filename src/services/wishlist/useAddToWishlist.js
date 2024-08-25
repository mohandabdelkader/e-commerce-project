import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function useAddToWishlist() {
	const [loadingWishList, setLoadingWishList] = useState(false)
	const addToWishlist = async (id) => {
		setLoadingWishList(true)
		return axios
			.post(
				`https://ecommerce.routemisr.com/api/v1/wishlist`,
				{
					productId: id
				},
				{
					headers: { token: localStorage.getItem('token') }
				}
			)
			.then((res) => {
				if (res.data.status == 'success') {
					toast.success(res.data.message);
					setLoadingWishList(false)
				} else {
					toast.error(res.data.message);
					setLoadingWishList(false)
				}
			})
			.catch((err) => err);
	};

	return { addToWishlist,loadingWishList };
}
