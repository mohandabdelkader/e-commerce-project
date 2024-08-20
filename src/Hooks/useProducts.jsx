import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useProducts() {
	function getProducts() {
		return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
	}

	let productsInfo = useQuery({
		queryKey: ['newProducts'],
		queryFn: getProducts,
		// staleTime:4000,
		// retry: 5
		// retryDelay: 2000
		// refetchInterval: 4000
		// refetchIntervalInBackground: true
		// gcTime:2000
		select: (data) => data.data.data
	});
	return productsInfo;
}
