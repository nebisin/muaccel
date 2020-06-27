import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import UserNav from './UserNav';

const Navbar = () => {
	const router = useRouter();

	const checkHeader = () => {
		let scrollPosition = Math.round(window.scrollY);
		if (scrollPosition > 20) {
			document.getElementById('navbar').classList.add('nav-scroll');
		}else {
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
				<ul className="nav-list">
					<Link href="/" as="/">
						<a className="logo-link">
							<li>
								<img className="logo" src="/sitelogo.svg" alt="logo" />
							</li>
						</a>
					</Link>

					<li>
						<Link href="/mevzuat" as="/mevzuat">
							<a
								className={`navlink s-none ${
									router.pathname.search('/mevzuat') !== -1 && 'navlink-active'
								}`}
							>
								Mevzuat
							</a>
						</Link>
					</li>
					<li>
						<Link href="/blog" as="/blog">
							<a
								className={`navlink s-none ${
									router.pathname.search('/blog') !== -1 && 'navlink-active'
								}`}
							>
								Blog
							</a>
						</Link>
					</li>
					<li>
						<Link href="/meydan" as="/meydan">
							<a
								className={`navlink s-none ${
									router.pathname.search('/meydan') !== -1 && 'navlink-active'
								}`}
							>
								Meydan
							</a>
						</Link>
					</li>
				</ul>
				<UserNav />
			</div>
		</nav>
	);
};

export default Navbar;
