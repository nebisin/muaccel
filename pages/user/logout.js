import BottomBar from 'component/BottomBar'
import AuthContext from 'context/AuthContext';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router'

const LoginPage = () => {
	const router = useRouter()
	const {logout} = useContext(AuthContext);
	
	useEffect(() => {
		logout();
		router.push('/');
	}, [])
	return (
		<div>
			<div>Çıkış yapılıyor...</div>
			<BottomBar />
		</div>
	);
};

export default LoginPage;
