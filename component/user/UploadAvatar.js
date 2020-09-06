import { useRef, useState, useEffect, useContext } from 'react';
import mevzuatApi from 'api/mevzuat';
import AuthContext from 'context/AuthContext';
import FormData from 'form-data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const UploadAvatar = ({ user }) => {
	const filePickerRef = useRef();
	const [file, setFile] = useState();
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState();
	const [sending, setSending] = useState(false);
	const { userInfo, token } = useContext(AuthContext);
	const [previewUrl, setPreviewUrl] = useState(
		`https://radiant-garden-86590.herokuapp.com/users/${userInfo.userId}/avatar`
	);

	const onInput = async (id, avatar, isValid) => {
		if (!avatar || !isValid) return;
		setSending(true);
		try {
			const formData = new FormData();
			formData.append('avatar', avatar);
			const response = await mevzuatApi.post('/users/me/avatar', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			});

			const fileReader = new FileReader();
			fileReader.onload = () => {
				setPreviewUrl(fileReader.result);
			};
			fileReader.readAsDataURL(avatar);
			setSending(false);
		} catch (error) {
			console.log(error.message);
			setError('Bir şeyler ters gitti! Lütfen daha sonra tekrar deneyiniz.');
			setSending(false);
		}
		return;
	};

	const pickedHandler = (event) => {
		let pickedFile;
		let fileIsValid = isValid;
		if (event.target.files || event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}
		onInput(userInfo.userId, pickedFile, fileIsValid);
	};

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	return (
		<div className="settings-group">
			<label htmlFor="avatar-input">
				<h3 className="setting-title">Profil Resmi</h3>
				<p className="setting-subtitle">
					Profil resminiz .jpg .jpeg veya .png formatında olmalıdır.
				</p>
			</label>
			<div className="upload-form-control">
				<input
					id="avatar-input"
					ref={filePickerRef}
					name="avatar"
					style={{ display: 'none' }}
					type="file"
					accept=".jpg, .png, .jpeg"
					onChange={pickedHandler}
				/>
				<div className="avatar-upload" onClick={pickImageHandler}>
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
					<button className="avatar-upload-button">
						<FontAwesomeIcon icon={faPlusCircle} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default UploadAvatar;
