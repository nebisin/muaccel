import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';

import UserNav from './UserNav';

const Navbar = () => {
	const checkHeader = () => {
		let scrollPosition = Math.round(window.scrollY);
		if (scrollPosition > 20) {
			document.getElementById('navbar').classList.add('nav-scroll');
		} else {
			document.getElementById('navbar').classList.remove('nav-scroll');
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', checkHeader);
	}, []);

	const onNavbarPressed = () => {
		let el = document.documentElement;
		el.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<nav id="navbar" onClick={onNavbarPressed}>
			<div className="container nav-container">
				<div className="nav-list">
					<Link href="/" as="/">
						<a className="logo-link">
							<img className="logo" src="/sitelogo.svg" alt="logo" />
						</a>
					</Link>
				</div>
				<UserNav />
			</div>
		</nav>
	);
};

export default Navbar;
