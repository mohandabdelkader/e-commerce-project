import axios from 'axios';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';

export function useAddToCart() {
	let { setCartNumber } = useContext(CartContext);
	const [loading, setLoading] = useState(false)
	const [addId, setAddId] = useState(null)




	const addToCart = async (id) => {
		setAddId(id)
setLoading(true)
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
					setLoading(false)

				} else {
					toast.error(res.data.message);
					setLoading(false)

				}
			})
			.catch((err) => err);
	};

	return { addToCart,loading,addId };
}
