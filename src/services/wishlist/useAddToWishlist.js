import axios from 'axios';
import toast from 'react-hot-toast';

export function useAddToWishlist() {
	const addToWishlist = async (id) => {
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
				} else {
					toast.error(res.data.message);
				}
			})
			.catch((err) => err);
	};

	return { addToWishlist };
}
