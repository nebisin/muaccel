import React, { useEffect, useState } from 'react';
import mevzuatApi from 'api/mevzuat';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState();
	const [userInfo, setUserInfo] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLogging, setIsLogging] = useState(true);
	const [favorites, setFavorites] = useState([]);
	const [favoritesLoading, setFavoritesLoading] = useState(true)

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('userData'));
		if (storedData) {
			setToken(storedData);
		} else {
			setUserInfo();
			setIsLogging(false);
			setIsLoggedIn(false);
			return;
		}
		window.addEventListener('storage', () => {
			let storedData = JSON.parse(localStorage.getItem('userData'));
			if (storedData) {
				setToken(storedData);
			} else {
				setUserInfo();
				setIsLogging(false);
				setIsLoggedIn(false);
				return;
			}
		});
	}, []);

	const auth = async () => {
		if (!token) return;
		setIsLogging(true);
		try {
			const response = await mevzuatApi.post(
				'/auth',
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.data) {
				setUserInfo(response.data);
				setIsLoggedIn(true);
				setIsLogging(false);
			} else {
				setUserInfo();
				setIsLogging(false);
				setIsLoggedIn(false);
				logout();
			}
		} catch (error) {
			setUserInfo();
			setIsLogging(false);
			setIsLoggedIn(false);
			logout();
		}
	};

	useEffect(() => {
		if (token) {
			auth();
		}
	}, [token]);

	useEffect(() => {
		if (userInfo) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [userInfo]);

	const getFavorites = async () => {
		if (!token) return;
		setFavoritesLoading(true);
		const response = await mevzuatApi.post(
			'/favorite/articles',
			{
				sort: {createdAt: -1}
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		setFavorites(response.data);

		setFavoritesLoading(false);
	};

	useEffect(() => {
		if (token) {
			getFavorites();
		} else {
			return;
		}
	}, [token]);

	const login = (resToken) => {
		if (!resToken) {
			return;
		}
		setToken(resToken);
		localStorage.setItem('userData', JSON.stringify(resToken));
	};

	const logout = (token) => {
		if (!token) return;
		localStorage.removeItem('userData');
		setToken();
		setUserInfo();
		setIsLogging(false);
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{
				auth,
				login,
				logout,
				getFavorites,
				setUserInfo,
				favorites,
				token,
				userInfo,
				isLoggedIn,
				isLogging,
				favoritesLoading
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
