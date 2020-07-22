const UserWidget = ({user}) => {
	return (
		<div className="user-widget">
			<div className="user-widget-head"></div>
			<div className="user-widget-center">
				<div className="user-widget-avatar"></div>
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
