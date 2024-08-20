import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import CartContextProvider from './Context/CartContext';
import CounterContextProvider from './Context/ContextCounter';
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import Category from './components/Category/Category';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/products';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CategoryDetails from './components/CatgegoryDetails/CategoryDetails';
import Brands from './components/Brands/Brands';
import BrandsDetails from './components/BrandsDetails/BrandsDetails';
import Checkout from './components/Checkout/Checkout';

function App() {
	let query = new QueryClient();
	let router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: 'about',
					element: (
						<ProtectedRoute>
							<About />
						</ProtectedRoute>
					)
				},
				{ path: 'contact', element: <Contact /> },
				{
					path: 'products',
					element: (
						<ProtectedRoute>
							<Products />
						</ProtectedRoute>
					)
				},
				{
					path: 'cart',
					element: (
						<ProtectedRoute>
							<Cart />
						</ProtectedRoute>
					)
				},
				{
					path: 'checkout',
					element: (
						<ProtectedRoute>
							<Checkout />
						</ProtectedRoute>
					)
				},
				{
					path: 'category',
					element: (
						<ProtectedRoute>
							<Category />
						</ProtectedRoute>
					)
				},
				{
					path: 'brands',
					element: (
						<ProtectedRoute>
							<Brands />
						</ProtectedRoute>
					)
				},
				{
					path: 'brandsdetails/:id',
					element: (
						<ProtectedRoute>
							<BrandsDetails />
						</ProtectedRoute>
					)
				},
				{
					path: 'categorydetails/:id',
					element: (
						<ProtectedRoute>
							<CategoryDetails />
						</ProtectedRoute>
					)
				},
				{
					path: 'productdetails/:id/:category',
					element: (
						<ProtectedRoute>
							<ProductDetails />
						</ProtectedRoute>
					)
				},
				{ path: 'login', element: <Login /> },
				{
					index: true,
					element: (
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					)
				}
			]
		}
	]);

	return (
		<>
			<CounterContextProvider>
				<QueryClientProvider client={query}>
					<CartContextProvider>
						<RouterProvider router={router}></RouterProvider>

						<Toaster />
					</CartContextProvider>

					<ReactQueryDevtools />
				</QueryClientProvider>
			</CounterContextProvider>
		</>
	);
}

export default App;
