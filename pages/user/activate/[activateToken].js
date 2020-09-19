import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';
import LoadingSplash from 'component/LoadingSplash';

const UserActivate = () => {
	const { token, auth } = useContext(AuthContext);
    const router = useRouter();
    const {activateToken} = router.query;

	const activateUser = async (activateToken) => {
        try {
            const response = await mevzuatApi.post('/user/activate', { activateToken });
            if(token){
                auth();
                router.push('/');
            }else {
                router.push('/user/login');
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
