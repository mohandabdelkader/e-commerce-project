import { useContext } from 'react';
import { AllOrdersContext } from '../../Context/AllOrdersContext';

export default function AllOrders() {
	const { data } = useContext(AllOrdersContext);

	if (!data || !data.length) {
		return (
			<h1 className="  p-20 flex justify-center  items-center h-screen">
				<i className="fa-solid fa-spinner fa-spin text-7xl"></i>
			</h1>
		);
	}

	return (
		<div className="mt-24 pb-12">
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{data.map((order) => (
					<li key={order._id} className="p-2 border rounded-md shadow-md transition hover:shadow-xl hover:border-gray-400">
						<p>
							Address: {order.shippingAddress?.city}, {order.shippingAddress?.details}
						</p>
						<p>Phone: {order.shippingAddress?.phone}</p>
						<p>Total items: {order.cartItems.length}</p>
						<p>Delivered: {order.cartItems.isDelivered ? 'yes' : 'no'}</p>
						<p>Paid: {order.cartItems.isPaid ? 'yes' : 'no'}</p>
						<p>Payment method: {order.cartItems.paymentMethodType}</p>
						<p>Total price: {order.cartItems.totalOrderPrice}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
