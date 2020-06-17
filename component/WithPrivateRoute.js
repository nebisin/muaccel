import React, { useContext, useEffect } from 'react';
import Router from 'next/router';
import AuthContext from 'context/AuthContext';

const login = '/user/login?redirected=true';

const checkUserAuthentication = async () => {
	const { isLogging, isLoggedIn } = useContext(AuthContext);
	useEffect(() => {
		if (!isLogging && !isLoggedIn) {
			return { auth: false };
		} else {
			return { auth: true };
		}
	}, [isLogging, isLoggedIn]);
};

export default (WrappedComponent) => {
	const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

	hocComponent.getInitialProps = async ({ res }) => {
		const userAuth = await checkUserAuthentication();

		// Are you an authorized user or not?
		if (!userAuth?.auth) {
			// Handle server-side and client-side rendering.
			if (res) {
				res.writeHead(302, {
					Location: login,
				});
				res.end();
			} else {
				Router.replace(login);
			}
		} else if (WrappedComponent.getInitialProps) {
			const wrappedProps = await WrappedComponent.getInitialProps(userAuth);
			return { ...wrappedProps, userAuth };
		}

		return { userAuth };
    };
    
	return hocComponent;
};
