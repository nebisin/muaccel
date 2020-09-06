import { useState } from 'react';


const UserWidget = ({ user }) => {
	const [previewUrl, setPreviewUrl] = useState(
		`https://radiant-garden-86590.herokuapp.com/users/${user._id}/avatar`
	);
	return (
		<div className="user-widget">
			<div className="user-widget-head"></div>
			<div className="user-widget-center">
				<div className="user-widget-avatar">
					{previewUrl ? (
						<img
							src={previewUrl}
							alt="Preview"
							style={{ height: '80px', borderRadius: '0.25rem' }}
							onError={() => setPreviewUrl()}
						/>
					) : (
						''
					)}
				</div>
			</div>
			<div className="user-widget-down">
				<div className="user-widget-name">
					<div className="user-widget-displayname">{user.name}</div>{' '}
					<div className="user-widget-username">({user.userName})</div>
				</div>
				<div className="user-widget-description">{user.description}</div>
			</div>
		</div>
	);
};

export default UserWidget;
