import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faLandmark,
	faStar,
	faStickyNote,
	faPen,
	faBookmark,
	faCog,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import AuthContext from 'context/AuthContext';

const DashboardSidebar = ({ page }) => {
	const { userInfo } = useContext(AuthContext);
	const [previewUrl, setPreviewUrl] = useState();

	useEffect(() => {
		setPreviewUrl();
		if (userInfo) {
			setPreviewUrl(
				`https://radiant-garden-86590.herokuapp.com/users/${userInfo.id}/avatar`
			);
		}
	}, [userInfo]);

	return (
		<div className="dashboard-sidebar-inside">
			<div className="dashboard-user-preview">
				<div className="dashboard-user-logo">
					{previewUrl ? (
						<img
							src={previewUrl}
							alt="Preview"
							className="dashboard-logo"
							onError={() => setPreviewUrl()}
						/>
					) : (
						''
					)}
				</div>
				<div className="dashboard-user-name">
					<p className="dashboard-displayname">{userInfo.name}</p>
					<p className="dashboard-username">@{userInfo.userName}</p>
				</div>
			</div>
			<div className="dashboard-menu">
				<Link href="/" as="/">
					<a>
						<div
							className={`dashboard-menu-item ${
								page === 'home' && 'dashboard-menu-item-active'
							}`}
						>
							<div className="dashboard-icon-container">
								<FontAwesomeIcon
									icon={faLandmark}
									className="dashboard-menu-item-icon"
								/>
							</div>
							<span className="dashboard-menu-text">Anasayfa</span>
						</div>
					</a>
				</Link>
				<Link href="/user/favorites" as="/user/favorites">
					<a>
						<div
							className={`dashboard-menu-item ${
								page === 'favorites' && 'dashboard-menu-item-active'
							}`}
						>
							<div className="dashboard-icon-container">
								<FontAwesomeIcon
									icon={faStar}
									className="dashboard-menu-item-icon"
								/>
							</div>
							<span className="dashboard-menu-text">Favori Maddelerim</span>
						</div>
					</a>
				</Link>
				<Link href="/user/notes" as="/user/notes">
					<a>
						<div
							className={`dashboard-menu-item ${
								page === 'notes' && 'dashboard-menu-item-active'
							}`}
						>
							<div className="dashboard-icon-container">
								<FontAwesomeIcon
									icon={faStickyNote}
									className="dashboard-menu-item-icon"
								/>
							</div>
							<span className="dashboard-menu-text">Notlarım</span>
						</div>
					</a>
				</Link>
				<Link href="/user/blogs" as="/user/blogs">
					<a>
						<div
							className={`dashboard-menu-item ${
								page === 'blogs' && 'dashboard-menu-item-active'
							}`}
						>
							<div className="dashboard-icon-container">
								<FontAwesomeIcon
									icon={faPen}
									className="dashboard-menu-item-icon"
								/>
							</div>
							<span className="dashboard-menu-text">Blog Yazılarım</span>
						</div>
					</a>
				</Link>
				<div
					className={`dashboard-menu-item ${
						page === 'readings' && 'dashboard-menu-item-active'
					}`}
				>
					<div className="dashboard-icon-container">
						<FontAwesomeIcon
							icon={faBookmark}
							className="dashboard-menu-item-icon"
						/>
					</div>
					<span className="dashboard-menu-text">Okuma Listem</span>
				</div>
				<Link href="/user/settings" as="/user/settings">
					<a>
						<div
							className={`dashboard-menu-item ${
								page === 'settings' && 'dashboard-menu-item-active'
							}`}
						>
							<div className="dashboard-icon-container">
								<FontAwesomeIcon
									icon={faCog}
									className="dashboard-menu-item-icon"
								/>
							</div>
							<span className="dashboard-menu-text">Ayarlarım</span>
						</div>
					</a>
				</Link>
				<Link href="/user/logout" as="/user/logout">
					<a>
						<div className="dashboard-menu-item">
							<div className="dashboard-icon-container">
								<FontAwesomeIcon
									icon={faSignOutAlt}
									className="dashboard-menu-item-icon"
								/>
							</div>
							<span className="dashboard-menu-text">Çıkış Yap</span>
						</div>
					</a>
				</Link>
			</div>
		</div>
	);
};

export default DashboardSidebar;
