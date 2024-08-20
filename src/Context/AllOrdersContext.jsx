import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export let AllOrdersContext = createContext();

export default function AllOrdersContextProvider({ children }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		const getAllOrders = () => {
			return axios
				.get(`https://ecommerce.routemisr.com/api/v1/orders/`, {
					headers: { token: localStorage.getItem('token') }
				})
				.then((res) => {
					setData(res.data.data);
					return res;
				})
				.catch((err) => err);
		};

		getAllOrders();
	}, []);

	const value = { data };

	return <AllOrdersContext.Provider value={value}>{children}</AllOrdersContext.Provider>;
}
