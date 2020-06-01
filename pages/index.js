import Router from 'next/router';
import { useEffect } from 'react';

const HomePage = () => {
	useEffect(() => {
		Router.push('/mevzuat');
	});
	return null;
};

export default HomePage;
