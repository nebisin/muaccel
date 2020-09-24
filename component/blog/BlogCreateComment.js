import { useContext, useEffect, useState } from 'react';
import AuthContext from 'context/AuthContext';
import Link from 'next/link';
import mevzuatApi from 'api/mevzuat';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const BlogCreateComment = ({ id, comments, setComments }) => {
	const { isLoggedIn, userInfo, token } = useContext(AuthContext);
	const [previewUrl, setPreviewUrl] = useState();
	const [text, setText] = useState('');
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
			setError('Bir yorum girmelisiniz.');
		} else {
			setError();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSending(true);
		if (!text.length) {
			setIsSending(false);
			return setError('Bir yorum girmelisiniz.');
		}
		const response = await mevzuatApi.post(
			`/blog/comments/${id}`,
			{ text: text },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		response.data.user = userInfo;
		response.data.user._id = userInfo.id;
		setComments((comments) => [response.data, ...comments]);
		setIsSending(false);
	};

	if (!isLoggedIn) {
		return (
			<div
				className="new-comment-container"
				style={{ justifyContent: 'center' }}
			>
				<p>
					Yorum yapmak için üye olmalısınız.{' '}
					<Link href="/user/register">
						<a>Üye olun</a>
					</Link>
				</p>
			</div>
		);
	}
	return (
		<div className="new-comment-container">
			<div className="new-comment">
				<div className="author-preview-logo">
					{previewUrl ? (
						<img
							src={previewUrl}
							alt="Preview"
							style={{ height: '40px', borderRadius: '0.25rem' }}
							onError={() => setPreviewUrl()}
						/>
					) : (
						''
					)}
				</div>
				<div className="new-comment-form">
					<textarea
						rows="5"
						maxLength="300"
						value={text}
						onChange={handleChange}
					/>
					{error ? <p className="error">{error}</p> : ''}
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
						'Yorum Yap'
					)}
				</button>
			</div>
		</div>
	);
};

export default BlogCreateComment;
