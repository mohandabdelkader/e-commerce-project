import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
	const [cartId, setCartId] = useState(null);

	function AddProductToCart(id) {
		return axios
			.post(
				`https://ecommerce.routemisr.com/api/v1/cart`,
				{ productId: id },
				{
					headers: { token: localStorage.getItem('token') }
				}
			)
			.then((res) => res)
			.catch((err) => err);
	}

	const getLoggedUserCart = useCallback(() => {
		return axios
			.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
				headers: { token: localStorage.getItem('token') }
			})
			.then((res) => {
				setCartId(res.data.data._id.toString());
				return res;
			})
			.catch((err) => err);
	}, []);

	function UpdateCartProductQuantity(id, newCount) {
		return axios
			.put(
				`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
				{ count: newCount },
				{
					headers: { token: localStorage.getItem('token') }
				}
			)
			.then((res) => res)
			.catch((err) => err);
	}

	function removeSpecificCartItem(id) {
		return axios
			.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
				headers: { token: localStorage.getItem('token') }
			})
			.then((res) => res)
			.catch((err) => err);
	}

	function checkout(cartId, url, formData) {
		return axios
			.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, formData, {
				headers: { token: localStorage.getItem('token') }
			})
			.then((res) => res)
			.catch((err) => err);
	}

	useEffect(() => {
		getLoggedUserCart();
	}, [getLoggedUserCart]);

	const value = {
		AddProductToCart,
		getLoggedUserCart,
		UpdateCartProductQuantity,
		removeSpecificCartItem,
		checkout,
		cartId
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
