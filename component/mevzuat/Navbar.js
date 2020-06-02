import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

const Navbar = () => {
	const router = useRouter();

	const onNavbarPressed = () => {
		let el = document.documentElement;
		el.scrollIntoView({behavior: "smooth"});
	}

	return (
		<nav id="navbar" onClick={onNavbarPressed} >
			<div className="container">
				<ul className="nav-list">
					<li>
						<Link href="/" prefetch={false}>
							<a>
								<img className="logo" src="/sitelogo.png" alt="logo" />
							</a>
						</Link>
					</li>
					<li>
						<Link href="/mevzuat" prefetch={false}>
							<a className={`navlink s-none ${router.pathname == "/mevzuat" && "navlink-active"}`}>Mevzuat</a>
						</Link>
					</li>
					<li>
						<Link href="/blog" prefetch={false}>
							<a className={`navlink s-none ${router.pathname == "/blog" && "navlink-active"}`}>Blog</a>
						</Link>
					</li>
					<li>
						<Link href="/meydan" prefetch={false}>
							<a className={`navlink s-none ${router.pathname == "/meydan" && "navlink-active"}`}>Meydan</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
