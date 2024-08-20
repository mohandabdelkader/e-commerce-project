import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CounterContext } from '../../Context/ContextCounter';

export default function Navbar() {
	let { userToken, setUserToken } = useContext(CounterContext);
	let navigate = useNavigate();

	function logout(e) {
		e.preventDefault();
		localStorage.removeItem('token');
		setUserToken(null);
		navigate('/login');
	}

	return (
		<>
			<nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F9FA]">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					{userToken != null ? (
						<div className="flex flex-row justify-start items-center gap-8">
							<Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
								<img src="https://flowbite.com/docs/images/logo.svg" />
							</Link>
							<ul className="font-bold flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 active">
								<li>
									<NavLink to="about" className="block text-black">
										about
									</NavLink>
								</li>
								<li>
									<NavLink to="/" className="block text-black focus:underline">
										home
									</NavLink>
								</li>
								<li>
									<NavLink to="products" className="block text-black focus:underline">
										products
									</NavLink>
								</li>
								<li>
									<NavLink to="cart" className="block text-black focus:underline">
										Cart
									</NavLink>
								</li>
								<li>
									<NavLink to="category" className="block text-black focus:underline">
										Categories
									</NavLink>
								</li>
								<li>
									<NavLink to="brands" className="block text-black focus:underline">
										Brands
									</NavLink>
								</li>
							</ul>
						</div>
					) : null}

					<div className="hidden w-full md:block md:w-auto">
						{userToken != null ? (
							<NavLink onClick={logout} to="/login" className="block">
								Logout
							</NavLink>
						) : (
							<ul className="font-bold flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
								<li>
									<i className="fa-brands fa-facebook text-1xl"></i>
								</li>
								<li>
									<i className="fa-brands fa-instagram text-1xl"></i>
								</li>
								<li>
									<i className="fa-brands fa-twitter text-1xl"></i>
								</li>
								<li>
									<i className="fa-brands fa-tiktok text-1xl"></i>
								</li>
								<li>
									<i className="fa-brands fa-google text-1xl"></i>
								</li>
								<li>
									<NavLink to="contact" className="block">
										contact
									</NavLink>
								</li>
								<li>
									<NavLink to="login" className="block">
										Login
									</NavLink>
								</li>
							</ul>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}
