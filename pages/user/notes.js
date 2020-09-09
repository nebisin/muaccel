import React, { useContext, useEffect } from 'react';
import DashboardSidebar from 'component/user/DashboardSidebar';

import { useRouter } from 'next/router';
import AuthContext from 'context/AuthContext';
import AllNotes from 'component/user/AllNotes';
import Footer from 'component/Footer';

const login = '/user/login?redirected=true';
const Notes = () => {
	const router = useRouter();
	const { isLoggedIn, userInfo, token } = useContext(AuthContext);

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('userData'));

		if (!storedData && !isLoggedIn) {
			router.push(login);
		}
	}, [isLoggedIn]);

	if (!isLoggedIn || !userInfo) {
		return <div></div>;
	}
	return (
		<div className="dashboard-container">
			<aside className="dashboard-sidebar">
				<div className="dashboard-sidebar-in">
					<DashboardSidebar page="notes" />
				</div>
			</aside>
			<section className="dashboard-main">
				<AllNotes user={userInfo} token={token} />
				<Footer />
			</section>
		</div>
	);
};

export default Notes;
