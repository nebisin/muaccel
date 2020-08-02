import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Select from 'react-select';
import AuthContext from 'context/AuthContext';
import AllNotes from 'component/user/AllNotes';
import UserSidebar from 'component/user/UserSidebar';
import AllFavorites from 'component/user/AllFavorites';
import AllBlogs from 'component/user/AllBlogs';
import Footer from 'component/Footer';

const login = '/user/login?redirected=true';

const ProfilePage = () => {
	const router = useRouter();
	const { isLoggedIn, userInfo, token } = useContext(AuthContext);
	const [current, setCurrent] = useState('notes');
	const [val, setVal] = useState('Notlarım');

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('userData'));

		if (!storedData && !isLoggedIn) {
			router.push(login);
		}
	}, [isLoggedIn]);

	const options = [
		{ value: 'notes', label: 'Notlarım' },
		{ value: 'favorites', label: 'Favorilerim' },
		{ value: 'discussion', label: 'Tartışmalarım' },
		{ value: 'blogs', label: 'Bloglarım' },
	];

	return (
		<React.Fragment>
			<Head>
				<title>Hesabım | muaccel.com</title>
			</Head>
			<div className="flex-container">
				<UserSidebar
					current={current}
					setCurrent={setCurrent}
					setVal={setVal}
				/>
				{isLoggedIn && userInfo && (
					<section id="showcase">
						<form className="user-me">
							<Select
								className="user-select"
								options={options}
								value={{ value: current, label: val }}
								onChange={(value) => {
									setCurrent(value.value);
									setVal(value.label);
								}}
							/>
						</form>
						{current === 'notes' && <AllNotes user={userInfo} token={token} />}
						{current === 'favorites' && (
							<AllFavorites user={userInfo} token={token} />
						)}
						{current === 'blogs' && (
							<AllBlogs user={userInfo} token={token} />
						)}
						<Footer />
					</section>
				)}
			</div>
		</React.Fragment>
	);
};

export default ProfilePage;
