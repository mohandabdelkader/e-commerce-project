import axios from 'axios';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export function useAddToWishlist() {
	let { setCartNumber } = useContext(CartContext);

	const addToCart = async (id) => {
		axios
			.post(
				`https://ecommerce.routemisr.com/api/v1/cart`,
				{ productId: id },
				{
					headers: { token: localStorage.getItem('token') }
				}
			)
			.then((res) => {
				if (res.data.status == 'success') {
					toast.success(res.data.message);
					setCartNumber((prev) => prev + 1);
				} else {
					toast.error(res.data.message);
				}
			})
			.catch((err) => err);
	};

	return { addToCart };
}
