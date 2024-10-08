import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
	const [cartId, setCartId] = useState(null);
	const [cartNumber, setCartNumber] = useState(0);




	// function AddProductToCart(id) {

	// 	return axios
	// 		.post(
	// 			`https://ecommerce.routemisr.com/api/v1/cart`,
	// 			{ productId: id },
	// 			{
	// 				headers: { token: localStorage.getItem('token') }
	// 			}
	// 		)
	// 		.then((res) => {

	// 			return res
	// 		})

	// 		.catch((err) => {

	// 			return err
	// 		})

	// }

	const getLoggedUserCart = useCallback(() => {
		return axios
			.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
				headers: { token: localStorage.getItem('token') }
			})
			.then((res) => {
				setCartNumber(res.data.numOfCartItems);
				setCartId(res.data.data._id);
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
		// AddProductToCart,
		getLoggedUserCart,
		UpdateCartProductQuantity,
		removeSpecificCartItem,
		checkout,
		cartId,
		setCartNumber,
		cartNumber,


	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
