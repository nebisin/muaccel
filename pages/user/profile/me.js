import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import AuthContext from 'context/AuthContext';

const login = '/user/login?redirected=true';

const ProfilePage = () => {
    const router = useRouter()
    const { isLoggedIn } = useContext(AuthContext);

	useEffect(() => {
        let storedData = JSON.parse(localStorage.getItem('userData'));

		if (!storedData && !isLoggedIn) {
			router.push(login);
		}
    }, [isLoggedIn]);
    
    return (<div></div>)
}

export default ProfilePage;