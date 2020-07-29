import { useContext, useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import AuthContext from 'context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import ProfileSettings from 'component/user/ProfileSettings';
import SecuritySettings from 'component/user/SecuritySettings';
import PrivacySettings from 'component/user/PrivacySettings';

const SettingsPage = () => {
	const router = useRouter();
	const { isLoggedIn, userInfo, token } = useContext(AuthContext);

	const [currentSettings, setCurrentSettings] = useState('0');

	useEffect(() => {
		let storedData = JSON.parse(localStorage.getItem('userData'));

		if (!storedData && !isLoggedIn) {
			router.push(login);
		}
	}, [isLoggedIn]);

	return (
		<React.Fragment>
			<Head>
				<title>Ayarlar | muaccel.com</title>
			</Head>
			{isLoggedIn && (
				<React.Fragment>
					<div className="settings-container">
						<h1 className="settings-title">
							<FontAwesomeIcon icon={faCog} className="sidebar-icon" />
							Ayarlar
						</h1>
						<div className="settings-navigations">
							<ul>
								<li
									className={currentSettings === '0' ? 'active-nav' : ''}
									onClick={() => setCurrentSettings('0')}
								>
									Profil
								</li>
								<li
									className={currentSettings === '1' ? 'active-nav' : ''}
									onClick={() => setCurrentSettings('1')}
								>
									Güvenlik
								</li>
								<li
									className={currentSettings === '2' ? 'active-nav' : ''}
									onClick={() => setCurrentSettings('2')}
								>
									Gizlilik
								</li>
							</ul>
						</div>
						<div className="settings-content">
							{currentSettings === '0' && <ProfileSettings />}
							{currentSettings === '1' && <SecuritySettings />}
							{currentSettings === '2' && <PrivacySettings />}
						</div>
					</div>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default SettingsPage;
