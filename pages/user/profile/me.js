import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from 'context/AuthContext';
import AllNotes from 'component/user/AllNotes';
import Sidebar from 'component/mevzuat/Sidebar';

const login = '/user/login?redirected=true';

const ProfilePage = () => {
	const router = useRouter();
	const { isLoggedIn, userInfo, token } = useContext(AuthContext);

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('userData'));

		if (!storedData && !isLoggedIn) {
			router.push(login);
		}
	}, [isLoggedIn]);

	useEffect(() => {});

	return (
		<div className="flex-container">
			<Sidebar type="home" />
			<section id="showcase">
				{isLoggedIn && userInfo && <AllNotes user={userInfo} token={token} />}
			</section>
		</div>
	);
};

export default ProfilePage;
