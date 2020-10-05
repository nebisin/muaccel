import FollowButton from 'component/user/FollowButton';
import { useState, useEffect, useContext } from 'react';

const ProfileHeader = ({ id, user, loading }) => {
	const [previewUrl, setPreviewUrl] = useState();

	useEffect(() => {
		if (!id) return setPreviewUrl();
		setPreviewUrl(
			`https://radiant-garden-86590.herokuapp.com/users/${id}/avatar`
		);
	}, [id]);

	return (
		<div className="profile-header">
			<div className="profile-avatar">
				<div className="avatar-upload-preview">
					{previewUrl ? (
						<img
							src={previewUrl}
							alt="Preview"
							style={{ height: '180px' }}
							onError={() => setPreviewUrl()}
						/>
					) : (
						''
					)}
				</div>
			</div>
			{user ? (
				<div className="profile-name">
					<div className="user-widget-displayname">{user.name}</div>
					<div className="user-widget-username">({user.userName})</div>
					<div className="profile-description">{user.description}</div>
					<FollowButton userId={id} />
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default ProfileHeader;
