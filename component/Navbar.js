import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
	const router = useRouter();

	const onNavbarPressed = () => {
		let el = document.documentElement;
		el.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<nav id="navbar" onClick={onNavbarPressed}>
			<div className="container">
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
									router.pathname.search("/mevzuat") !== -1 && 'navlink-active'
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
									router.pathname.search("/blog") !== -1 && 'navlink-active'
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
									router.pathname.search("/meydan") !== -1 && 'navlink-active'
								}`}
							>
								Meydan
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
