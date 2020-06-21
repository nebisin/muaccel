import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserCircle,
} from '@fortawesome/free-regular-svg-icons';

const UserSidebar = () => {
	return (
		<aside id="sidebar" className="h-none">
			<h2 className="title">
				<FontAwesomeIcon
					icon={faUserCircle}
					className='sidebar-icon'
				/>
				Hesabım
			</h2>
		</aside>
	);
};

export default UserSidebar;
