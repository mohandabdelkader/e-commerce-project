import useProducts from '../../Hooks/useProducts';
import ProductCard from '../ProductCard/ProductCard';

export default function Products() {
	let { error, isError, isLoading, data } = useProducts();

	if (isError) {
		return <h2 className="bg-black text-red-600 capitalize">{error}</h2>;
	}

	if (isLoading) {
		return (
			<h1 className="  p-20 flex justify-center  items-center h-screen">
				<i className="fa-solid fa-spinner fa-spin text-7xl"></i>

			</h1>
		);
	}

	return (
		<>
			<h1 className="capitalize text-black-600 text-center font-bold my-3"> my products</h1>
			<div className="row">
				{data.map((product) => (
					<ProductCard product={product} key={product._id} />
				))}
			</div>
		</>
	);
}
