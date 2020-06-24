import React from 'react';

const UserSidebar = ({ current, setCurrent }) => {
	return (
		<aside id="sidebar" className="h-none">
			<div className="user-sidebar-content">
				<div
					className={`user-side-link ${
						current === 0 && 'user-side-link-active'
					}`}
				>
					<span onMouseDown={() => setCurrent(0)}>Notlarım</span>
				</div>
				<div
					className={`user-side-link ${
						current === 1 && 'user-side-link-active'
					}`}
				>
					<span onMouseDown={() => setCurrent(1)}>Favorilerim</span>
				</div>
				<div
					className={`user-side-link ${
						current === 2 && 'user-side-link-active'
					}`}
				>
					<span onMouseDown={() => setCurrent(2)}>Tartışmalarım</span>
				</div>
				<div
					className={`user-side-link ${
						current === 3 && 'user-side-link-active'
					}`}
				>
					<span onMouseDown={() => setCurrent(3)}>Bloglarım</span>
				</div>
			</div>
		</aside>
	);
};

export default UserSidebar;
