import AuthContext from 'context/AuthContext';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import mevzuatApi from 'api/mevzuat';

const LoginPage = () => {
	const router = useRouter();
	const { logout } = useContext(AuthContext);

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('userData'));
		const apiLogout = async () => {
			await mevzuatApi
				.post(
					'/logout',
					{},
					{
						headers: {
							Authorization: `Bearer ${storedData}`,
						},
					}
				)
				.then(function (response) {
					logout(storedData);
					router.push('/');
				})
				.catch(function (error) {
					logout(storedData);
					router.push('/');
				});
		};
		apiLogout();
	}, []);
	return (
		<div>
			<div>Çıkış yapılıyor...</div>
		</div>
	);
};

export default LoginPage;
