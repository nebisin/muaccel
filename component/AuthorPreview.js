import { useContext, useState } from 'react';
import TimeStamp from 'component/TimeStamp';
import AuthContext from 'context/AuthContext';
import FollowButton from './user/FollowButton';

const AuthorPreview = ({ data }) => {
	const [previewUrl, setPreviewUrl] = useState(
		`https://radiant-garden-86590.herokuapp.com/users/${data.author._id}/avatar`
	);
	const { isLoggedIn, isLogging } = useContext(AuthContext);

	return (
		<div className="author-preview">
			<a className="author-preview-logo">
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
			</a>
			<div className="author-preview-name">
				<div className="author-preview-displayname">
					<a>
						{data.author.name} (@{data.author.userName})
					</a>
				</div>

				<div className="author-preview-timestamp">
					<a>
						<TimeStamp date={data.createdAt} /> yazıldı.
					</a>
				</div>
			</div>
			<FollowButton userId={data.author._id} />
		</div>
	);
};

export default AuthorPreview;
