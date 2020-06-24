import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from 'context/AuthContext';
import AllNotes from 'component/user/AllNotes';
import UserSidebar from 'component/user/UserSidebar';
import AllFavorites from 'component/user/AllFavorites';
import Footer from 'component/Footer';

const login = '/user/login?redirected=true';

const ProfilePage = () => {
	const router = useRouter();
	const { isLoggedIn, userInfo, token } = useContext(AuthContext);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('userData'));

		if (!storedData && !isLoggedIn) {
			router.push(login);
		}
	}, [isLoggedIn]);

	useEffect(() => {});

	return (
		<div className="flex-container">
			<UserSidebar current={current} setCurrent={setCurrent} />
			{isLoggedIn && userInfo && (
				<section id="showcase">
					<form className="user-me">
						<select className="user-select" value={current} onChange={(e) => setCurrent(parseInt(e.target.value))}>
							<option value="0">Notlarım</option>
							<option value="1">Favorilerim</option>
							<option value="2">Tartışmalarım</option>
							<option value="3">Bloglarım</option>
						</select>
					</form>
					{current === 0 && <AllNotes user={userInfo} token={token} />}
					{current === 1 && <AllFavorites user={userInfo} token={token} />}
					<Footer />
				</section>
			)}
		</div>
	);
};

export default ProfilePage;
