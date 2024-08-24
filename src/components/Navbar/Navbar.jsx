import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { CounterContext } from '../../Context/ContextCounter';
import Logo from '../../assets/logo.svg';

const NAV_LINKS = [
	{ path: '/', label: 'Home' },
	{ path: '/products', label: 'Products' },
	{ path: '/cart', label: 'Cart' },
	{ path: '/wishlist', label: 'Wishlist' },
	{ path: '/category', label: 'Categories' },
	{ path: '/brands', label: 'Brands' }
];

const SOCIAL_LINKS = [
	{ href: '#', label: 'Facebook', icon: 'fa-facebook' },
	{ href: '#', label: 'Instagram', icon: 'fa-instagram' },
	{ href: '#', label: 'Twitter', icon: 'fa-twitter' },
	{ href: '#', label: 'Tiktok', icon: 'fa-tiktok' },
	{ href: '#', label: 'Google', icon: 'fa-google' }
];

export default function Navbar() {
	const [showMenu, setShowMenu] = useState(false);
	let { userToken, setUserToken } = useContext(CounterContext);
	const { cartNumber } = useContext(CartContext);
	let navigate = useNavigate();

	function logout() {
		localStorage.removeItem('token');
		setUserToken(null);
		setShowMenu(false);
		navigate('/login');
	}

	return (
		<>
			<header className="fixed top-0 left-0 right-0 bg-white flex justify-start items-center gap-8 px-8 py-4 z-40">
				<Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src={Logo} alt="logo" className="w-20" />
				</Link>
				{userToken ? (
					<>
						<nav className="hidden md:flex items-center gap-4">
							{NAV_LINKS.map((link) => (
								<Link to={link.path} className="" key={link.path}>
									{link.label}
								</Link>
							))}
						</nav>
						<div className="flex items-center gap-4 ml-auto">
							<Link to={'/cart'} className="relative size-8 flex justify-center items-center text-2xl text-emerald-500">
								<i className="fa-solid fa-cart-shopping"></i>
								<span className="absolute -top-1 -right-1 size-4 bg-emerald-700 text-white rounded-full text-center text-xs">{cartNumber}</span>
							</Link>
							<button onClick={logout} className="hidden md:flex px-4 py-2 border border-red-500 bg-red-100 text-red-500 rounded-md mt-auto transition hover:bg-red-300 hover:text-white">
								Logout
							</button>
							<button className="md:hidden p-1 rounded-full z-50" onClick={() => setShowMenu((prev) => !prev)}>
								<i className="fa-solid fa-bars"></i>
							</button>
						</div>
					</>
				) : (
					<>
						<nav className="hidden md:flex items-center gap-4 ml-auto">
							{SOCIAL_LINKS.map((link) => (
								<Link to={link.path} key={link.path}>
									<i className={`fa-brands ${link.icon} text-1xl`}></i>
								</Link>
							))}
						</nav>
						<button className="md:hidden p-1 rounded-full z-50 ml-auto" onClick={() => setShowMenu((prev) => !prev)}>
							<i className="fa-solid fa-bars"></i>
						</button>
					</>
				)}
			</header>

			{showMenu && (
				<aside className="fixed inset-0 z-40 flex flex-col justify-start items-start gap-8 px-8 py-4 bg-white">
					<h2 className="text-2xl font-semibold">Menu</h2>
					{userToken ? (
						<>
							<nav className="flex flex-col gap-4">
								{NAV_LINKS.map((link) => (
									<Link to={link.path} className="text-lg" key={link.path}>
										{link.label}
									</Link>
								))}
							</nav>
							<button onClick={logout} className="flex px-4 py-2 border border-red-500 bg-red-100 text-red-500 rounded-md mt-auto transition hover:bg-red-300 hover:text-white">
								Logout
							</button>
						</>
					) : (
						<nav className="flex flex-col items-start gap-4">
							{SOCIAL_LINKS.map((link) => (
								<Link to={link.path} key={link.path} className="flex items-center gap-2">
									<i className={`fa-brands ${link.icon} text-xl`}></i>
									<span className="md:hidden text-xl">{link.label}</span>
								</Link>
							))}
						</nav>
					)}
				</aside>
			)}
		</>
	);
}
