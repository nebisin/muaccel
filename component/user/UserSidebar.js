import React from 'react';
import Link from 'next/link';

const UserSidebar = () => {
	return (
		<aside id="sidebar" className="h-none">
			<div className="user-sidebar-content">
				<div className="user-side-link user-side-link-active">
					<Link href="">
						<a>Notlarım</a>
					</Link>
				</div>
				<div className="user-side-link">
					<Link href="">
						<a>Favorilerim</a>
					</Link>
				</div>
				<div className="user-side-link">
					<Link href="">
						<a>Tartışmalarım</a>
					</Link>
				</div>
				<div className="user-side-link">
					<Link href="">
						<a>Bloglarım</a>
					</Link>
				</div>
			</div>
		</aside>
	);
};

export default UserSidebar;
