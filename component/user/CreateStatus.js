import { useState, useEffect, useContext } from 'react';
import mevzuatApi from 'api/mevzuat';
import AuthContext from 'context/AuthContext';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const CreateStatus = () => {
	const { token, userInfo } = useContext(AuthContext);
	const [text, setText] = useState('');
	const [previewUrl, setPreviewUrl] = useState();
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		if (!userInfo) return;
		setPreviewUrl(
			`https://radiant-garden-86590.herokuapp.com/users/${userInfo.id}/avatar`
		);
	}, [userInfo]);

	const handleChange = (e) => {
		setText(e.target.value);
		if (!e.target.value) {
			setError('Bir metin girmelisiniz.');
		} else {
			setError();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSending(true);
		if (!text.length) {
			setIsSending(false);
			setError('Bir metin girmelisiniz.');
			window.alert('Bir metin girmelisiniz.');
		}
		try {
			const response = await mevzuatApi.post(
				'/status',
				{ text: text },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
            );
			setText('');
		} catch (error) {
			setError(
				'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
			);
		}

		setIsSending(false);
	};

	return (
		<div className="new-status-container">
			<div className="new-comment-container">
				<div className="new-comment">
					<div className="new-comment-form new-status-form">
						<textarea
							rows="5"
							maxLength="300"
							value={text}
							onChange={handleChange}
							placeholder="Ne paylaşmak istersiniz?"
						/>
					</div>
				</div>
				<div className="article-note-buttons">
					<button
						className="article-note-create-button new-comment-button"
						onClick={handleSubmit}
						disabled={isSending}
					>
						{isSending ? (
							<FontAwesomeIcon icon={faSpinner} className="login-spinner" />
						) : (
							'Paylaş'
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateStatus;
