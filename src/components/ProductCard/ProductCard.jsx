import { Link } from 'react-router-dom';
import { useAddToCart } from '../../services/cart/useAddToCart';
import { useAddToWishlist } from '../../services/wishlist/useAddToWishlist';

export default function ProductCard({ product }) {
	const { addToCart,loading } = useAddToCart();
	const { addToWishlist,loadingWishList } = useAddToWishlist();


	return (
		<div className="lg:w-1/5 md:w-1/4 sm:w-1/2  " key={product._id}>
			<div className="pro p-3 text-center  ">
				<div className="border border-width: 2px border-slate-950 ">
					<Link to={`/productdetails/${product._id}/${product.category.name}`}>
						<img src={product.imageCover} alt="" className="w-full" />
						<h3 className="text-emerald-500">{product.category.name}</h3>
						<h3 className="text-emerald-500">{product.title.split('').splice(0, 2).join('')}</h3>
					</Link>

					<div className="py-3">
						<span>
							<i className="fas fa-star text-yellow-500 px-2">{product.ratingsAverage}</i>
						</span>
						<h6 className="py-3">{product.price} EG</h6>

						<div className="flex justify-center  gap-2">
							<button
								onClick={() => addToCart(product._id)}
								className="bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white py-2 px-4 border border-[#1abc9c] hover:border-transparent rounded ">
{loading ? <i className="fa-solid fa-spinner fa-spin "></i>:"Add To Cart"}
							</button>
							<button
								onClick={() => addToWishlist(product._id)}
								className="bg-transparent hover:bg-[#1abc9c] text-[#1abc9c] font-semibold hover:text-white p-2 border border-[#1abc9c] hover:border-transparent rounded ">
									{loadingWishList ? <i className="fa-solid fa-spinner fa-spin text-"></i>:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
									/>
								</svg>}

							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
