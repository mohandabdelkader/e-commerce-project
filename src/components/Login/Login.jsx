import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/ContextCounter';

export default function Login() {
	let { userToken, setUserToken } = useContext(CounterContext);
	const navigate = useNavigate();
	const [apiError, setApiError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	let validationSchema = Yup.object().shape({
		email: Yup.string().email('enter email').required('this is required'),

		password: Yup.string().required('this is required').matches(/[1-9]/, 'enter 6 char or more')
	});

	function submitForm(values) {
		setIsLoading(true);
		axios
			.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
			.then((res) => {
				if (res.data.message == 'success') {
					localStorage.setItem('token', res.data.token);
					setUserToken(res.data.token);

					navigate('/');
				}
				setIsLoading(false);
			})
			.catch((res) => {
				setIsLoading(false);
				// console.log('no', res.response.data.message);
				setApiError(res.response.data.message);
			});
	}

	let formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: validationSchema,

		onSubmit: submitForm
	});

	return (
		<>
			<h1 className="fa-2x font-bold text-slate-950 text-center uppercase my-3">Login section</h1>

			{apiError ? <div className="w-1/2 bg-black text-white rounded-lg p-3 mx-auto text-center">{apiError}</div> : null}

			<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-3">
				{formik.errors.name && formik.touched.name ? (
					<div className="font-medium bg-black text-white text-center">
						<span>{formik.errors.name}</span>
					</div>
				) : null}
				<div className="relative z-0 w-full mb-5 group">
					<input
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.email}
						type="email"
						name="email"
						id="email"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					/>
					<label
						htmlFor="email"
						className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						User Email
					</label>
				</div>
				{formik.errors.email && formik.touched.email ? (
					<div className="font-medium bg-black text-white text-center">
						<span> {formik.errors.email} </span>
					</div>
				) : null}
				<div className="relative z-0 w-full mb-5 group">
					<input
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						value={formik.values.password}
						type="password"
						name="password"
						id="password"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					/>
					<label
						htmlFor="password"
						className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						User password
					</label>
				</div>
				{formik.errors.password && formik.touched.password ? (
					<div className="font-medium bg-black text-white text-center mb-3">
						<span>{formik.errors.password}</span>
					</div>
				) : null}

				{formik.errors.rePassword && formik.touched.rePassword ? (
					<div className="font-medium bg-black text-white text-center">
						<span>{formik.errors.rePassword}</span>
					</div>
				) : null}

				{formik.errors.phone && formik.touched.phone ? (
					<div className="font-medium bg-black text-white text-center">
						<span>{formik.errors.phone}</span>
					</div>
				) : null}

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					{isLoading ? <i className="fas fa-spinner spin "></i> : 'submit'}
				</button>
				<Link className="text-blue-400 underline mx-3" to={'/contact'}>
					{' '}
					you dont have an account register now
				</Link>
			</form>
		</>
	);
}

{
}
