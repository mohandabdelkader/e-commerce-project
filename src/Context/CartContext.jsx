import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export let CartContext = createContext();

export default function CartContextProvider(props) {
	const [cartId, setCartId] = useState(null)
    let headers = { token: localStorage.getItem('token') };
    console.log(headers);

    function AddProductToCart(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: id }, { headers })
            .then((res) => res)
            .catch((err) => err);
    }

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
           .then((res)=>{
            console.log(res.data.data._id);
			setCartId(res.data.data._id.toString())

			return res
		   }).catch((err)=>err)
    }

    function UpdateCartProductQuantity(id, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: newCount }, { headers })
            .then((res) => res)
            .catch((err) => err);
    }

    function removeSpecificCartItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
            .then((res) => res)
            .catch((err) => err);
    }

    function checkout(cartId, url, formData) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`)
    }
	useEffect(()=>{
		getLoggedUserCart()
	},[])

    return (
        <CartContext.Provider value={{ AddProductToCart, getLoggedUserCart, UpdateCartProductQuantity, removeSpecificCartItem, checkout,cartId }}>
            {props.children}
        </CartContext.Provider>
    );
}
