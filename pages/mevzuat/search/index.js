import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RegisterPage = () => {
	const router = useRouter();

	useEffect(() => {
		router.push('/');
	});

	return <div></div>;
};

export default RegisterPage;
