import React from 'react';
import Link from 'next/link';

const Navbar = () => {
	return (
		<nav id="navbar">
			<div className="container">
				<ul className="nav-list">
					<li>
						<Link href="/">
							<a>
								<img className="logo" src="/sitelogo.png" alt="logo" />
							</a>
						</Link>
					</li>
					<li>
						<Link href="/mevzuat">
							<a className="navlink s-none">Mevzuat</a>
						</Link>
					</li>
					<li>
						<Link href="/blog">
							<a className="navlink s-none">Blog</a>
						</Link>
					</li>
					<li>
						<Link href="/meydan">
							<a className="navlink s-none">Meydan</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
