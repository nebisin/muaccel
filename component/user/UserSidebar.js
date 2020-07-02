import React from 'react';

const UserSidebar = ({ current, setCurrent, setVal }) => {
	return (
		<aside id="sidebar" className="h-none">
			<div className="user-sidebar-content">
				<div
					className={`user-side-link ${
						current === "notes" && 'user-side-link-active'
					}`}
				>
					<span onClick={() => {
						setCurrent("notes")
						setVal("Notlarım")
					}}>Notlarım</span>
				</div>
				<div
					className={`user-side-link ${
						current === "favorites" && 'user-side-link-active'
					}`}
				>
					<span onClick={() => {
						setVal("Favorilerim")
						setCurrent("favorites")}}>Favorilerim</span>
				</div>
				<div
					className={`user-side-link ${
						current === "discussion" && 'user-side-link-active'
					}`}
				>
					<span onClick={() => {
						setVal("Tartışmalarım")
						setCurrent("discussion")}}>Tartışmalarım</span>
				</div>
				<div
					className={`user-side-link ${
						current === "blogs" && 'user-side-link-active'
					}`}
				>
					<span onClick={() => {
						setVal("Bloglarım")
						setCurrent("blogs")}}>Bloglarım</span>
				</div>
			</div>
		</aside>
	);
};

export default UserSidebar;
