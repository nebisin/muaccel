import {useContext} from 'react';

import DisplayNameSetting from "./DisplayNameSetting";
import AboutSetting from "./AboutSetting";

import AuthContext from 'context/AuthContext';

const ProfileSettings = () => {
	const {userInfo} = useContext(AuthContext);

	return (
		<React.Fragment>
			<DisplayNameSetting user={userInfo} />
			<AboutSetting user={userInfo} />
		</React.Fragment>
	);
};

export default ProfileSettings;
