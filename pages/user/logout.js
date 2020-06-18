import BottomBar from 'component/BottomBar';
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
					localStorage.removeItem('userData');
					logout();
					router.push('/');
				})
				.catch(function (error) {
					localStorage.removeItem('userData');
					logout();
					router.push('/');
				});
		};
		apiLogout();
	}, []);
	return (
		<div>
			<div>Çıkış yapılıyor...</div>
			<BottomBar />
		</div>
	);
};

export default LoginPage;
