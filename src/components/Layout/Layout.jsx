import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

export default function Layout() {
	return (
		<div className="min-h-screen flex flex-col ">
			<Navbar />
			<div className="container mx-auto     ">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
