import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';
import LoadingSplash from 'component/LoadingSplash';

const UserActivate = () => {
	const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();
    
    const {activateToken} = router.query;

	const activateUser = async (activateToken) => {
        try {
            const response = mevzuatApi.post('/user/activate', { activateToken });
            if(isLoggedIn){
                router.push('/');
            }else {
                router.push('/login');
            }
        } catch (error) {
            console.log(error);
        }
	};

	useEffect(() => {
		if (!activateToken) return;
		activateUser(activateToken);
	}, [activateToken]);

	return <LoadingSplash />;
};

export default UserActivate;
