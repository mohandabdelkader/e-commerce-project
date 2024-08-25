import React from 'react';
import Category from '../Category/Category';
import MainSlider from '../MainSlider/MainSlider';
import NewProducts from '../NewProducts/NewProducts';

export default function Home() {
	return (
		<>
			<MainSlider />
			<Category />
			<NewProducts />
		</>
	);
}
