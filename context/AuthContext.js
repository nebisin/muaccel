import React, { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import mevzuatApi from 'api/mevzuat';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLogging, setIsLogging] = useState(true);

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('userData'));
		if (storedData) {
			setUserData(storedData);
		}
	}, []);

	const { data: userAuth } = useSWR(userData ? '/auth' : null, () =>
		mevzuatApi
			.post(
				'/auth',
				{},
				{
					headers: {
						Authorization: `Bearer ${userData}`,
					},
				}
			)
			.then((response) => {
				setIsLogging(false);
				setIsLoggedIn(!!response.data);
				return response.data;
			})
			.catch(function (error) {
				localStorage.removeItem('userData');
				setUserData();
				setIsLogging(false);
				setIsLoggedIn(false);
			})
			.finally(() => {
				setIsLogging(false);
			})
	);

	useEffect(() => {
		mutate('/auth');
	}, [userData]);

	return (
		<AuthContext.Provider
			value={{ userData, userAuth, isLogging, isLoggedIn }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
