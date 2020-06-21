import React, { useEffect, useState } from 'react';
import mevzuatApi from 'api/mevzuat';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState();
	const [userInfo, setUserInfo] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLogging, setIsLogging] = useState(true);

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

	const login = (resToken) => {
		if (!resToken) {
			return;
		}
		setToken(resToken);
		localStorage.setItem('userData', JSON.stringify(resToken));
	};

	const logout = () => {
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
				token,
				userInfo,
				isLoggedIn,
				isLogging,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
