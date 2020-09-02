import { useState, useContext } from 'react';
import mevzuatApi from 'api/mevzuat';
import AuthContext from 'context/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const DisplayNameSetting = ({ user }) => {
	const [name, setName] = useState(user.name);
	const [sending, setSending] = useState(false);
	const { setUserInfo, token } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSending(true);
		const updateName = async () => {
			try {
				const response = await mevzuatApi.patch(
					'/user/update',
					{
						name: name,
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setUserInfo(response.data);
				setSending(false);
			} catch (error) {
				setSending(false);
			}
		};
		updateName();
	};

	return (
		<div className="settings-group">
			<label htmlFor="displayName">
				<h3 className="setting-title">Görünen İsim</h3>
				<p className="setting-subtitle">
					Gerçek adınızı veya rahat edeceğiniz bir takma isim girin.
				</p>
			</label>
			<form className="setting-form" onSubmit={(e) => handleSubmit(e)}>
				<input
					className="setting-input"
					type="text"
					id="displayName"
					name="displayName"
					maxLength="36"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<button className="setting-button" onClick={(e) => handleSubmit(e)}>
					{sending ? (
						<FontAwesomeIcon
							icon={faSpinner}
							className="login-spinner"
						/>
					) : (
						'Değiştir'
					)}
				</button>
			</form>
		</div>
	);
};

export default DisplayNameSetting;
