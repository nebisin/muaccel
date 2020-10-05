import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import ArticleContext from 'context/ArticleContext';

import mevzuatApi from 'api/mevzuat';
import ProfileHeader from 'component/profile/ProfileHeader';

const ProfileHome = () => {
	const [info, setInfo] = useState();
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const id = router.query.id;

	const getInfo = async (userId) => {
		if (!userId) {
			setInfo();
			setLoading(false);
			return;
		}

		try {
			const response = await mevzuatApi.get(`/users/${userId}`);
			if (!response.data) {
				setInfo();
				setLoading(false);
				return;
			}

			setInfo(response.data);
			setLoading(false);
			console.log(response.data);
			return;
		} catch (error) {
			setInfo();
			setLoading(false);
			console.log(error);
			return;
		}
	};

	useEffect(() => {
		setLoading();
		setInfo();

		getInfo(id);
	}, [id]);

	return (
		<div className="container">
			<div className="dashboard-container profile-container">
				<div className="profile-sidebar">
					<ProfileHeader id={id} user={info} loading={loading} />
				</div>
				<div className="profile-content"></div>
			</div>
			<div className="bottom-clear"></div>
		</div>
	);
};

export default ProfileHome;
