import { useState, useContext } from 'react';
import mevzuatApi from 'api/mevzuat';
import AuthContext from 'context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const AboutSetting = ({ user }) => {
	const [description, setDescription] = useState(user.description);
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
						description: description,
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
			<label htmlFor="about">
				<h3 className="setting-title">Hakkımda</h3>
				<p className="setting-subtitle">
					Sizi anlatan kısa bir açıklama girin.
				</p>
			</label>
			<form className="setting-form-area" onSubmit={(e) => handleSubmit(e)}>
				<textarea
					className="setting-area"
					type="text"
					id="about"
					name="about"
					rows="4"
					maxLength="200"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<button className="setting-button" onClick={(e) => handleSubmit(e)}>
					{sending ? (
						<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
					) : (
						'Değiştir'
					)}
				</button>
			</form>
		</div>
	);
};

export default AboutSetting;
