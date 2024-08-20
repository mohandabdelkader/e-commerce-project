import React from 'react';
import NewProducts from '../NewProducts/NewProducts';
import Category from '../Category/Category';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
	return (
		<>
		<MainSlider/>
		<Category/>
			<NewProducts />
		</>
	);
}
