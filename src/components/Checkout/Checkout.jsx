import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

export default function Checkout() {
	let { checkout, cartId } = useContext(CartContext);

	let formik = useFormik({
		initialValues: {
			details: '',
			phone: '',
			city: ''
		},
		onSubmit: () => handelCheckout(cartId, `http://localhost:5173`)
	});

	async function handelCheckout(cartId, url) {
		const response = await checkout(cartId, url, formik.values);
		const paymentURL = response.data.session.url;

		window.location.href = paymentURL;
	}

	return (
		<>
			<h1 className="fa-2x font-bold text-slate-950 text-center uppercase my-3">Login section</h1>
			<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-3">
				<div className="relative z-0 w-full mb-5 group">
					<input
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.details}
						type="text"
						name="details"
						id="details"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						htmlFor="details"
						className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Details
					</label>
				</div>

				<div className="relative z-0 w-full mb-5 group">
					<input
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.phone}
						type="tel"
						name="phone"
						id="phone"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						htmlFor="phone"
						className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						User phone
					</label>
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.city}
						type="text"
						name="city"
						id="city"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						htmlFor="city"
						className="left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						User city
					</label>
				</div>

				<button
					type="submit"
					className=" w-full bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 my-3 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
					Pay Now
				</button>
			</form>
		</>
	);
}
