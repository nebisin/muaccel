import AuthContext from 'context/AuthContext';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import mevzuatApi from 'api/mevzuat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
		<div className="loading-container">
			<img className="splash-logo" src="/sitelogo.svg" alt="logo" />
			<FontAwesomeIcon icon={faSpinner} className="splash-spinner" />
		</div>
	);
};

export default LoginPage;
