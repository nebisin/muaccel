import { useState, useEffect, useContext } from 'react';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';

const FollowButton = ({ userId }) => {
	const { token, isLoggedIn, userInfo } = useContext(AuthContext);
    const [isFollowed, setIsFollowed] = useState();
    const [loading, setLoading] = useState(false);

	const getFollowed = async (followed, token) => {
		if (!followed || !token) return;
		try {
			const response = await mevzuatApi.post(
				`/user/follow/${followed}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
            setIsFollowed(response.data);
            setLoading(false)
		} catch (error) {
			console.log(error);
			setIsFollowed();
		}
	};

	const useFollow = async (followed, token) => {
        if (!followed || !token) return;
        setIsFollowed(follow => !follow);
        setLoading(true);
		try {
			const response = await mevzuatApi.patch(
				`/user/follow/${followed}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
            setIsFollowed(response.data);
            setLoading(false);
		} catch (error) {
			console.log(error);
            setIsFollowed();
            setLoading(false);
		}
	};

	useEffect(() => {
		getFollowed(userId, token);
	}, [token, userId]);

	if (!isLoggedIn || isFollowed === undefined || userInfo.id === userId)
		return '';

	return (
		<button className="follow-button" disabled={loading} onClick={() => useFollow(userId, token)}>
			{isFollowed ? 'Takiptesin' : 'Takip Et'}
		</button>
	);
};

export default FollowButton;
