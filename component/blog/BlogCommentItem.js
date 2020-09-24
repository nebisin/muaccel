import { useState, useEffect, useContext } from 'react';
import TimeStamp from 'component/TimeStamp';
import AuthContext from 'context/AuthContext';
import mevzuatApi from 'api/mevzuat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';

const BlogCommentItem = ({ comment }) => {
	const [previewUrl, setPreviewUrl] = useState();
	const { userInfo, token } = useContext(AuthContext);
	const [deleted, setDeleted] = useState(false);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (!comment.user) return;
		setPreviewUrl(
			`https://radiant-garden-86590.herokuapp.com/users/${comment.user._id}/avatar`
		);
	}, [comment]);

	const userDelete = async (userToken, commentId) => {
		if (!userToken || !commentId) return;

		setDeleting(true);

		try {
			const response = await mevzuatApi.delete(`/blog/comment/${commentId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setDeleted(true);
			setDeleting(false);
		} catch (error) {
			console.log(error);
			setDeleting(false);
		}

		return;
	};

	const adminDelete = async (adminToken, commentId) => {
		if (!adminToken || !commentId) return;

		setDeleting(true);

		try {
			const response = await mevzuatApi.delete(
				`/admin/blog/comment/${commentId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setDeleted(true);
			setDeleting(false);
		} catch (error) {
			console.log(error);
			setDeleting(false);

			return;
		}

		return;
	};

	if (deleted === true) {
		return (
			<div style={{ textAlign: 'center', padding: '10px', marginTop: '20px' }}>
				Yorumunuz başarıyla silindi.
			</div>
		);
	}

	return (
		<div className="new-comment-container">
			{deleting ? (
				<div className="user-note-deleting-on">
					<FontAwesomeIcon
						icon={faSpinner}
						className="user-note-delete-spinner"
					/>
				</div>
			) : (
				''
			)}
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
				<div className="new-comment-form blog-comment-content">
					<div className="author-preview-displayname">
						<a>
							{comment.user.name} (@{comment.user.userName})
						</a>{' '}
						<span className="author-preview-timestamp">
							- <TimeStamp date={comment.createdAt} />
						</span>
					</div>

					<div style={{whiteSpace: 'pre-line', listStylePosition: 'inside'}}>
						<ReactMarkdown
							source={comment.text}
							linkTarget="_blank"
							disallowedTypes={['image', "imageReference"]}
						/>
					</div>
					{userInfo?.id === comment.user._id ? (
						<div className="user-note-buttons">
							<button
								className="user-note-delete-button"
								onClick={() => userDelete(token, comment._id)}
							>
								Sil
							</button>
						</div>
					) : (
						''
					)}
					{userInfo?.auth === true ? (
						<div className="user-note-buttons">
							<button
								className="user-note-delete-button"
								onClick={() => adminDelete(token, comment._id)}
							>
								Sil(Yönetici)
							</button>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default BlogCommentItem;
